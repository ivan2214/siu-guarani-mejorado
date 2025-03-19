import { Badge } from "@/components/ui/badge";
import { DashboardTabs } from "./components/dashboard-tabs";
import { getUserById } from "@/prisma/users";

export default async function DashboardPage() {
  const userId = "83e6d60c-d2e3-4a57-97f5-6288055fd49d";

  const user = await getUserById(userId);

  if (!user) {
    return null;
  }

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

      <DashboardTabs userData={user} />
    </div>
  );
}
