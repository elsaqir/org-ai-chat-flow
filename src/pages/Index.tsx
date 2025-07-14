import { useState, useEffect } from "react";
import { Search, Plus, Filter, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrganizationCard } from "@/components/OrganizationCard";
import { ChatHistoryItem } from "@/components/ChatHistoryItem";
import { ChatWindow } from "@/components/ChatWindow";
import { 
  organizations, 
  chatHistories, 
  getOrganizationById, 
  getChatHistoryById,
  type Organization,
  type Message,
  type ChatHistory 
} from "@/data/mockData";

const Index = () => {
  const [selectedOrganization, setSelectedOrganization] = useState<Organization | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [filteredOrganizations, setFilteredOrganizations] = useState(organizations);
  const [filteredChats, setFilteredChats] = useState(chatHistories);

  // Filter organizations based on search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredOrganizations(organizations);
    } else {
      const filtered = organizations.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrganizations(filtered);
    }
  }, [searchQuery]);

  // Filter chat history based on search
  useEffect(() => {
    if (!chatSearchQuery.trim()) {
      setFilteredChats(chatHistories);
    } else {
      const filtered = chatHistories.filter(chat =>
        chat.organizationName.toLowerCase().includes(chatSearchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(chatSearchQuery.toLowerCase())
      );
      setFilteredChats(filtered);
    }
  }, [chatSearchQuery]);

  const handleOrganizationSelect = (org: Organization) => {
    setSelectedOrganization(org);
    setSelectedChat(null);
    
    // Check if there's existing chat history for this organization
    const existingChat = chatHistories.find(chat => chat.organizationId === org.id);
    if (existingChat) {
      setMessages(existingChat.messages);
    } else {
      setMessages([]);
    }
  };

  const handleChatSelect = (chatId: string) => {
    const chat = getChatHistoryById(chatId);
    if (chat) {
      const org = getOrganizationById(chat.organizationId);
      if (org) {
        setSelectedOrganization(org);
        setSelectedChat(chatId);
        setMessages(chat.messages);
      }
    }
  };

  const handleSendMessage = async (content: string) => {
    if (!selectedOrganization) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Update message status to sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    // Simulate agent typing
    setIsTyping(true);
    
    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      
      const agentMessage: Message = {
        id: `msg-${Date.now()}-agent`,
        content: `Thank you for contacting ${selectedOrganization.name}! I'm here to help you with any questions or assistance you need. How can I help you today?`,
        sender: 'agent',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, agentMessage]);
      
      // Update user message status to read
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === userMessage.id 
              ? { ...msg, status: 'read' }
              : msg
          )
        );
      }, 1000);
    }, Math.random() * 2000 + 1000); // Random delay between 1-3 seconds
  };

  const startNewChat = () => {
    setSelectedOrganization(null);
    setSelectedChat(null);
    setMessages([]);
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Left Sidebar - Organizations */}
      <div className="w-80 bg-white border-r border-border flex flex-col shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold text-gray-900">Organizations</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 rounded-xl border-gray-200"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {filteredOrganizations.map((org) => (
              <OrganizationCard
                key={org.id}
                organization={org}
                onSelect={handleOrganizationSelect}
                isSelected={selectedOrganization?.id === org.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Sidebar - Chat History */}
      <div className="w-80 bg-white border-r border-border flex flex-col shadow-subtle">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Chats</h2>
            <Button
              onClick={startNewChat}
              variant="gradient"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search chats..."
              value={chatSearchQuery}
              onChange={(e) => setChatSearchQuery(e.target.value)}
              className="pl-9 rounded-xl border-gray-200"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {filteredChats.map((chat) => (
              <ChatHistoryItem
                key={chat.id}
                chat={chat}
                onSelect={handleChatSelect}
                isSelected={selectedChat === chat.id}
              />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedOrganization ? (
          <ChatWindow
            organization={selectedOrganization}
            messages={messages}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
            <Card className="p-8 max-w-md text-center shadow-main border-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Welcome to OrgChat
              </h3>
              
              <p className="text-gray-500 mb-6 leading-relaxed">
                Connect with verified organizations for instant support, information, and services. 
                Select an organization from the left panel to start a conversation.
              </p>
              
              <Button
                onClick={startNewChat}
                variant="gradient"
              >
                <Plus className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
