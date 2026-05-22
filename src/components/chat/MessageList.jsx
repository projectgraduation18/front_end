// import { useRef, useEffect } from "react";
// import MessageBubble from "./MessageBubble";
// import TypingIndicator from "./TypingIndicator";

// export default function MessageList({ messages, loading, onEdit }) {
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, loading]);

//   return (
//     <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
//       {messages.map((msg, i) => (
//         <MessageBubble key={i} msg={msg} index={i} onEdit={onEdit} />
//       ))}

//       {loading && <TypingIndicator />}

//       <div ref={messagesEndRef} />
//     </div>
//   );
// }

import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

export default function MessageList({
  messages,
  loading,
  onEdit,
}) {
  return (
    <div
      className="
        flex-1      
         px-4 pt-6
         space-y-4
         pb-20
      "
    >
      {messages && messages.map((msg, i) => (
        <MessageBubble
          key={i}
          msg={msg}
          index={i}
          onEdit={onEdit}
        />
      ))}

      {loading && <TypingIndicator />}
    </div>
  );
}