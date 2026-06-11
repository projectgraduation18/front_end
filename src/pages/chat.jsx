import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

export default function ChatPage() {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chat_messages");
    if (saved) return JSON.parse(saved);
    return [{ role: "ai", isWelcome: true, text: t("chat.welcome") }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  

  useEffect(() => {
    sessionStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    setMessages(prev =>
      prev.map(m => m.isWelcome ? { ...m, text: t("chat.welcome") } : m)
    );
  }, [i18n.language, t]);

  const fetchWithTimeout = async (url, options, timeout = 30000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return res;
    } catch (e) {
      clearTimeout(id);
      throw e;
    }
  };

  const retryFetch = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fetchWithTimeout(url, options);
      } catch (e) {
        if (i === retries - 1) throw e;
        await new Promise(r => setTimeout(r, 2000));
      }
    }
  };

  const typeMessage = async (fullText) => {
    let current = "";
    setMessages(prev => [...prev, { role: "ai", text: "" }]);
    for (let i = 0; i < fullText.length; i++) {
      current += fullText[i];
      setMessages(prev => {
        const arr = [...prev];
        arr[arr.length - 1] = { role: "ai", text: current };
        return arr;
      });
      await new Promise(r => setTimeout(r, 8));
    }
  };

  const sendMessage = async (text, currentMessages) => {
    setLoading(true);
    try {
      const history = currentMessages
        .filter(x => !x.isWelcome)
        .map(x => ({
          role: x.role === "ai" ? "assistant" : "user",
          content: x.text
        }));

      const res = await retryFetch(
        "https://grad90-unilms-ai-engine.hf.space/api/chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            course_id: "regulations",
            history
          })
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();

      const aiText =
        data.reply ||
        data.response ||
        data.message ||
        data.answer ||
        "لا يوجد رد";

      await typeMessage(aiText);

    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (!navigator.onLine)
        errorMessage = "❌ لا يوجد اتصال بالإنترنت";
      else if (err.name === "AbortError")
        errorMessage = "⏳ السيرفر مزدحم حالياً";
      else if (err.message.includes("500"))
        errorMessage = "⚠️ خطأ داخلي في السيرفر";
      else if (
        err.message.includes("502") ||
        err.message.includes("503")
      )
        errorMessage = "🚦الخدمة تحت ضغط كبير";
      else if (err.message.includes("504"))
        errorMessage = "⌛ انتهت مهلة الانتظار";

      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          text: errorMessage
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (loading) return;

    const text = editingIndex !== null ? editValue : input;
    if (!text.trim()) return;

    const updated = [...messages, { role: "user", text }];

    setMessages(updated);
    setInput("");
    setEditValue("");
    setEditingIndex(null);

    await sendMessage(text, updated);
  };

  const handleEdit = (i) => {
    setEditingIndex(i);
    setEditValue(messages[i].text);
  };

  return (
    <div className="h-screen pt-16 md:px-16 flex flex-col bg-background text-foreground">
      <MessageList
        messages={messages}
        loading={loading}
        onEdit={handleEdit}
      />

      <ChatInput
        input={input}
        setInput={setInput}
        editingIndex={editingIndex}
        editValue={editValue}
        setEditValue={setEditValue}
        loading={loading}
        onSend={handleSend}
      />
    </div>
  );
}
