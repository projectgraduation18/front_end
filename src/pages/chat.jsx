
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MessageList from "../components/chat/MessageList";
import ChatInput from "../components/chat/ChatInput";

export default function ChatPage() {
  const { t, i18n } = useTranslation();

  const [messages, setMessages] = useState([
    {
      role: "ai",
      isWelcome: true,
      text: t("chat.welcome"),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  /* =========================
     WELCOME UPDATE
  ========================= */
  useEffect(() => {
    setMessages((prev) =>
      prev.map((m) =>
        m.isWelcome
          ? { ...m, text: t("chat.welcome") }
          : m
      )
    );
  }, [i18n.language, t]);

  /* =========================
     SAFE STREAM CLEANER
  ========================= */
  const cleanChunk = (str = "") =>
    str
      .replace(/\|/g, " ")
      .replace(/\[DONE\]/g, "")
      .replace(/\[object Object\]/g, "")
      .replace(/\s+/g, " ");

  /* =========================
     STREAM MESSAGE
  ========================= */
  const sendMessage = async (text) => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://grad90-unilms-ai-engine.hf.space/api/chat/stream",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            course_id: "regulations",
            history: [],
          }),
        }
      );

      if (!res.ok || !res.body)
        throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      let buffer = "";
      let fullText = "";
      let created = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, {
          stream: true,
        });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();

          if (!trimmed.startsWith("data:")) continue;

          const data = trimmed.replace(/^data:\s*/, "");

          if (!data || data === "[DONE]") continue;

          fullText += cleanChunk(data);

          if (!created) {
            created = true;

            setMessages((prev) => [
              ...prev,
              { role: "ai", text: fullText },
            ]);
          } else {
            setMessages((prev) => {
              const updated = [...prev];
              updated[updated.length - 1] = {
                role: "ai",
                text: fullText,
              };
              return updated;
            });
          }
        }
      }
    } catch (err) {
      console.error(err);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "ai",
          text: "حدث خطأ في الاتصال بالسيرفر",
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     SEND
  ========================= */
  const handleSend = async () => {
    if (loading) return;

    const text =
      editingIndex !== null
        ? editValue
        : input;

    if (!text.trim()) return;

    setInput("");
    setEditValue("");
    setEditingIndex(null);

    setMessages((prev) => [
      ...prev,
      { role: "user", text },
    ]);

    await sendMessage(text);
  };

  const handleEdit = (i) => {
    setEditingIndex(i);
    setEditValue(messages[i].text);
  };

  return (
    <div className="
      h-screen pt-16 md:px-16 flex flex-col
      bg-background text-foreground min-h-screen
    ">
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