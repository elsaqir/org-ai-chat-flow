import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UnifiedSidebar } from "@/components/UnifiedSidebar";
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
    <div className="h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Unified Sidebar */}
      <UnifiedSidebar
        organizations={organizations}
        chatHistories={chatHistories}
        selectedOrganization={selectedOrganization}
        selectedChat={selectedChat}
        onOrganizationSelect={handleOrganizationSelect}
        onChatSelect={handleChatSelect}
        onNewChat={startNewChat}
      />

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
          <div className="flex-1 flex items-center justify-center">
            <Card className="p-12 max-w-lg text-center bg-white/80 backdrop-blur-xl border-gray-200/50 shadow-2xl shadow-gray-900/10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-orange-500/30">
                <MessageSquare className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                Welcome to OrgChat
              </h3>
              
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Connect with verified organizations for instant support, information, and services. 
                Choose an agent or start a new conversation to begin.
              </p>
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={startNewChat}
                  variant="gradient"
                  className="h-12 px-8 text-base font-medium rounded-2xl shadow-lg shadow-orange-500/25"
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Start Your First Conversation
                </Button>
                <p className="text-sm text-gray-400 mt-2">
                  Available 24/7 • Secure • Instant responses
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
