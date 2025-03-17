import { Badge } from "@/components/ui/badge";
import { DashboardTabs } from "./components/dashboard-tabs";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ role: string | undefined }>;

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  let role: string | undefined;
  if (searchParams) {
    const { role: roleSearch } = await searchParams;
    role = roleSearch;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al sistema académico. Aquí encontrarás un resumen de tu
          información académica.
        </p>
        <Badge>Role: {role}</Badge>
      </div>

      <DashboardTabs />
    </div>
  );
}
