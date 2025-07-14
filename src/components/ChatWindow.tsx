import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Smile, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatBubble } from "./ChatBubble";

interface Organization {
  id: string;
  name: string;
  category: string;
  description: string;
  logo?: string;
  verified: boolean;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatWindowProps {
  organization: Organization;
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping?: boolean;
}

export function ChatWindow({ organization, messages, onSendMessage, isTyping }: ChatWindowProps) {
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!messageInput.trim() || isLoading) return;
    
    const content = messageInput.trim();
    setMessageInput("");
    setIsLoading(true);
    
    try {
      await onSendMessage(content);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/60 backdrop-blur-xl">
      {/* Chat Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-200/50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex-shrink-0">
          {organization.logo ? (
            <img 
              src={organization.logo} 
              alt={`${organization.name} logo`}
              className="w-14 h-14 rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Building2 className="w-7 h-7 text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
              {organization.name}
            </h2>
            {organization.verified && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                ✓ Verified
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm shadow-green-400/50"></div>
            <p className="text-sm text-gray-500 capitalize font-medium">
              {organization.category} • Online now
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/30 to-white/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center mb-6 shadow-xl shadow-orange-500/30">
              <Building2 className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3 tracking-tight">
              Start a conversation with {organization.name}
            </h3>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Ask questions, get support, or learn more about their services. They're here to help!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatBubble 
                key={message.id} 
                message={message} 
                organizationLogo={organization.logo}
              />
            ))}
            
            {isTyping && (
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  {organization.logo ? (
                    <img 
                      src={organization.logo} 
                      alt="Organization logo"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                </div>
                
                <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-lg border-gray-200/50">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </Card>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gray-200/50 bg-white/80 backdrop-blur-xl">
        <div className="relative">
          <Textarea
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${organization.name}...`}
            className="pr-24 min-h-[56px] max-h-32 resize-none rounded-3xl border-gray-200/60 bg-gray-50/80 text-base leading-relaxed placeholder:text-gray-400 focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            disabled={isLoading}
          />
          
          <div className="absolute right-3 bottom-3 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 rounded-xl"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-gray-400 hover:text-gray-600 rounded-xl"
            >
              <Smile className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={!messageInput.trim() || isLoading}
              variant="gradient"
              size="icon"
              className="w-10 h-10 rounded-2xl shadow-lg shadow-orange-500/25"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <span>Press</span>
            <kbd className="px-2 py-1 bg-gray-100 rounded text-gray-600 font-mono">Enter</kbd>
            <span>to send</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
            <span>Secure conversation</span>
          </div>
        </div>
      </div>
    </div>
  );
}