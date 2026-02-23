"use client";

import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { User, Smartphone, Upload } from "lucide-react";

const mockConversations = [
  { id: 1, name: "Parent Dupont", lastMessage: "Merci pour les résultats", time: "10:30", unread: 2, avatar: "" },
  { id: 2, name: "Parent Martin", lastMessage: "À quelle heure les enfants sortent?", time: "09:15", unread: 0, avatar: "" },
  { id: 3, name: "Parent Durand", lastMessage: "Je confirme la présence pour la réunion", time: "Hier", unread: 1, avatar: "" },
];

const mockMessages = [
  { id: 1, sender: "Admin", text: "Bonjour, comment allez-vous?", time: "10:00", own: true },
  { id: 2, sender: "Parent Dupont", text: "Très bien! Merci pour votre message", time: "10:15", own: false },
  { id: 3, sender: "Admin", text: "Vos enfants vont très bien à l'école", time: "10:20", own: true },
  { id: 4, sender: "Parent Dupont", text: "C'est excellent! Merci pour votre travail", time: "10:30", own: false },
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold neon">Messages</h1>
        <p className="muted">Communiquez avec les parents via WhatsApp</p>
      </div>

      {/* Messages Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Conversations List */}
        <Card className="lg:col-span-1 p-0 flex flex-col">
          <div className="p-4 border-b border-dark-700">
            <input
              type="text"
              placeholder="Chercher une conversation..."
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className={`w-full p-4 border-b border-dark-700 text-left transition-colors ${
                  selectedConversation.id === conv.id
                    ? "bg-primary-600/20 border-primary-600"
                    : "hover:bg-dark-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-8 h-8 text-white bg-dark-700 p-1 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium">{conv.name}</h4>
                    <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
          {/* Chat Header */}
          <div className="pb-4 border-b border-dark-700 mb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                <User className="w-10 h-10 text-white bg-dark-700 p-1 rounded-full" />
                <div>
                  <h3 className="text-white font-bold">{selectedConversation.name}</h3>
                  <p className="text-gray-400 text-sm">En ligne</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                <Smartphone className="w-4 h-4 inline mr-2" />WhatsApp
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.own ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.own
                      ? "bg-primary-600 text-white rounded-br-none"
                      : "bg-dark-700 text-gray-100 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Écrivez votre message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 bg-dark-700 border border-dark-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none"
            />
            <Button
              variant="primary"
              onClick={handleSendMessage}
            >
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
