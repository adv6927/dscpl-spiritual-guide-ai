import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, User, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Peace be with you! I'm DSCPL, your spiritual AI companion. I'm here to guide you through devotionals, prayers, meditation, and provide spiritual support. How can I walk with you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [aiProvider, setAiProvider] = useState<"openai" | "gemini">("gemini");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: `Please enter your ${aiProvider === "openai" ? "OpenAI" : "Google Gemini"} API key to continue.`,
        variant: "destructive"
      });
      return;
    }
    localStorage.setItem(`${aiProvider}_api_key`, apiKey);
    localStorage.setItem("ai_provider", aiProvider);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: `Your ${aiProvider === "openai" ? "OpenAI" : "Google Gemini"} API key has been saved securely.`,
    });
  };

  useEffect(() => {
    const savedProvider = localStorage.getItem("ai_provider") as "openai" | "gemini" || "gemini";
    const savedKey = localStorage.getItem(`${savedProvider}_api_key`);
    if (savedKey) {
      setApiKey(savedKey);
      setAiProvider(savedProvider);
      setShowApiKeyInput(false);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response, data, assistantMessage: Message;
      
      if (aiProvider === "openai") {
        response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              {
                role: "system",
                content: "You are DSCPL, a spiritual AI companion. You provide biblical guidance, spiritual support, prayer assistance, devotional content, and help with accountability in faith matters. You are compassionate, wise, and rooted in Christian scripture. Always respond with love, grace, and biblical wisdom. Keep responses warm and encouraging."
              },
              ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
              })),
              { role: "user", content: input }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        if (!response.ok) {
          throw new Error("Failed to get response from OpenAI");
        }

        data = await response.json();
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.choices[0].message.content,
          timestamp: new Date()
        };
      } else {
        // Google Gemini
        response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are DSCPL, a spiritual AI companion. You provide biblical guidance, spiritual support, prayer assistance, devotional content, and help with accountability in faith matters. You are compassionate, wise, and rooted in Christian scripture. Always respond with love, grace, and biblical wisdom. Keep responses warm and encouraging.\n\nUser: ${input}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500
            }
          })
        });

        if (!response.ok) {
          throw new Error("Failed to get response from Gemini");
        }

        data = await response.json();
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.candidates[0].content.parts[0].text,
          timestamp: new Date()
        };
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: `Failed to send message. Please check your ${aiProvider === "openai" ? "OpenAI" : "Google Gemini"} API key and try again.`,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (showApiKeyInput) {
    return (
      <Card className="card-divine p-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-gradient-spiritual rounded-full flex items-center justify-center mx-auto">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Setup Required</h3>
            <p className="text-muted-foreground text-sm">
              Choose your AI provider and enter your API key to enable the spiritual AI companion.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">AI Provider</label>
              <select 
                value={aiProvider} 
                onChange={(e) => setAiProvider(e.target.value as "openai" | "gemini")}
                className="w-full p-2 border border-border rounded-md bg-background text-foreground text-sm"
              >
                <option value="gemini">Google Gemini (Recommended)</option>
                <option value="openai">OpenAI GPT-4</option>
              </select>
            </div>
            <Input
              type="password"
              placeholder={`Enter your ${aiProvider === "openai" ? "OpenAI" : "Google Gemini"} API key`}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full text-sm"
            />
            <Button onClick={saveApiKey} className="btn-divine w-full text-sm">
              Save API Key
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Your API key is stored locally and never shared.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="card-divine h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-glow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-spiritual rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">DSCPL</h3>
              <p className="text-sm text-muted-foreground">Spiritual AI Companion</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowApiKeyInput(true)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] flex items-start space-x-2 ${
                message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.role === "user" 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gradient-spiritual text-white"
              }`}>
                {message.role === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 bg-gradient-spiritual rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share your heart or ask for spiritual guidance..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={sendMessage} 
            disabled={isLoading || !input.trim()}
            className="btn-divine"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;