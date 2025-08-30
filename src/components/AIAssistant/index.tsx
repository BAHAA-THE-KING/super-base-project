import ChatBot from "react-chatbotify";

import ManualHandler from "./ManualHandler";
import { useBaseTranslation } from "src/hooks";
import { useTheme } from "@mui/material";

const i18ns = [
  "aon_the_ai_assistant",
  "initial_question",
  "write_your_question_here",
];
export function AIAssistant() {
  const [
    AONTheAIAssistantText,
    InitialQuestionText,
    WriteYourQuestionHereText,
  ] = useBaseTranslation(i18ns);

  const {
    palette: {
      primary: { main: primaryColor },
      secondary: { main: secondaryColor },
    },
  } = useTheme();

  return (
    <>
      <ChatBot
        flow={{
          start: { message: InitialQuestionText, path: "start" },
        }}
        settings={{
          event: { rcbUserSubmitText: true },
          chatButton: { icon: "/aon.png" },
          header: {
            title: AONTheAIAssistantText,
            avatar: "/aon.png",
          },
          chatHistory: { disabled: true },
          notification: { disabled: true },
          tooltip: { mode: "DISABLED" },
          emoji: { disabled: true },
          chatInput: { enabledPlaceholderText: WriteYourQuestionHereText },
          fileAttachment: { disabled: true },
          general: {
            primaryColor,
            secondaryColor,
          },
        }}
      />
      <ManualHandler />
    </>
  );
}
