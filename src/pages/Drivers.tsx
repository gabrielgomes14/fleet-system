import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  Phone, 
  Mail, 
  MapPin, 
  Star,
  Clock,
  Car
} from "lucide-react";

const mockDrivers = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-1234",
    license: "AB - 123456789",
    status: "active" as const,
    location: "São Paulo, SP",
    vehicle: "Mercedes Sprinter - ABC-1234",
    rating: 4.8,
    experience: "5 anos",
    lastTrip: "há 2 horas",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com", 
    phone: "(21) 98888-5678",
    license: "AB - 987654321",
    status: "active" as const,
    location: "Rio de Janeiro, RJ",
    vehicle: "Iveco Daily - GHI-9012",
    rating: 4.9,
    experience: "8 anos",
    lastTrip: "há 1 hora",
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    phone: "(31) 97777-9012",
    license: "AB - 456789123",
    status: "available" as const,
    location: "Belo Horizonte, MG",
    vehicle: "Ford Transit - JKL-3456",
    rating: 4.7,
    experience: "3 anos",
    lastTrip: "há 4 horas",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(41) 96666-3456",
    license: "AB - 789123456",
    status: "active" as const,
    location: "Curitiba, PR",
    vehicle: "Peugeot Boxer - PQR-2468",
    rating: 4.6,
    experience: "2 anos",
    lastTrip: "há 30 min",
  },
  {
    id: "5",
    name: "Roberto Lima",
    email: "roberto@email.com",
    phone: "(51) 95555-7890",
    license: "AB - 321654987",
    status: "offline" as const,
    location: "Porto Alegre, RS",
    vehicle: "Não atribuído",
    rating: 4.5,
    experience: "6 anos",
    lastTrip: "ontem",
  },
];

const statusColors = {
  active: "bg-accent text-accent-foreground",
  available: "bg-primary text-primary-foreground", 
  offline: "bg-muted text-muted-foreground",
};

const statusLabels = {
  active: "Em Viagem",
  available: "Disponível",
  offline: "Offline",
};

function DriverCard({ driver }: { driver: typeof mockDrivers[0] }) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground font-semibold">
              {driver.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{driver.name}</h3>
              <Badge className={statusColors[driver.status]}>
                {statusLabels[driver.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{driver.license}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{driver.email}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{driver.phone}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{driver.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{driver.vehicle}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{driver.rating}</span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            {driver.experience} exp.
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{driver.lastTrip}</span>
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Perfil
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            Localizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const Drivers = () => {
  const statusCounts = {
    total: mockDrivers.length,
    active: mockDrivers.filter(d => d.status === "active").length,
    available: mockDrivers.filter(d => d.status === "available").length,
    offline: mockDrivers.filter(d => d.status === "offline").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Gestão de Motoristas</h1>
        <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
          <Plus className="mr-2 h-4 w-4" />
          Novo Motorista
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
        
        <Card className="border-l-4 border-l-accent">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{statusCounts.active}</div>
              <div className="text-sm text-muted-foreground">Em Viagem</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{statusCounts.available}</div>
              <div className="text-sm text-muted-foreground">Disponíveis</div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-muted">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-muted-foreground">{statusCounts.offline}</div>
              <div className="text-sm text-muted-foreground">Offline</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Motoristas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockDrivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </div>
  );
};

export default Drivers;