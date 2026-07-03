"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Send, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function LiveChatBot() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")
  const [isChatClosed, setIsChatClosed] = useState(false)

  // Live Chat Closed Mode Configuration
  const liveChatConfig = {
    enabled: true,
    status: "Closed",
    schedule: {
      open_days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      closed_days: ["Saturday", "Sunday"],
    },
    after_hours: {
      enabled: true,
      hide_chat_history: true,
      hide_agent_messages: true,
      hide_queue: true,
      hide_input_history: true,
    },
    auto_reply: {
      enabled: true,
      trigger_every_user_message: true,
      response: `Thank you for contacting ExoClick Live Support.

Our Live Chat is currently closed.

Live Support is available from **Monday to Friday** during business hours.

We are currently unavailable because it is outside our support schedule.

Your next opportunity to chat with a live agent will be on **Monday**.

Please send your question when Live Chat reopens, and our support team will be happy to help you.

Thank you for your patience and understanding.`,
    },
    behavior: {
      reply_to_every_message: true,
      always_send_same_reply: true,
      disable_live_agent_connection: true,
      disable_queue: true,
      keep_chat_window_open: true,
    },
  }

  // Check if chat is currently closed
  useEffect(() => {
    const now = new Date()
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" })
    const isClosed =
      liveChatConfig.after_hours.enabled &&
      liveChatConfig.schedule.closed_days.includes(dayName)
    setIsChatClosed(isClosed)

    // Initialize messages based on status
    if (isClosed && liveChatConfig.behavior.do_not_show_previous_chat_messages) {
      setMessages([])
    }
  }, [])

  // Queue configuration
  const queueConfig = {
    status: "Closed",
    usersAhead: 0,
    message: "Live Chat is currently closed. We're available Monday-Friday during business hours.",
  }

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { text: input, sender: "user" }])
    setInput("")

    // Auto-reply based on configuration
    if (liveChatConfig.auto_reply.enabled && liveChatConfig.auto_reply.trigger_every_user_message) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: liveChatConfig.auto_reply.response,
            sender: "bot",
          },
        ])
      }, 1000)
    } else if (!liveChatConfig.auto_reply.enabled && !isChatClosed) {
      // Normal response when chat is open and auto-reply is disabled
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
  }

  return (
    <>
      {/* Compact Chat Widget - Pinned at bottom-right, always visible */}
      <Card className="fixed bottom-6 right-6 w-72 flex flex-col shadow-lg border rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {/* Header */}
        <div className={`p-3 border-b flex items-center justify-between ${
          isChatClosed
            ? "bg-amber-50 dark:bg-amber-900/20"
            : "bg-slate-50 dark:bg-slate-800"
        }`}>
          <div className="flex items-center gap-2">
            <MessageCircle className={`h-4 w-4 ${isChatClosed ? "text-amber-600" : "text-blue-600"}`} />
            <h3 className="font-semibold text-sm">{isChatClosed ? "Support (Closed)" : "Live Support"}</h3>
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

        {/* Closed Status Alert - Always visible when closed */}
        {isChatClosed && !liveChatConfig.after_hours.hide_queue && (
          <div className="px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border-b text-xs">
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium mb-1">
              <AlertCircle className="h-3 w-3" />
              Status: {queueConfig.status}
            </div>
            <p className="text-slate-600 dark:text-slate-300">{queueConfig.message}</p>
          </div>
        )}

        {/* Messages - Collapsible */}
        {!isMinimized && (
          <>
            {/* Show messages only if not in closed mode with hidden chat history */}
            {!(isChatClosed && liveChatConfig.after_hours.hide_chat_history) && (
              <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-48">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[75%] rounded-lg px-3 py-2 text-xs ${
                        msg.sender === "user"
                          ? "bg-blue-600 text-white"
                          : isChatClosed && liveChatConfig.after_hours.hide_agent_messages
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-900 dark:text-amber-200"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input - Always shown when chat is open to keep window open per config */}
            {liveChatConfig.behavior.keep_chat_window_open && (
              <div className="p-2 border-t bg-slate-50 dark:bg-slate-800 flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={isChatClosed ? "Leave a message..." : "Type message..."}
                  className="flex-1 h-8 text-xs"
                  disabled={isChatClosed && liveChatConfig.behavior.disable_live_agent_connection}
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="h-8 w-8 p-0"
                  disabled={isChatClosed && liveChatConfig.behavior.disable_live_agent_connection}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            )}
          </>
        )}
      </Card>
    </>
  )
}
