import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Loader2, Minimize2 } from "lucide-react";
import { Button, Input } from "@/components/ui/design-system";
import { useChatbotQuery } from "@workspace/api-client-react";

type Message = {
  id: string;
  role: 'user' | 'bot';
  content: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'bot', content: "Hi! I'm Sinde's AI assistant. Ask me anything about his projects, skills, or experience!" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mutation = useChatbotQuery({
    mutation: {
      onSuccess: (data) => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: data.reply }]);
      },
      onError: () => {
        setMessages(prev => [...prev, { id: Date.now().toString(), role: 'bot', content: "Sorry, my neural link is disrupted right now. Please try again later." }]);
      }
    }
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || mutation.isPending) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    
    mutation.mutate({ data: { message: userMsg } });
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.6)]"
          >
            <Bot className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[380px] h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden border-primary/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="bg-primary/10 p-4 border-b border-primary/20 flex items-center justify-between backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Bot className="text-primary w-5 h-5" />
                <span className="font-display font-bold tracking-wider text-sm">AI ASSISTANT</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] rounded-2xl p-3 text-sm font-body",
                    msg.role === 'user' 
                      ? "ml-auto bg-primary text-primary-foreground rounded-tr-sm" 
                      : "mr-auto bg-white/10 text-white rounded-tl-sm border border-white/5"
                  )}
                >
                  {msg.content}
                </motion.div>
              ))}
              {mutation.isPending && (
                <div className="mr-auto max-w-[85%] bg-white/5 rounded-2xl rounded-tl-sm p-4 border border-white/5">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-card/80 border-t border-white/10 flex gap-2">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="h-10 rounded-full bg-white/5 border-white/10 px-4 text-sm"
              />
              <Button 
                type="submit" 
                variant="primary" 
                className="h-10 w-10 p-0 rounded-full shrink-0"
                disabled={mutation.isPending || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
