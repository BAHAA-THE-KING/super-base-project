import ChatBot from "react-chatbotify";
import { useBaseTranslation } from "src/hooks";
import ManualHandler from "./ManualHandler";

const i18ns = ["aon_the_ai_assistant"];
export function AIAssistant() {
  const [AONTheAIAssistantText] = useBaseTranslation(i18ns);

  return (
    <>
      <ChatBot
        flow={{
          start: {
            message: "Hey! Ask me anything ✨",
            path: "start",
          },
        }}
        settings={{
          event: {
            rcbUserSubmitText: true,
          },

          chatButton: {
            icon: "/aon.png",
          },
          header: {
            title: AONTheAIAssistantText,
            avatar: "/aon.png",
          },
          chatHistory: { disabled: true },
          notification: { disabled: true },
          tooltip: { mode: "DISABLED" },
          emoji: { disabled: true },
        }}
      />
      <ManualHandler />
    </>
  );
}
