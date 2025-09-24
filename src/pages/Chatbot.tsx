import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Mic,
  MicOff
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  insights?: {
    type: "chart" | "kpi" | "alert" | "suggestion";
    data?: any;
  };
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "bot",
    content: "👋 Olá! Sou o assistente inteligente do FleetManager. Posso ajudar você a analisar seus KPIs, gerar insights sobre a frota e responder perguntas sobre os dados. Como posso ajudar hoje?",
    timestamp: new Date(),
  }
];

const suggestedQuestions = [
  "Qual o consumo médio da frota este mês?",
  "Quais veículos precisam de manutenção?",
  "Como está a performance dos motoristas?",
  "Gere um relatório de eficiência",
  "Quais são os principais alertas?"
];

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage: string): Message => {
    const responses = {
      consumo: {
        content: "📊 **Análise de Consumo da Frota (Setembro 2024)**\n\n• **Consumo médio:** 8.5L/100km\n• **Meta:** 8.0L/100km\n• **Variação:** +6.25% acima da meta\n• **Melhor veículo:** Iveco Daily (7.8L/100km)\n• **Pior desempenho:** VW Crafter (9.2L/100km)\n\n💡 **Recomendação:** Revisar estilo de condução e realizar manutenção preventiva nos veículos com maior consumo.",
        insights: { type: "chart" as const }
      },
      manutenção: {
        content: "🔧 **Alertas de Manutenção**\n\n**Urgente:**\n• Mercedes Sprinter (ABC-1234) - Revisão 20.000km vencida\n• Ford Transit (JKL-3456) - Troca de pneus necessária\n\n**Programada:**\n• VW Crafter (DEF-5678) - Troca de óleo em 5 dias\n• Iveco Daily (GHI-9012) - Revisão geral em 2 semanas\n\n📅 Total: 4 veículos necessitam atenção",
        insights: { type: "alert" as const }
      },
      performance: {
        content: "👥 **Performance dos Motoristas (Última Semana)**\n\n🏆 **Melhores:**\n• Maria Santos - 95% eficiência, 4.9★\n• João Silva - 92% eficiência, 4.8★\n\n⚠️ **Necessitam treinamento:**\n• Carlos Oliveira - 88% eficiência\n• Ana Costa - 90% eficiência\n\n📈 **Média geral:** 91.2% eficiência",
        insights: { type: "kpi" as const }
      },
      relatório: {
        content: "📋 **Relatório de Eficiência Gerado**\n\n✅ Incluindo:\n• Análise de consumo por veículo\n• Performance individual dos motoristas\n• Comparativo mensal\n• Recomendações de otimização\n\n📎 O relatório foi salvo e pode ser exportado na seção de Relatórios.",
        insights: { type: "suggestion" as const }
      },
      default: {
        content: "Entendi! Com base nos dados da sua frota, posso fornecer insights específicos. Você gostaria de analisar algum indicador em particular? Por exemplo: consumo, manutenção, performance dos motoristas ou custos operacionais.",
        insights: { type: "suggestion" as const }
      }
    };

    const messageKey = userMessage.toLowerCase().includes('consumo') ? 'consumo' :
                      userMessage.toLowerCase().includes('manutenção') || userMessage.toLowerCase().includes('manutencion') ? 'manutenção' :
                      userMessage.toLowerCase().includes('performance') || userMessage.toLowerCase().includes('motorista') ? 'performance' :
                      userMessage.toLowerCase().includes('relatório') || userMessage.toLowerCase().includes('relatorio') ? 'relatório' :
                      'default';

    return {
      id: Date.now().toString(),
      type: "bot",
      content: responses[messageKey].content,
      timestamp: new Date(),
      insights: responses[messageKey].insights
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simular resposta do bot
    setTimeout(() => {
      const botResponse = simulateBotResponse(inputMessage);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Aqui implementaria a funcionalidade de reconhecimento de voz
  };

  const formatMessageContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <div key={index}>
        {line.includes('**') ? 
          <strong>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</strong> : 
          line
        }
      </div>
    ));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbot Inteligente</h1>
          <p className="text-muted-foreground mt-1">
            Análise em tempo real dos seus KPIs e dados de frota
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-accent/10 to-accent/20 text-accent border-accent/30">
          <Bot className="mr-1 h-3 w-3" />
          IA Ativa
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Conversa
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "bot" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`rounded-lg px-4 py-3 max-w-[80%] ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground ml-auto"
                          : "bg-muted"
                      }`}
                    >
                      <div className="text-sm leading-relaxed">
                        {formatMessageContent(message.content)}
                      </div>
                      
                      {message.insights && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-2 text-xs">
                            {message.insights.type === "chart" && (
                              <>
                                <BarChart3 className="w-3 h-3" />
                                <span>Gráfico disponível nos Analytics</span>
                              </>
                            )}
                            {message.insights.type === "kpi" && (
                              <>
                                <TrendingUp className="w-3 h-3" />
                                <span>KPIs atualizados no dashboard</span>
                              </>
                            )}
                            {message.insights.type === "alert" && (
                              <>
                                <AlertTriangle className="w-3 h-3" />
                                <span>Alertas criados automaticamente</span>
                              </>
                            )}
                            {message.insights.type === "suggestion" && (
                              <>
                                <Lightbulb className="w-3 h-3" />
                                <span>Sugestão de ação</span>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-secondary">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua pergunta sobre a frota..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleVoiceInput}
                  className={isListening ? "bg-accent text-accent-foreground" : ""}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="bg-gradient-to-r from-primary to-primary-glow"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Perguntas Sugeridas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
                  onClick={() => handleSuggestedQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Insights Rápidos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Insights Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-accent/10 rounded-lg border-l-4 border-l-accent">
                <div className="text-sm font-medium text-accent">⚡ Alerta</div>
                <div className="text-xs text-muted-foreground mt-1">
                  3 veículos precisam de manutenção
                </div>
              </div>
              
              <div className="p-3 bg-primary/10 rounded-lg border-l-4 border-l-primary">
                <div className="text-sm font-medium text-primary">📈 Tendência</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Eficiência subiu 5% este mês
                </div>
              </div>
              
              <div className="p-3 bg-warning/10 rounded-lg border-l-4 border-l-warning">
                <div className="text-sm font-medium text-warning">💡 Sugestão</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Revisar rotas para economizar combustível
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;