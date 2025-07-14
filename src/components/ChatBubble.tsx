import { Check, CheckCheck, Building2, User } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

interface ChatBubbleProps {
  message: Message;
  organizationLogo?: string;
}

export function ChatBubble({ message, organizationLogo }: ChatBubbleProps) {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getStatusIcon = () => {
    if (!isUser || !message.status) return null;
    
    switch (message.status) {
      case 'sending':
        return <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          {organizationLogo ? (
            <img 
              src={organizationLogo} 
              alt="Organization logo"
              className="w-9 h-9 rounded-2xl object-cover shadow-lg"
            />
          ) : (
            <div className="w-9 h-9 rounded-2xl bg-gray-100 flex items-center justify-center shadow-lg">
              <Building2 className="w-4 h-4 text-gray-500" />
            </div>
          )}
        </div>
      )}
      
      <div className={`flex flex-col gap-1 max-w-sm ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`p-4 relative shadow-lg backdrop-blur-sm border-0 ${
          isUser 
            ? 'bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white shadow-orange-500/25' 
            : 'bg-white/90 text-gray-900 shadow-gray-900/10'
        }`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
        </Card>
        
        <div className="flex items-center gap-1 px-1">
          <span className={`text-xs ${isUser ? 'text-gray-400' : 'text-gray-400'}`}>
            {formatTime(message.timestamp)}
          </span>
          {getStatusIcon()}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}