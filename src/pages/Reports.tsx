import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar,
  Clock,
  Plus,
  Send,
  Eye,
  Edit,
  Trash2,
  Bot,
  Zap
} from "lucide-react";

const reportTemplates = [
  {
    id: "1",
    name: "Relatório Mensal de Frota",
    description: "Análise completa do desempenho mensal",
    lastGenerated: "2024-09-20",
    status: "active",
    autoFill: true
  },
  {
    id: "2", 
    name: "Eficiência de Combustível",
    description: "Consumo e economia por veículo",
    lastGenerated: "2024-09-22",
    status: "active",
    autoFill: true
  },
  {
    id: "3",
    name: "Performance de Motoristas", 
    description: "Avaliação individual dos condutores",
    lastGenerated: "2024-09-18",
    status: "draft",
    autoFill: false
  },
  {
    id: "4",
    name: "Custos Operacionais",
    description: "Análise financeira detalhada",
    lastGenerated: "2024-09-15",
    status: "active", 
    autoFill: true
  }
];

const recentReports = [
  {
    id: "r1",
    name: "Relatório Semanal - Set/24",
    type: "Automático",
    generatedAt: "2024-09-23 09:30",
    size: "2.3 MB",
    format: "PDF"
  },
  {
    id: "r2",
    name: "Análise Trimestral Q3",
    type: "Manual", 
    generatedAt: "2024-09-20 14:15",
    size: "4.7 MB",
    format: "Excel"
  },
  {
    id: "r3",
    name: "Manutenções Setembro",
    type: "Automático",
    generatedAt: "2024-09-19 08:00", 
    size: "1.8 MB",
    format: "PDF"
  }
];

const Reports = () => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [reportName, setReportName] = useState("");
  const [reportDescription, setReportDescription] = useState("");

  const handleGenerateReport = () => {
    // Aqui seria a lógica de geração do relatório
    console.log("Gerando relatório...");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios Inteligentes</h1>
          <p className="text-muted-foreground mt-1">
            Geração automática e personalizada de relatórios
          </p>
        </div>
        
        <Button className="bg-gradient-to-r from-primary to-primary-glow">
          <Plus className="mr-2 h-4 w-4" />
          Novo Template
        </Button>
      </div>

      {/* Geração Rápida */}
      <Card className="border-l-4 border-l-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Geração Rápida com IA
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Descreva o relatório que você precisa e nossa IA irá gerar automaticamente
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Nome do Relatório</Label>
              <Input
                id="report-name"
                placeholder="Ex: Análise de Consumo Semanal"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Período</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Última Semana</SelectItem>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Trimestre</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição do que você precisa</Label>
            <Textarea
              id="description"
              placeholder="Ex: Quero um relatório que mostre o consumo de combustível por veículo, incluindo gráficos de tendência e comparação com o mês anterior..."
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleGenerateReport}
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
            >
              <Bot className="mr-2 h-4 w-4" />
              Gerar com IA
            </Button>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Templates de Relatório */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Templates de Relatório</CardTitle>
              <p className="text-sm text-muted-foreground">
                Modelos pré-configurados com preenchimento automático
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportTemplates.map((template) => (
                  <Card key={template.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {template.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {template.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {template.autoFill && (
                            <Badge className="bg-accent/10 text-accent">
                              Auto-Fill
                            </Badge>
                          )}
                          <Badge variant={template.status === 'active' ? 'default' : 'secondary'}>
                            {template.status === 'active' ? 'Ativo' : 'Rascunho'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Último: {new Date(template.lastGenerated).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Send className="mr-2 h-3 w-3" />
                          Gerar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-3 w-3" />
                          Visualizar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Relatórios Recentes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Relatórios Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {report.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {report.format}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-3">
                    {report.generatedAt} • {report.size}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Baixar
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Configurações de Automação */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Automação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Frequência de Relatórios</Label>
                <Select defaultValue="weekly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Enviar por Email</Label>
                <Input placeholder="seuemail@empresa.com" />
              </div>
              
              <Button variant="outline" className="w-full">
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Reports;