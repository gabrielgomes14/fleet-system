import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  Settings, 
  Download,
  Filter,
  Plus,
  Eye,
  Edit3
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";

const fuelData = [
  { month: "Jan", consumo: 850, economia: 12 },
  { month: "Fev", consumo: 920, economia: 8 },
  { month: "Mar", consumo: 780, economia: 18 },
  { month: "Abr", consumo: 890, economia: 10 },
  { month: "Mai", consumo: 740, economia: 22 },
  { month: "Jun", consumo: 820, economia: 15 },
];

const vehicleStatusData = [
  { name: "Ativos", value: 18, color: "#22c55e" },
  { name: "Manutenção", value: 3, color: "#f59e0b" },
  { name: "Inativos", value: 2, color: "#6b7280" },
];

const performanceData = [
  { driver: "João Silva", efficiency: 95, trips: 42, rating: 4.8 },
  { driver: "Maria Santos", efficiency: 92, trips: 38, rating: 4.9 },
  { driver: "Carlos Oliveira", efficiency: 88, trips: 35, rating: 4.7 },
  { driver: "Ana Costa", efficiency: 90, trips: 40, rating: 4.6 },
];

const customKPIs = [
  { 
    id: "1", 
    name: "Eficiência Combustível", 
    value: "8.5L/100km", 
    target: "8.0L/100km", 
    trend: "+5%",
    isCustom: true 
  },
  { 
    id: "2", 
    name: "Tempo Médio Viagem", 
    value: "2.3h", 
    target: "2.0h", 
    trend: "-8%",
    isCustom: true 
  },
  { 
    id: "3", 
    name: "Satisfação Cliente", 
    value: "4.7/5", 
    target: "4.8/5", 
    trend: "+12%",
    isCustom: false 
  },
  { 
    id: "4", 
    name: "Custo por KM", 
    value: "R$ 1.85", 
    target: "R$ 1.70", 
    trend: "-3%",
    isCustom: true 
  },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [selectedKPI, setSelectedKPI] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & KPIs</h1>
          <p className="text-muted-foreground mt-1">
            Dashboards personalizados e indicadores customizáveis
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mês</SelectItem>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button className="bg-gradient-to-r from-primary to-primary-glow">
            <Plus className="mr-2 h-4 w-4" />
            Novo KPI
          </Button>
        </div>
      </div>

      {/* KPIs Customizáveis */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              KPIs Personalizados
            </CardTitle>
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Configurar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {customKPIs.map((kpi) => (
              <Card key={kpi.id} className="relative hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-muted-foreground">
                      {kpi.name}
                    </div>
                    {kpi.isCustom && (
                      <Badge variant="secondary" className="text-xs">
                        Custom
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {kpi.value}
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      Meta: {kpi.target}
                    </span>
                    <span className={`font-medium ${
                      kpi.trend.startsWith('+') ? 'text-accent' : 'text-destructive'
                    }`}>
                      {kpi.trend}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 mt-3">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit3 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gráficos Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consumo de Combustível */}
        <Card>
          <CardHeader>
            <CardTitle>Análise de Combustível</CardTitle>
            <p className="text-sm text-muted-foreground">
              Consumo mensal e economia em litros
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="consumo" 
                  stackId="1"
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="economia" 
                  stackId="2"
                  stroke="hsl(var(--accent))" 
                  fill="hsl(var(--accent))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status dos Veículos */}
        <Card>
          <CardHeader>
            <CardTitle>Status da Frota</CardTitle>
            <p className="text-sm text-muted-foreground">
              Distribuição atual dos veículos
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            
            <div className="flex justify-center gap-4 mt-4">
              {vehicleStatusData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance dos Motoristas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Performance dos Motoristas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="driver" />
              <YAxis />
              <Tooltip />
              <Bar 
                dataKey="efficiency" 
                fill="hsl(var(--primary))" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Filtros Avançados */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros Avançados
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de Veículo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="van">Vans</SelectItem>
                <SelectItem value="truck">Caminhões</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Motorista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="sp">São Paulo</SelectItem>
                <SelectItem value="rj">Rio de Janeiro</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="w-full">
              Aplicar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;