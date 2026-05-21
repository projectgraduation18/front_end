import { useTranslation } from "react-i18next";

export default function ChatInput({
  input,
  setInput,
  editingIndex,
  editValue,
  setEditValue,
  loading,
  onSend,
}) {
  const { t } = useTranslation();

  const isEditing = editingIndex !== null;

  return (
    <div className="border-t border-border bg-background p-3 fixed bottom-0 left-0 w-full">
      <div className="flex gap-2 max-w-4xl mx-auto">

        <input
          className="flex-1 p-3 rounded-xl bg-input text-foreground border border-border outline-none focus:ring-2 focus:ring-ring"
          type="text"
          placeholder={isEditing ? t("chat.placeholderEdit") : t("chat.placeholder")}
          value={isEditing ? editValue : input}
          onChange={(e) =>
            isEditing ? setEditValue(e.target.value) : setInput(e.target.value)
          }
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />

        <button
          onClick={onSend}
          disabled={loading}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {isEditing ? t("chat.resend") : t("chat.send")}
        </button>

      </div>
    </div>
  );
}
