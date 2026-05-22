// import ReactMarkdown from "react-markdown";
// import { useTranslation } from "react-i18next";

// const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

// export default function MessageBubble({ msg, index, onEdit }) {
//   const { t } = useTranslation();

//   return (
//     <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//       <div className="flex items-end gap-2 max-w-[75%] group">

//         {/* bubble */}
//         <div
//           className={`
//             px-4 py-3 rounded-2xl text-sm leading-relaxed
//             shadow-md break-words border border-border
//             transition
//             ${
//               msg.role === "user"
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-card text-card-foreground"
//             }
//           `}
//         >
//           <div dir={isArabic(msg.text) ? "rtl" : "ltr"}>
//             <ReactMarkdown>{msg.text}</ReactMarkdown>
//           </div>
//         </div>

//         {/* edit button */}
//         {msg.role === "user" && (
//           <button
//             onClick={() => onEdit(index)}
//             className="text-xs px-2 py-1 rounded-md border border-border hover:bg-muted transition"
//           >
//             {t("chat.edit")}
//           </button>
//         )}

//       </div>
//     </div>
//   );
// }









import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { Copy, Pencil } from "lucide-react";
import { useTranslation } from "react-i18next";

import "katex/dist/katex.min.css";

const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

export default function MessageBubble({ msg, index, onEdit }) {
  const { t } = useTranslation();

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(msg.text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`w-full flex mb-4 ${
        msg.role === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          group flex items-end gap-2
          max-w-[90%]
        `}
      >
        {/* message bubble */}
        <div
          className={`
            rounded-2xl px-5 py-4
            shadow-sm border border-border
            overflow-hidden transition-all

            ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-card-foreground"
            }
          `}
        >
          <div
            dir={isArabic(msg.text) ? "rtl" : "ltr"}
            className="
              prose prose-sm max-w-none
              dark:prose-invert

              prose-p:leading-8
              prose-p:my-3

              prose-headings:font-bold
              prose-headings:tracking-tight

              prose-h1:text-3xl
              prose-h1:mb-5

              prose-h2:text-2xl
              prose-h2:mt-8
              prose-h2:mb-4

              prose-h3:text-xl
              prose-h3:mt-6
              prose-h3:mb-3

              prose-ul:my-4
              prose-ol:my-4

              prose-li:my-1

              prose-strong:text-primary

              prose-blockquote:border-s-4
              prose-blockquote:border-primary
              prose-blockquote:ps-4
              prose-blockquote:italic

              prose-table:block
              prose-table:overflow-x-auto

              prose-th:border
              prose-td:border

              prose-th:border-border
              prose-td:border-border

              prose-th:bg-muted

              prose-th:px-4
              prose-th:py-2

              prose-td:px-4
              prose-td:py-2
            "
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                code({
                  inline,
                  className,
                  children,
                  ...props
                }) {
                  const match = /language-(\w+)/.exec(
                    className || ""
                  );

                  return !inline && match ? (
                    <div className="my-4 overflow-hidden rounded-xl">
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: "12px",
                          fontSize: "13px",
                        }}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code
                      className="
                        bg-muted
                        px-1.5 py-1
                        rounded-md
                        text-[13px]
                      "
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },

                table({ children }) {
                  return (
                    <div className="overflow-x-auto my-5">
                      <table className="w-full border-collapse border border-border">
                        {children}
                      </table>
                    </div>
                  );
                },

                th({ children }) {
                  return (
                    <th
                      className="
                        border border-border
                        bg-muted
                        px-4 py-2
                        text-start
                        font-semibold
                      "
                    >
                      {children}
                    </th>
                  );
                },

                td({ children }) {
                  return (
                    <td
                      className="
                        border border-border
                        px-4 py-2
                      "
                    >
                      {children}
                    </td>
                  );
                },

                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        text-blue-500
                        underline
                        hover:opacity-80
                      "
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {msg.text}
            </ReactMarkdown>
          </div>
        </div>

        {/* actions */}
        <div
          className="
            flex flex-col gap-2
            opacity-0 group-hover:opacity-100
            transition
          "
        >
          {/* copy */}
          <button
            onClick={copyMessage}
            className="
              p-2 rounded-lg
              border border-border
              bg-background
              hover:bg-muted
              transition
            "
           >
            <Copy size={15} />
          </button>

          {/* edit */}
          {msg.role === "user" && (
            <button
              onClick={() => onEdit(index)}
              className="
                p-2 rounded-lg
                border border-border
                bg-background
                hover:bg-muted
                transition
              "
            >
              <Pencil size={15} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}