"use client"

import { useState } from "react"
import { MessageCircle, X, Send, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LiveChatBot() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ])
  const [input, setInput] = useState("")

  // Queue configuration
  const queueConfig = {
    status: "Pending",
    usersAhead: 7,
    message: "7 users are ahead of you. Please wait for your turn.",
  }

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { text: input, sender: "user" }])
    setInput("")

    // Simple bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. Our support team will respond shortly.",
          sender: "bot",
        },
      ])
    }, 1000)
  }

  return (
    <>
      {/* Compact Chat Widget - Pinned at bottom-right, always visible */}
      <Card className="fixed bottom-6 right-6 w-72 flex flex-col shadow-lg border rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Header */}
        <div className="p-3 border-b bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-blue-600" />
            <h3 className="font-semibold text-sm">Live Support</h3>
          </div>
          <Button
            onClick={() => setIsMinimized(!isMinimized)}
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
          >
            {isMinimized ? <MessageCircle className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>

        {/* Queue Status - Always visible */}
        <div className="px-3 py-2 bg-blue-50 dark:bg-slate-800 border-b text-xs">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium mb-1">
            <Clock className="h-3 w-3" />
            Status: {queueConfig.status}
          </div>
          <p className="text-slate-600 dark:text-slate-300">{queueConfig.message}</p>
        </div>

        {/* Messages - Collapsible */}
        {!isMinimized && (
          <>
            <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-48">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-lg px-3 py-2 text-xs ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-2 border-t bg-slate-50 dark:bg-slate-800 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type message..."
                className="flex-1 h-8 text-xs"
              />
              <Button onClick={handleSend} size="sm" className="h-8 w-8 p-0">
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </>
        )}
      </Card>
    </>
  )
}
