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

  // update welcome message only when language changes
  useEffect(() => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.isWelcome
          ? {
              ...msg,
              text: t("chat.welcome"),
            }
          : msg
      )
    );
  }, [i18n.language, t]);

  const sendMessage = async (text) => {
    setLoading(true);

    // add empty ai message
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "",
      },
    ]);

    try {
      const res = await fetch(
        "https://ziad9022-fci-ai-assistant.hf.space/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
          }),
        }
      );

      const data = await res.json();

      const fullText =
        data?.response || t("chat.noReply");

      let i = 0;

      const interval = setInterval(() => {
        const chunk = fullText.slice(i, i + 4);

        i += 4;

        setMessages((prev) => {
          const updated = [...prev];

          const lastIndex = updated.length - 1;

          updated[lastIndex] = {
            role: "ai",
            text:
              (updated[lastIndex]?.text || "") +
              chunk,
          };

          return updated;
        });

        if (i >= fullText.length) {
          clearInterval(interval);
        }
      }, 15);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: t("chat.connectionError"),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

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

    // add user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text,
      },
    ]);

    await sendMessage(text);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);

    setEditValue(messages[index].text);
  };

  return (
    <div
      className="
        h-screen  
        pt-16 md:px-16
        flex flex-col
        bg-background text-foreground
        transition-colors
      "
    >
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