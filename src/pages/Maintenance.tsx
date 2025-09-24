import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  Wrench,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  Car,
  User
} from "lucide-react";

const mockMaintenanceRecords = [
  {
    id: "1",
    vehicle: "Mercedes Sprinter - ABC-1234",
    type: "Preventiva",
    description: "Troca de óleo e filtros",
    status: "scheduled" as const,
    scheduledDate: "2024-09-25",
    estimatedCost: "R$ 450,00",
    mechanic: "João Mecânico",
    priority: "medium" as const,
  },
  {
    id: "2", 
    vehicle: "Volkswagen Crafter - DEF-5678",
    type: "Corretiva",
    description: "Problema no sistema de freios",
    status: "in_progress" as const,
    scheduledDate: "2024-09-24",
    estimatedCost: "R$ 1.200,00",
    mechanic: "Carlos Silva", 
    priority: "high" as const,
  },
  {
    id: "3",
    vehicle: "Iveco Daily - GHI-9012", 
    type: "Preventiva",
    description: "Revisão geral dos 20.000km",
    status: "completed" as const,
    scheduledDate: "2024-09-20",
    estimatedCost: "R$ 800,00",
    mechanic: "Maria Santos",
    priority: "low" as const,
  },
  {
    id: "4",
    vehicle: "Ford Transit - JKL-3456",
    type: "Corretiva", 
    description: "Troca de pneus dianteiros",
    status: "scheduled" as const,
    scheduledDate: "2024-09-26",
    estimatedCost: "R$ 600,00",
    mechanic: "Pedro Oliveira",
    priority: "medium" as const,
  },
];

const statusColors = {
  scheduled: "bg-primary text-primary-foreground",
  in_progress: "bg-warning text-warning-foreground", 
  completed: "bg-accent text-accent-foreground",
};

const statusLabels = {
  scheduled: "Agendada",
  in_progress: "Em Andamento",
  completed: "Concluída", 
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning text-warning-foreground",
  high: "bg-destructive text-destructive-foreground",
};

const priorityLabels = {
  low: "Baixa",
  medium: "Média", 
  high: "Alta",
};

function MaintenanceCard({ record }: { record: typeof mockMaintenanceRecords[0] }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">{record.type}</h3>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={priorityColors[record.priority]} variant="outline">
              {priorityLabels[record.priority]}
            </Badge>
            <Badge className={statusColors[record.status]}>
              {statusLabels[record.status]}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{record.description}</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{record.vehicle}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(record.scheduledDate).toLocaleDateString('pt-BR')}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{record.mechanic}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm font-medium text-foreground">
            {record.estimatedCost}
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Detalhes
            </Button>
            {record.status === "scheduled" && (
              <Button variant="secondary" size="sm">
                Iniciar
              </Button>
            )}
            {record.status === "in_progress" && (
              <Button variant="default" size="sm">
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const Maintenance = () => {
  const statusCounts = {
    total: mockMaintenanceRecords.length,
    scheduled: mockMaintenanceRecords.filter(r => r.status === "scheduled").length,
    in_progress: mockMaintenanceRecords.filter(r => r.status === "in_progress").length,
    completed: mockMaintenanceRecords.filter(r => r.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestão de Manutenção</h1>
        <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
          <Plus className="mr-2 h-4 w-4" />
          Agendar Manutenção
        </Button>
      </div>

      {/* Resumo de Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{statusCounts.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{statusCounts.scheduled}</div>
              <div className="text-sm text-muted-foreground">Agendadas</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{statusCounts.in_progress}</div>
              <div className="text-sm text-muted-foreground">Em Andamento</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{statusCounts.completed}</div>
              <div className="text-sm text-muted-foreground">Concluídas</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Próximas Manutenções */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Próximas Manutenções
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMaintenanceRecords
              .filter(record => record.status === "scheduled")
              .slice(0, 2)
              .map((record) => (
              <div key={record.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="w-2 h-12 bg-primary rounded-full" />
                <div className="flex-1">
                  <div className="font-medium text-foreground">{record.vehicle}</div>
                  <div className="text-sm text-muted-foreground">{record.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(record.scheduledDate).toLocaleDateString('pt-BR')} - {record.mechanic}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{record.estimatedCost}</div>
                  <Badge className={priorityColors[record.priority]} variant="outline">
                    {priorityLabels[record.priority]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Manutenções */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMaintenanceRecords.map((record) => (
          <MaintenanceCard key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};

export default Maintenance;