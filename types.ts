import type { LucideIcon } from "lucide-react";

import type { Prisma } from "@prisma/client";

// Tipo para incluir todas las relaciones en User
export type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    messages: true;
    student: {
      include: {
        courses: {
          include: {
            course: true;
          };
        };
      };
    };
    professor: {
      include: {
        department: true;
        courses: true;
      };
    };
    replies: true;
  };
}>;

// Tipo para incluir todas las relaciones en Student
export type StudentWithRelations = Prisma.StudentGetPayload<{
  include: {
    user: true;
    courses: {
      include: {
        course: true;
      };
    };
  };
}>;

// Tipo para incluir todas las relaciones en Professor
export type ProfessorWithRelations = Prisma.ProfessorGetPayload<{
  include: {
    user: true;
    department: true;
    courses: true;
  };
}>;

// Tipo para incluir todas las relaciones en Course
export type CourseWithRelations = Prisma.CourseGetPayload<{
  include: {
    career: true;
    department: true;
    professor: true;
    schedule: true;
    students: {
      include: {
        student: true;
      };
    };
    evaluations: true;
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
    communication: true;
  };
}>;

// Tipo para incluir todas las relaciones en Evaluation
export type EvaluationWithRelations = Prisma.EvaluationGetPayload<{
  include: {
    course: true;
  };
}>;

// Tipo para incluir todas las relaciones en Career
export type CareerWithRelations = Prisma.CareerGetPayload<{
  include: {
    curriculums: true;
    courses: true;
  };
}>;

// Tipo para incluir todas las relaciones en Curriculum
export type CurriculumWithRelations = Prisma.CurriculumGetPayload<{
  include: {
    career: true;
    subjects: true;
  };
}>;

// Tipo para incluir todas las relaciones en CurriculumSubject
export type CurriculumSubjectWithRelations =
  Prisma.CurriculumSubjectGetPayload<{
    include: {
      curriculum: true;
    };
  }>;

// Tipo para incluir todas las relaciones en Department
export type DepartmentWithRelations = Prisma.DepartmentGetPayload<{
  include: {
    professors: true;
    courses: true;
  };
}>;

// Tipo para incluir todas las relaciones en Communication
export type CommunicationWithRelations = Prisma.CommunicationGetPayload<{
  include: {
    replies: true;
  };
}>;

// Tipo para incluir todas las relaciones en Schedule
export type ScheduleWithRelations = Prisma.ScheduleGetPayload<{
  include: {
    course: true;
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
