import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full flex-1 p-4 md:p-6">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <div className="max-w-3xl space-y-6 text-center">
          <h1 className="font-bold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            Sistema de Gestión Académica
          </h1>
          <p className="text-muted-foreground text-xl">
            Bienvenido al sistema de gestión académica. Inicia sesión para
            acceder a todas las funcionalidades.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/register">Registrarse</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes</CardTitle>
              <CardDescription>Gestiona tu vida académica</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Inscripción a materias y exámenes, consulta de notas, plan de
                estudios y más.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">
                  Acceder <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Docentes</CardTitle>
              <CardDescription>Administra tus cursos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Carga de notas, registro de asistencia, comunicación con
                estudiantes y más.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">
                  Acceder <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Administrativos</CardTitle>
              <CardDescription>Gestión institucional</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Administración de carreras, planes de estudio, cupos, horarios y
                más.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/login">
                  Acceder <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
