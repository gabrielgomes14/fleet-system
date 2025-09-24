import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  User, 
  Bell, 
  Shield, 
  Settings,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  Eye,
  Lock
} from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-1234",
    role: "Gerente de Frota",
    company: "Transportes ABC Ltda",
    location: "São Paulo, SP",
    bio: "Especialista em gestão de frotas com mais de 10 anos de experiência no setor logístico.",
    joinDate: "2020-03-15"
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    maintenance: true,
    reports: false,
    alerts: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    passwordReminder: true
  });

  const handleSaveProfile = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleSaveNotifications = () => {
    toast.success("Configurações de notificação salvas!");
  };

  const handleSaveSecurity = () => {
    toast.success("Configurações de segurança atualizadas!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie suas informações pessoais e configurações
          </p>
        </div>
        
        <Badge className="bg-primary/10 text-primary">
          <Award className="mr-1 h-3 w-3" />
          Administrador
        </Badge>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferências
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar e Info Básica */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarFallback className="text-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                      {profileData.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 w-8 h-8"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">
                    {profileData.name}
                  </h3>
                  <p className="text-muted-foreground">{profileData.role}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {profileData.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Desde {new Date(profileData.joinDate).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      className="pl-10"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-10"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="role">Cargo</Label>
                  <Select value={profileData.role} onValueChange={(value) => setProfileData({...profileData, role: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Gerente de Frota">Gerente de Frota</SelectItem>
                      <SelectItem value="Supervisor">Supervisor</SelectItem>
                      <SelectItem value="Administrador">Administrador</SelectItem>
                      <SelectItem value="Analista">Analista</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Input
                    id="company"
                    value={profileData.company}
                    onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Localização</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="location"
                      className="pl-10"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  placeholder="Conte um pouco sobre sua experiência profissional..."
                />
              </div>
              
              <Button onClick={handleSaveProfile} className="bg-gradient-to-r from-primary to-primary-glow">
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificação</CardTitle>
              <p className="text-sm text-muted-foreground">
                Escolha como e quando você quer ser notificado
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber atualizações por email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Notificações Push</Label>
                    <p className="text-sm text-muted-foreground">Alertas no navegador</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Alertas de Manutenção</Label>
                    <p className="text-sm text-muted-foreground">Lembrete de manutenções programadas</p>
                  </div>
                  <Switch 
                    checked={notifications.maintenance}
                    onCheckedChange={(checked) => setNotifications({...notifications, maintenance: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Relatórios Automáticos</Label>
                    <p className="text-sm text-muted-foreground">Envio automático de relatórios</p>
                  </div>
                  <Switch 
                    checked={notifications.reports}
                    onCheckedChange={(checked) => setNotifications({...notifications, reports: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Alertas Críticos</Label>
                    <p className="text-sm text-muted-foreground">Emergências e situações críticas</p>
                  </div>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
                  />
                </div>
              </div>
              
              <Button onClick={handleSaveNotifications} className="bg-gradient-to-r from-primary to-primary-glow">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Autenticação de Dois Fatores</Label>
                    <p className="text-sm text-muted-foreground">Adicionar uma camada extra de segurança</p>
                  </div>
                  <Switch 
                    checked={security.twoFactor}
                    onCheckedChange={(checked) => setSecurity({...security, twoFactor: checked})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Timeout da Sessão</Label>
                  <Select 
                    value={security.sessionTimeout} 
                    onValueChange={(value) => setSecurity({...security, sessionTimeout: value})}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="240">4 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Lembrete de Senha</Label>
                    <p className="text-sm text-muted-foreground">Notificar sobre alteração de senha</p>
                  </div>
                  <Switch 
                    checked={security.passwordReminder}
                    onCheckedChange={(checked) => setSecurity({...security, passwordReminder: checked})}
                  />
                </div>
              </div>
              
              <div className="border-t pt-6">
                <h4 className="text-lg font-medium mb-4">Alterar Senha</h4>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <Label>Senha Atual</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" className="pl-10" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Confirmar Nova Senha</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="password" className="pl-10" />
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleSaveSecurity} className="bg-gradient-to-r from-primary to-primary-glow">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferências */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferências do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="pt-BR">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Fuso Horário</Label>
                  <Select defaultValue="America/Sao_Paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (UTC-3)</SelectItem>
                      <SelectItem value="America/New_York">New York (UTC-5)</SelectItem>
                      <SelectItem value="Europe/London">London (UTC+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Formato de Data</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Unidade de Medida</Label>
                  <Select defaultValue="metric">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Métrico (km, L)</SelectItem>
                      <SelectItem value="imperial">Imperial (mi, gal)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-primary to-primary-glow">
                <Save className="mr-2 h-4 w-4" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;