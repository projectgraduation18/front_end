 import { useSelector } from "react-redux";
 import ReactMarkdown from "react-markdown";
 import remarkGfm from "remark-gfm";
  import { useIsArabic } from "../../lib/utils";
export default function SummeryPage() {
  const text = useSelector((state) => state.summery.value);
  const isArabic = useIsArabic();
  const rawText =
    typeof text === "string"
      ? text
      : JSON.stringify(text);

  const isError =
    typeof text === "string" &&
    (text.includes("503") || text.includes("UNAVAILABLE"));

  return (
    <div className="container px-12 py-10 pt-20 mx-auto">
      <div className="rounded-lg text-[#333] dark:text-[#f5f5f5] text-right">

        {isError ? (
          <div className="text-red-500">
             
            {isArabic ? "⚠️ السيرفر مشغول دلوقتي، حاول بعد شوية" : "Please try again later."}
          </div>
        ) : (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {rawText || sessionStorage.getItem("currentSummery")}
          </ReactMarkdown>
        )}

      </div>
    </div>
  );
}