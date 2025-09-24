import { StatCard } from "@/components/StatCard";
import { VehicleCard } from "@/components/VehicleCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Fuel,
  Clock,
  Activity
} from "lucide-react";

const mockVehicles = [
  {
    id: "1",
    model: "Mercedes Sprinter",
    plate: "ABC-1234",
    status: "active" as const,
    driver: "João Silva",
    location: "São Paulo, SP",
    fuel: 85,
    passengers: 12,
    maxPassengers: 16,
  },
  {
    id: "2",
    model: "Volkswagen Crafter",
    plate: "DEF-5678",
    status: "maintenance" as const,
    location: "Oficina Central",
    fuel: 20,
    passengers: 0,
    maxPassengers: 14,
  },
  {
    id: "3",
    model: "Iveco Daily",
    plate: "GHI-9012",
    status: "active" as const,
    driver: "Maria Santos",
    location: "Rio de Janeiro, RJ",
    fuel: 92,
    passengers: 8,
    maxPassengers: 12,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: há 2 minutos
        </div>
      </div>

      {/* Estatísticas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total de Veículos"
          value="24"
          description="3 em manutenção"
          icon={Car}
          trend={{ value: "8%", isPositive: true }}
        />
        <StatCard
          title="Motoristas Ativos"
          value="18"
          description="6 disponíveis"
          icon={Users}
          trend={{ value: "2%", isPositive: true }}
        />
        <StatCard
          title="Consumo Médio"
          value="8.5L/100km"
          description="Este mês"
          icon={Fuel}
          trend={{ value: "1.2L", isPositive: false }}
        />
        <StatCard
          title="Km Rodados"
          value="12,450"
          description="Este mês"
          icon={Activity}
          trend={{ value: "15%", isPositive: true }}
        />
      </div>

      {/* Seção de Veículos e Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Veículos em Destaque
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Alertas Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-warning/10 rounded-lg border-l-4 border-l-warning">
                <Clock className="h-4 w-4 text-warning mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Manutenção Programada</p>
                  <p className="text-xs text-muted-foreground">
                    Mercedes Sprinter - ABC-1234
                  </p>
                  <p className="text-xs text-muted-foreground">Amanhã, 14:00</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border-l-4 border-l-destructive">
                <Fuel className="h-4 w-4 text-destructive mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Combustível Baixo</p>
                  <p className="text-xs text-muted-foreground">
                    Volkswagen Crafter - DEF-5678
                  </p>
                  <p className="text-xs text-muted-foreground">Nível: 15%</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg border-l-4 border-l-accent">
                <TrendingUp className="h-4 w-4 text-accent mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Meta Atingida</p>
                  <p className="text-xs text-muted-foreground">
                    Eficiência de combustível
                  </p>
                  <p className="text-xs text-muted-foreground">105% da meta mensal</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;