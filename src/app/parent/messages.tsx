"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { User, Smartphone, Send, MessageSquare, Search, Archive, Trash2, ArrowLeft } from "lucide-react";

const mockConversations = [
  {
    id: 1,
    sender: "Mr Dubois (Professeur)",
    avatar: "",
    lastMessage: "Bonjour, Thomas a d'excellents résultats en mathématiques!",
    timestamp: "14:30",
    read: true,
    messages: [
      { id: 1, sender: "Mr Dubois", content: "Bonjour, Thomas a d'excellents résultats en mathématiques!", time: "14:30", own: false },
      { id: 2, sender: "Vous", content: "Merci beaucoup pour cette information!", time: "14:35", own: true },
      { id: 3, sender: "Mr Dubois", content: "De rien! Continuez ainsi!", time: "14:40", own: false },
    ]
  },
  {
    id: 2,
    sender: "Mme Leclerc (Français)",
    avatar: "",
    lastMessage: "Prière de rappeler à Thomas de faire son devoir",
    timestamp: "13:45",
    read: false,
    messages: [
      { id: 1, sender: "Mme Leclerc", content: "Prière de rappeler à Thomas de faire son devoir", time: "13:45", own: false },
    ]
  },
  {
    id: 3,
    sender: "Directrice - École",
    avatar: "",
    lastMessage: "Les résultats du trimestre ont été publiés",
    timestamp: "12:20",
    read: true,
    messages: [
      { id: 1, sender: "Directrice", content: "Les résultats du trimestre ont été publiés. Consultez le portail.", time: "12:20", own: false },
      { id: 2, sender: "Vous", content: "Merci, je vais vérifier!", time: "12:25", own: true },
    ]
  },
  {
    id: 4,
    sender: "Admin scolariX",
    avatar: "",
    lastMessage: "Rappel: Réunion parents-profs le 20 février",
    timestamp: "10:15",
    read: true,
    messages: [
      { id: 1, sender: "Admin", content: "Rappel: Réunion parents-profs le 20 février à 17h", time: "10:15", own: false },
    ]
  },
];

export default function ParentMessagesPage() {
  const [selectedChat, setSelectedChat] = useState(mockConversations[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [conversationMessages, setConversationMessages] = useState(selectedChat.messages);
  const [showChatMobile, setShowChatMobile] = useState(false);

  const filteredConversations = conversations.filter((conv) =>
    conv.sender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: conversationMessages.length + 1,
      sender: "Vous",
      content: messageInput,
      time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
      own: true,
    };

    setConversationMessages([...conversationMessages, newMessage]);
    
    // Update conversations list
    setConversations(conversations.map(conv =>
      conv.id === selectedChat.id
        ? { ...conv, lastMessage: messageInput, timestamp: newMessage.time }
        : conv
    ));

    setMessageInput("");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold neon">Messages</h1>
          <p className="muted">Communiquez avec l'école et les professeurs</p>
        </div>
        <a
          href="https://wa.me/243700000000"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="lg">
            <Smartphone className="w-4 h-4 inline mr-2" />WhatsApp
          </Button>
        </a>
      </div>

      {/* Messages Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[60vh]">
        {/* Contacts List */}
          <Card className={`${showChatMobile ? "hidden" : "block"} md:block lg:col-span-1 p-0 flex flex-col`}>
          <div className="p-4 border-b border-dark-700">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Chercher un contact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => {
                  setSelectedChat(conv);
                  setConversationMessages(conv.messages);
                  setShowChatMobile(true);
                }}
                className={`w-full p-4 border-b border-dark-700 text-left transition-colors ${
                  selectedChat.id === conv.id
                    ? "bg-primary-600/20 border-primary-600"
                    : "hover:bg-dark-700"
                }`}
              >
                <div className="flex items-start gap-3">
                  <User className="w-10 h-10 text-white bg-dark-700 p-2 rounded-full flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm">{conv.sender}</p>
                    <p className="text-gray-400 text-xs truncate">{conv.lastMessage}</p>
                    <p className="text-gray-500 text-xs mt-1">{conv.timestamp}</p>
                  </div>
                  {!conv.read && <div className="w-2 h-2 bg-red-600 rounded-full flex-shrink-0 mt-1"></div>}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className={`${showChatMobile ? "block" : "hidden"} md:block lg:col-span-2 p-6 flex flex-col`}>
          {/* Chat Header */}
          <div className="pb-4 border-b border-dark-700 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" className="md:hidden mr-2" onClick={() => setShowChatMobile(false)}>
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <User className="w-10 h-10 text-white bg-dark-700 p-2 rounded-full" />
                <div>
                  <h3 className="text-white font-bold">{selectedChat.sender}</h3>
                  <p className="text-gray-400 text-sm">Actif maintenant</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 pb-4">
            {conversationMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.own ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] sm:max-w-xs md:max-w-md px-4 py-2 rounded-lg text-sm ${
                    msg.own
                      ? "bg-primary-600 text-white rounded-br-none"
                      : "bg-dark-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-dark-700">
            <input
              type="text"
              placeholder="Écrivez votre message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm"
            />
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Communication Rapide" icon={<Smartphone className="w-5 h-5" />} />
          <CardBody>
            <p className="text-gray-300 text-sm mb-4">
              Utilisez WhatsApp pour une communication plus rapide et instantanée avec l'école.
            </p>
            <a
              href="https://wa.me/243700000000?text=Bonjour,%20j'ai%20une%20question"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" size="md" className="w-full">
                <Smartphone className="w-4 h-4 inline mr-2" />Ouvrir WhatsApp
              </Button>
            </a>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Heures de Disponibilité" icon={<MessageSquare className="w-5 h-5" />} />
          <CardBody>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300"><span className="text-white font-medium">Lun-Ven:</span> 8h - 17h</p>
              <p className="text-gray-300"><span className="text-white font-medium">Sam:</span> 9h - 12h</p>
              <p className="text-gray-300"><span className="text-white font-medium">Dim:</span> Fermé</p>
              <p className="text-yellow-400 text-xs mt-3">Support d'urgence 24/7 via WhatsApp</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
