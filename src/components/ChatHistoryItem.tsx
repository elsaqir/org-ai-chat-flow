import { MessageCircle, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChatHistory {
  id: string;
  organizationName: string;
  organizationLogo?: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount?: number;
}

interface ChatHistoryItemProps {
  chat: ChatHistory;
  onSelect: (chatId: string) => void;
  isSelected?: boolean;
}

export function ChatHistoryItem({ chat, onSelect, isSelected }: ChatHistoryItemProps) {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    }
  };

  return (
    <Card 
      className={cn(
        "group p-4 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/20 border backdrop-blur-sm",
        isSelected 
          ? 'border-orange-300 shadow-lg shadow-orange-500/20 bg-gradient-to-br from-orange-50 to-orange-100/50 ring-1 ring-orange-200' 
          : 'border-gray-200/60 hover:border-gray-300/80 bg-white/60 hover:bg-white/80'
      )}
      onClick={() => onSelect(chat.id)}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 relative">
          {chat.organizationLogo ? (
            <img 
              src={chat.organizationLogo} 
              alt={`${chat.organizationName} logo`}
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-gray-500" />
            </div>
          )}
          
          {chat.unreadCount && chat.unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-medium">
                {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 text-sm truncate">
              {chat.organizationName}
            </h4>
            <span className="text-xs text-gray-400 flex-shrink-0">
              {formatTime(chat.timestamp)}
            </span>
          </div>
          
          <p className="text-xs text-gray-500 line-clamp-2">
            {chat.lastMessage}
          </p>
        </div>
      </div>
    </Card>
  );
}