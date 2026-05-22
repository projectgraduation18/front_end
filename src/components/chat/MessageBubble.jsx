import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy, Pencil, Check } from "lucide-react";
import { useState } from "react";

import "katex/dist/katex.min.css";

const isArabic = (text = "") =>
  /[\u0600-\u06FF]/.test(text);

export default function MessageBubble({
  msg,
  index,
  onEdit,
}) {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    await navigator.clipboard.writeText(msg.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className={`w-full flex mb-5 ${
      msg.role === "user"
        ? "justify-end"
        : "justify-start"
    }`}>
      
      <div className="group flex items-end gap-2 max-w-[90%]">

        <div className={`
          relative rounded-3xl px-5 py-4 border shadow-sm
          ${msg.role === "user"
            ? "bg-primary text-white"
            : "bg-card text-foreground border-border"}
        `}>

          <div
            dir={isArabic(msg.text) ? "rtl" : "ltr"}
            className="prose prose-sm dark:prose-invert max-w-none"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code({ inline, className, children }) {
                  const match =
                    /language-(\w+)/.exec(className || "");

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-muted px-1.5 py-1 rounded">
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 flex flex-col gap-2">
          <button onClick={copyMessage}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>

          {msg.role === "user" && (
            <button onClick={() => onEdit(index)}>
              <Pencil size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}