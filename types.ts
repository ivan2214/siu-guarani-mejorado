import type { LucideIcon } from "lucide-react";
import type { Prisma } from "@prisma/client";

// Tipo para incluir todas las relaciones en User
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    messages: true;
    student: {
      include: {
        subjectRecords: {
          include: {
            subject: true;
          };
        };
        academicRecord: true;
      };
    };
    professor: {
      include: {
        departments: true;
        subjects: true;
      };
    };
    replies: true;
    notifications: true;
  };
}>;

// Tipo para incluir todas las relaciones en Student
export type StudentWithRelations = Prisma.StudentGetPayload<{
  include: {
    user: true;
    subjectRecords: {
      include: {
        subject: true;
      };
    };
    academicRecord: true;
  };
}>;

// Tipo para incluir todas las relaciones en Professor
export type ProfessorWithRelations = Prisma.ProfessorGetPayload<{
  include: {
    user: true;
    departments: true;
    subjects: true;
  };
}>;

// Tipo para incluir todas las relaciones en Subject
export type SubjectWithRelations = Prisma.SubjectGetPayload<{
  include: {
    career: true;
    department: true;
    professors: true;
    students: {
      include: {
        student: true;
      };
    };
    exams: true;
  };
}>;

// Tipo para incluir todas las relaciones en Message
export type MessageWithRelations = Prisma.MessageGetPayload<{
  include: {
    sender: true;
  };
}>;

// Tipo para incluir todas las relaciones en Reply
export type ReplyWithRelations = Prisma.ReplyGetPayload<{
  include: {
    user: true;
  };
}>;

// Tipo para incluir todas las relaciones en Exam
export type ExamWithRelations = Prisma.ExamGetPayload<{
  include: {
    subject: true;
  };
}>;

// Tipo para incluir todas las relaciones en Career
export type CareerWithRelations = Prisma.CareerGetPayload<{
  include: {
    subjects: true;
  };
}>;

// Tipo para incluir todas las relaciones en Department
export type DepartmentWithRelations = Prisma.DepartmentGetPayload<{
  include: {
    professors: true;
    subjects: true;
  };
}>;

// Tipo para incluir todas las relaciones en Notification
export type NotificationWithRelations = Prisma.NotificationGetPayload<{
  include: {
    user: true;
  };
}>;

export interface NavMainItem {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
}
