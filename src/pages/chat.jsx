import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
     TYPEWRITER EFFECT
  ========================= */
  const typeMessage = async (fullText) => {
    let currentText = "";

    // إنشاء رسالة AI فارغة
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "",
      },
    ]);

    for (let i = 0; i < fullText.length; i++) {
      currentText += fullText[i];

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "ai",
          text: currentText,
        };

        return updated;
      });

      // سرعة الكتابة
      await new Promise((resolve) =>
        setTimeout(resolve, 8)
      );
    }
  };

  /* =========================
     SEND MESSAGE
  ========================= */
  const sendMessage = async (text) => {
    setLoading(true);

    try {
      const res = await fetch(
        "https://grad90-unilms-ai-engine.hf.space/api/chat",
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

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      /*
        عدل حسب شكل الريسبونس عندك
      */
      const aiText =
        data.reply ||
        data.response ||
        data.message ||
        "لا يوجد رد";

      await typeMessage(aiText);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "حدث خطأ في الاتصال بالسيرفر",
        },
      ]);
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

  /* =========================
     EDIT MESSAGE
  ========================= */
  const handleEdit = (i) => {
    setEditingIndex(i);
    setEditValue(messages[i].text);
  };

  return (
    <div
      className="
        h-screen pt-16 md:px-16 flex flex-col
        bg-background text-foreground min-h-screen
      "
    >
      <MessageList
        messages={messages}
        loading={loading}
        onEdit={handleEdit}
        renderMarkdown={(text) => (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mb-4">
                  {children}
                </h1>
              ),

              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mb-3">
                  {children}
                </h2>
              ),

              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-2">
                  {children}
                </h3>
              ),

              p: ({ children }) => (
                <p className="leading-8 mb-3">
                  {children}
                </p>
              ),

              ul: ({ children }) => (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  {children}
                </ul>
              ),

              ol: ({ children }) => (
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  {children}
                </ol>
              ),

              li: ({ children }) => (
                <li className="leading-7">
                  {children}
                </li>
              ),

              code: ({ inline, children }) =>
                inline ? (
                  <code className="bg-muted px-1 py-0.5 rounded text-sm">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-black text-white p-4 rounded-xl overflow-x-auto mb-4">
                    <code>{children}</code>
                  </pre>
                ),

              table: ({ children }) => (
                <div className="overflow-x-auto my-6 rounded-2xl border border-border">
                  <table className="w-full border-collapse text-sm">
                    {children}
                  </table>
                </div>
              ),

              thead: ({ children }) => (
                <thead className="bg-muted/70">
                  {children}
                </thead>
              ),

              tbody: ({ children }) => (
                <tbody className="divide-y divide-border">
                  {children}
                </tbody>
              ),

              tr: ({ children }) => (
                <tr className="hover:bg-muted/40 transition-colors">
                  {children}
                </tr>
              ),

              th: ({ children }) => (
                <th
                  className="
                    px-4 py-3 text-start font-bold
                    whitespace-nowrap border-b border-border
                  "
                >
                  {children}
                </th>
              ),

              td: ({ children }) => (
                <td
                  className="
                    px-4 py-3 align-top
                    text-muted-foreground
                  "
                >
                  {children}
                </td>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-primary pl-4 italic my-4">
                  {children}
                </blockquote>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}
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