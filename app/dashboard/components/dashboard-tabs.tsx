"use client";

import {
  Calendar,
  Clock,
  FileText,
  GraduationCap,
  LineChart,
  ListChecks,
  X,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { UserWithRelations } from "@/types";

export type DashboardTabsProps = {
  userData: UserWithRelations;
};

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const student = userData.student || null;

  const professor = userData.professor || null;

  const admin = userData || null;

  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={setActiveTab}
      className="space-y-4"
    >
      <TabsList>
        <TabsTrigger value="overview">Resumen</TabsTrigger>
        <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Materias Inscriptas
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {student?.subjectRecords.length}
              </div>
              <p className="text-muted-foreground text-xs">Semestre actual</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Exámenes Próximos
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {student?.examRecords.length}
              </div>
              <p className="text-muted-foreground text-xs">Próximos 30 días</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Promedio General
              </CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {student?.academicRecord?.averageGrade}
              </div>
              <p className="text-muted-foreground text-xs">Escala 1-10</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="font-medium text-sm">
                Avance de Carrera
              </CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-bold text-2xl">
                {student?.academicRecord?.progressPercentCarrer}%
              </div>
              <Progress value={65} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Materias Actuales</CardTitle>
              <CardDescription>
                Materias en las que estás inscripto este semestre
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student?.subjectRecords.map((record) => (
                  <div key={record.id} className="flex items-center">
                    <div className="mr-4 w-full">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {record.subject.name}
                        </span>
                        <Badge variant="outline">{record.subject.code}</Badge>
                      </div>
                      <Progress
                        value={record.subject.capacity}
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Próximos Exámenes</CardTitle>
              <CardDescription>
                Exámenes programados para los próximos días
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {student?.examRecords.map((exam) => {
                  const formattedDate = new Intl.DateTimeFormat("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(exam.registeredAt));

                  const formattedTime = new Intl.DateTimeFormat("es-AR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(exam.registeredAt));

                  return (
                    <div key={exam.id} className="flex items-center">
                      <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm leading-none">
                          {exam.exam.name}
                        </p>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Calendar className="mr-1 h-3 w-3" />
                          {formattedDate}
                          <Clock className="mr-1 ml-2 h-3 w-3" />
                          {formattedTime}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notificaciones</CardTitle>
            <CardDescription>
              Mantente al día con tus notificaciones académicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData?.notifications.map((notification) => (
                <div
                  key={notification.createdAt.toString()}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <div className="flex-1 space-y-1">
                    <p className="font-medium text-sm leading-none">
                      {notification.message}
                    </p>

                    <p className="text-muted-foreground text-xs">
                      {notification.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    title="Marcar como leída"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <span className="sr-only">Marcar como leída</span>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};
