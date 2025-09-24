import { useState } from "react";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Filter } from "lucide-react";

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
  {
    id: "4",
    model: "Ford Transit",
    plate: "JKL-3456",
    status: "active" as const,
    driver: "Carlos Oliveira",
    location: "Belo Horizonte, MG",
    fuel: 67,
    passengers: 5,
    maxPassengers: 10,
  },
  {
    id: "5",
    model: "Renault Master",
    plate: "MNO-7890",
    status: "inactive" as const,
    location: "Garagem Principal",
    fuel: 45,
    passengers: 0,
    maxPassengers: 12,
  },
  {
    id: "6",
    model: "Peugeot Boxer",
    plate: "PQR-2468",
    status: "active" as const,
    driver: "Ana Costa",
    location: "Curitiba, PR",
    fuel: 78,
    passengers: 14,
    maxPassengers: 15,
  },
];

const Vehicles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVehicles = mockVehicles.filter((vehicle) => {
    const matchesSearch = 
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.driver?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: mockVehicles.length,
    active: mockVehicles.filter(v => v.status === "active").length,
    maintenance: mockVehicles.filter(v => v.status === "maintenance").length,
    inactive: mockVehicles.filter(v => v.status === "inactive").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestão de Veículos</h1>
        <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
          <Plus className="mr-2 h-4 w-4" />
          Novo Veículo
        </Button>
      </div>

      {/* Resumo de Status */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">{statusCounts.all}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{statusCounts.active}</div>
              <div className="text-sm text-muted-foreground">Ativos</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-warning">{statusCounts.maintenance}</div>
              <div className="text-sm text-muted-foreground">Manutenção</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-muted">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{statusCounts.inactive}</div>
              <div className="text-sm text-muted-foreground">Inativos</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros e Busca */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros e Pesquisa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por modelo, placa ou motorista..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="active">Ativos</SelectItem>
                <SelectItem value="maintenance">Em Manutenção</SelectItem>
                <SelectItem value="inactive">Inativos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Veículos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum veículo encontrado com os filtros aplicados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Vehicles;