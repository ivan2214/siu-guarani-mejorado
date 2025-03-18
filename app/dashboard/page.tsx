import { Badge } from "@/components/ui/badge";
import {
  DashboardTabs,
  type DashboardTabsProps,
} from "./components/dashboard-tabs";
import { getUserById } from "@/prisma/users";

export default async function DashboardPage() {
  const userId = "1";
  const today = new Date();

  const user = await getUserById(userId);

  if (!user || !user.student) {
    return null;
  }

  const userData: DashboardTabsProps = {
    userData: {
      enrollments: user.student.enrollments.map((enrollment) => ({
        name: enrollment.course.name,
        code: enrollment.course.code,
        description: enrollment.course.description,
        capacity: enrollment.course.capacity,
      })),
      careerProgress: user.student.academicRecord?.progressPercentCarrer || 0,
      generalAverage: user.student.academicRecord?.averageGrade || 0,
    },
  };

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
