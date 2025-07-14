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
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-gray-500" />
            </div>
          )}
        </div>
      )}
      
      <div className={`flex flex-col gap-1 max-w-xs ${isUser ? 'items-end' : 'items-start'}`}>
        <Card className={`p-3 relative ${
          isUser 
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25 border-0' 
            : 'bg-white text-gray-900 shadow-sm border-border'
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
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
        </div>
      )}
    </div>
  );
}