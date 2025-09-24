import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, 
  BarChart3, 
  MessageCircle, 
  FileSpreadsheet, 
  Users, 
  Shield,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";
import fleetHero from "@/assets/fleet-hero.jpg";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BarChart3,
    title: "Analytics Avançada",
    description: "Gráficos interativos e KPIs customizáveis para insights precisos"
  },
  {
    icon: MessageCircle,
    title: "Chatbot Inteligente", 
    description: "IA para análise instantânea dos seus indicadores de frota"
  },
  {
    icon: FileSpreadsheet,
    title: "Importador Excel",
    description: "Transforme planilhas em dashboards inteligentes automaticamente"
  },
  {
    icon: Car,
    title: "Gestão Completa",
    description: "Controle total de veículos, motoristas e manutenções"
  },
  {
    icon: Zap,
    title: "Relatórios Automáticos",
    description: "Geração inteligente de relatórios personalizados"
  },
  {
    icon: Shield,
    title: "Seguro e Confiável",
    description: "Sistema robusto com autenticação e backup automático"
  }
];

const stats = [
  { label: "Empresas Atendidas", value: "500+" },
  { label: "Veículos Gerenciados", value: "12K+" },
  { label: "Uptime", value: "99.9%" },
  { label: "Satisfação", value: "4.9/5" }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
            <Car className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground">FleetManager</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="outline">Entrar</Button>
          </Link>
          <Button className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
            Começar Grátis
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-accent/10 text-accent hover:bg-accent/20">
          🚀 Novo: Chatbot com IA para Insights
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
          Gestão de Frotas
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent block">
            Inteligente
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Transforme dados em decisões inteligentes. Importe Excel, gere gráficos automáticos 
          e obtenha insights instantâneos com nosso chatbot alimentado por IA.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-lg px-8">
              Experimentar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="text-lg px-8">
            Ver Demo
          </Button>
        </div>

        {/* Hero Image */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 rounded-3xl blur-3xl transform -rotate-6"></div>
          <img 
            src={fleetHero} 
            alt="Dashboard FleetManager" 
            className="relative rounded-2xl shadow-2xl border border-border/50"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Tudo que você precisa para gerenciar sua frota
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Funcionalidades avançadas que transformam a gestão da sua frota em vantagem competitiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/50 hover:border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-primary/5 via-primary-glow/5 to-primary/5 border-primary/20">
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Pronto para transformar sua gestão de frota?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já otimizaram suas operações com FleetManager.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-lg px-8">
                  Começar Gratuitamente
                  <CheckCircle className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>Avaliação 4.9/5 baseada em 200+ avaliações</span>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 border-t">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Car className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">FleetManager</span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            © 2024 FleetManager. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;