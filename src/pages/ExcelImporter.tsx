import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  Download,
  RefreshCw,
  Settings,
  MapPin,
  Fuel,
  Clock
} from "lucide-react";
import { toast } from "sonner";

const columnMappings = {
  vehicle_id: "ID do Veículo",
  plate: "Placa",
  model: "Modelo",
  driver_name: "Nome do Motorista",
  fuel_consumption: "Consumo (L/100km)",
  km_traveled: "KM Rodados",
  maintenance_cost: "Custo Manutenção",
  location: "Localização",
  trip_date: "Data da Viagem"
};

const sampleData = [
  {
    vehicle_id: "V001",
    plate: "ABC-1234", 
    model: "Mercedes Sprinter",
    driver_name: "João Silva",
    fuel_consumption: 8.5,
    km_traveled: 245,
    maintenance_cost: 450.00,
    location: "São Paulo, SP",
    trip_date: "2024-09-23"
  },
  {
    vehicle_id: "V002",
    plate: "DEF-5678",
    model: "Volkswagen Crafter", 
    driver_name: "Maria Santos",
    fuel_consumption: 9.2,
    km_traveled: 189,
    maintenance_cost: 320.00,
    location: "Rio de Janeiro, RJ",
    trip_date: "2024-09-23"
  },
  {
    vehicle_id: "V003", 
    plate: "GHI-9012",
    model: "Iveco Daily",
    driver_name: "Carlos Oliveira",
    fuel_consumption: 7.8,
    km_traveled: 298,
    maintenance_cost: 275.00,
    location: "Belo Horizonte, MG",
    trip_date: "2024-09-23"
  }
];

const ExcelImporter = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importedData, setImportedData] = useState(sampleData);
  const [selectedColumns, setSelectedColumns] = useState<Record<string, string>>({});
  const [importStatus, setImportStatus] = useState<"idle" | "success" | "error">("success");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadProgress(0);

    // Simular upload e processamento
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setImportStatus("success");
          toast.success("Excel importado com sucesso!");
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleGenerateCharts = () => {
    toast.success("Gráficos gerados a partir dos dados do Excel!");
  };

  const handleGenerateKPIs = () => {
    toast.success("KPIs atualizados com os novos dados!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Importador Excel</h1>
          <p className="text-muted-foreground mt-1">
            Transforme planilhas em dashboards inteligentes automaticamente
          </p>
        </div>
        
        <Button 
          onClick={() => fileInputRef.current?.click()}
          className="bg-gradient-to-r from-primary to-primary-glow"
          disabled={isProcessing}
        >
          <Upload className="mr-2 h-4 w-4" />
          {isProcessing ? "Processando..." : "Importar Excel"}
        </Button>
      </div>

      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Upload de Arquivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          <div 
            className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Arraste arquivos Excel aqui ou clique para selecionar
            </h3>
            <p className="text-muted-foreground mb-4">
              Suporte para .xlsx, .xls, .csv (máximo 10MB)
            </p>
            
            {isProcessing && (
              <div className="max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Processando arquivo...</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Mapeamento de Colunas */}
      {importStatus === "success" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Mapeamento de Colunas
              </CardTitle>
              <Badge className="bg-accent/10 text-accent">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mapeamento Automático
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {Object.entries(columnMappings).map(([key, label]) => (
                <div key={key} className="space-y-2">
                  <Label>{label}</Label>
                  <Select defaultValue={key}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={key}>{label}</SelectItem>
                      <SelectItem value="ignore">Ignorar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleGenerateCharts}>
                <BarChart3 className="mr-2 h-4 w-4" />
                Gerar Gráficos
              </Button>
              <Button variant="outline" onClick={handleGenerateKPIs}>
                <MapPin className="mr-2 h-4 w-4" />
                Atualizar KPIs
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Preview dos Dados */}
      {importStatus === "success" && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Preview dos Dados Importados</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  {importedData.length} registros
                </Badge>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Placa</TableHead>
                    <TableHead>Modelo</TableHead>
                    <TableHead>Motorista</TableHead>
                    <TableHead>Consumo (L/100km)</TableHead>
                    <TableHead>KM Rodados</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Data</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {importedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono">{row.plate}</TableCell>
                      <TableCell>{row.model}</TableCell>
                      <TableCell>{row.driver_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Fuel className="h-3 w-3 text-muted-foreground" />
                          {row.fuel_consumption}
                        </div>
                      </TableCell>
                      <TableCell>{row.km_traveled} km</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {row.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {new Date(row.trip_date).toLocaleDateString('pt-BR')}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Estatísticas de Processamento */}
      {importStatus === "success" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {importedData.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Registros Processados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">8</div>
                  <div className="text-sm text-muted-foreground">
                    Gráficos Gerados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">0</div>
                  <div className="text-sm text-muted-foreground">
                    Erros Detectados
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ExcelImporter;