import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Fuel, Users } from "lucide-react";

interface Vehicle {
  id: string;
  model: string;
  plate: string;
  status: "active" | "maintenance" | "inactive";
  driver?: string;
  location: string;
  fuel: number;
  passengers: number;
  maxPassengers: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const statusColors = {
  active: "bg-accent text-accent-foreground",
  maintenance: "bg-warning text-warning-foreground",
  inactive: "bg-muted text-muted-foreground",
};

const statusLabels = {
  active: "Ativo",
  maintenance: "Manutenção",
  inactive: "Inativo",
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">{vehicle.model}</h3>
          </div>
          <Badge className={statusColors[vehicle.status]}>
            {statusLabels[vehicle.status]}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-mono">
          {vehicle.plate}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{vehicle.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{vehicle.fuel}%</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {vehicle.passengers}/{vehicle.maxPassengers}
            </span>
          </div>
          
          {vehicle.driver && (
            <div className="col-span-2">
              <span className="text-sm text-muted-foreground">
                Motorista: <span className="text-foreground font-medium">{vehicle.driver}</span>
              </span>
            </div>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            Detalhes
          </Button>
          <Button variant="secondary" size="sm" className="flex-1">
            Localizar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}