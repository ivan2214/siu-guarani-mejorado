import { Badge } from "@/components/ui/badge";
import { DashboardTabs } from "./components/dashboard-tabs";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const userId = "1";
  const today = new Date();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      role: true,
      enrollments: {
        select: {
          subject: {
            select: {
              name: true,
              code: true,
              description: true,
              capacity: true,
            },
          },
        },
      },
      examRegistrations: {
        where: {
          examSession: {
            date: {
              gte: today,
              lte: new Date(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
              ),
            },
          },
        },
        select: {
          examSession: {
            select: {
              subject: { select: { name: true } },
              date: true,
            },
          },
        },
      },
      academicRecords: {
        where: {
          status: "APROBADO",
          finalGrade: { not: null },
        },
        select: { finalGrade: true, subject: { select: { name: true } } },
      },
      _count: {
        select: {
          academicRecords: { where: { status: "APROBADO" } },
          enrollments: true,
          examRegistrations: true,
        },
      },
      notifications: {
        select: {
          message: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }
  const careerProgress = totalSubjects
    ? (approvedSubjects / totalSubjects) * 100
    : 0;

  const grades = user.academicRecords.map((record) => record.finalGrade) || [];
  const validGrades = grades.filter((g): g is number => g !== null);
  const averageScore = validGrades.length
    ? (validGrades.reduce((sum, g) => sum + g, 0) / validGrades.length).toFixed(
        2
      )
    : "N/A";

  const userData = {
    enrollments: user.enrollments.map((e) => ({
      name: e.subject.name,
      code: e.subject.code,
      description: e.subject.description,
      capacity: e.subject.capacity,
    })),
    examRegistrations: user.examRegistrations.map((e) => ({
      name: e.examSession.subject.name,
      date: e.examSession.date,
    })),
    approvedSubjects: user.academicRecords.map((r) => ({
      name: r.subject.name,
      grade: r.finalGrade,
    })),
    careerProgress,
    generalAverage: averageScore,
    counts: user._count,
    notifications: user.notifications,
  };
  const totalSubjects = await prisma.subject.count();
  const approvedSubjects = user._count.academicRecords;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema académico. Aquí encontrarás un resumen de tu
          información académica.
        </p>
        <Badge>Role: {user.role}</Badge>
      </div>

      <DashboardTabs userData={userData} />
    </div>
  );
}
