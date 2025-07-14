import { useState } from "react";
import { Building2, MessageSquare, Search, Filter, Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrganizationCard } from "./OrganizationCard";
import { ChatHistoryItem } from "./ChatHistoryItem";
import type { Organization, ChatHistory } from "@/data/mockData";

interface UnifiedSidebarProps {
  organizations: Organization[];
  chatHistories: ChatHistory[];
  selectedOrganization: Organization | null;
  selectedChat: string | null;
  onOrganizationSelect: (org: Organization) => void;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

type SidebarTab = 'organizations' | 'chats';

export function UnifiedSidebar({
  organizations,
  chatHistories,
  selectedOrganization,
  selectedChat,
  onOrganizationSelect,
  onChatSelect,
  onNewChat,
}: UnifiedSidebarProps) {
  const [activeTab, setActiveTab] = useState<SidebarTab>('organizations');
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    org.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredChats = chatHistories.filter(chat =>
    chat.organizationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const unreadCount = chatHistories.reduce((acc, chat) => acc + (chat.unreadCount || 0), 0);

  return (
    <div className="w-96 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 flex flex-col shadow-xl shadow-gray-900/5">
      {/* Header */}
      <div className="p-6 border-b border-gray-100/80">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900 tracking-tight">OrgChat</h1>
            <p className="text-xs text-gray-500 font-medium">AI Assistant Network</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex bg-gray-50/80 rounded-2xl p-1.5 shadow-inner">
          <button
            onClick={() => setActiveTab('organizations')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300",
              activeTab === 'organizations'
                ? "bg-white text-gray-900 shadow-sm shadow-gray-900/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
            )}
          >
            <Building2 className="w-4 h-4" />
            Agents
          </button>
          <button
            onClick={() => setActiveTab('chats')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative",
              activeTab === 'chats'
                ? "bg-white text-gray-900 shadow-sm shadow-gray-900/10"
                : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
            )}
          >
            <Clock className="w-4 h-4" />
            Chats
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-gradient-to-r from-orange-500 to-orange-600 border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </button>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="px-6 py-4 border-b border-gray-100/50">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={activeTab === 'organizations' ? "Search agents..." : "Search conversations..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-11 bg-gray-50/80 border-gray-200/60 rounded-2xl text-sm placeholder:text-gray-400 focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-200 transition-all duration-200"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-11 h-11 rounded-2xl text-gray-400 hover:text-gray-600 hover:bg-gray-100/80"
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>

        {activeTab === 'chats' && (
          <Button
            onClick={onNewChat}
            variant="gradient"
            className="w-full h-11 rounded-2xl shadow-lg shadow-orange-500/25 text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start New Conversation
          </Button>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-3">
            {/* Organizations Tab */}
            <div className={cn(
              "transition-all duration-500 ease-out",
              activeTab === 'organizations' 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-4 pointer-events-none absolute"
            )}>
              {activeTab === 'organizations' && (
                <div className="space-y-2">
                  {filteredOrganizations.length === 0 ? (
                    <div className="text-center py-12">
                      <Building2 className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">No agents found</p>
                      <p className="text-xs text-gray-400 mt-1">Try adjusting your search</p>
                    </div>
                  ) : (
                    filteredOrganizations.map((org) => (
                      <OrganizationCard
                        key={org.id}
                        organization={org}
                        onSelect={onOrganizationSelect}
                        isSelected={selectedOrganization?.id === org.id}
                      />
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Chat History Tab */}
            <div className={cn(
              "transition-all duration-500 ease-out",
              activeTab === 'chats' 
                ? "opacity-100 translate-x-0" 
                : "opacity-0 translate-x-4 pointer-events-none absolute"
            )}>
              {activeTab === 'chats' && (
                <div className="space-y-2">
                  {filteredChats.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-500">
                        {chatHistories.length === 0 ? "No conversations yet" : "No chats found"}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {chatHistories.length === 0 
                          ? "Start chatting with an agent to see your history" 
                          : "Try adjusting your search"
                        }
                      </p>
                    </div>
                  ) : (
                    filteredChats.map((chat) => (
                      <ChatHistoryItem
                        key={chat.id}
                        chat={chat}
                        onSelect={onChatSelect}
                        isSelected={selectedChat === chat.id}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Footer Status */}
      <div className="p-4 border-t border-gray-100/50">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-sm shadow-green-400/50"></div>
            <span className="font-medium">All systems operational</span>
          </div>
          <div className="flex items-center gap-1">
            <span>{activeTab === 'organizations' ? filteredOrganizations.length : filteredChats.length}</span>
            <span>items</span>
          </div>
        </div>
      </div>
    </div>
  );
}