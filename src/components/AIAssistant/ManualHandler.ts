import { useState } from "react";
import {
  useOnRcbEvent,
  RcbEvent,
  type RcbUserSubmitTextEvent,
  useMessages,
  useChatWindow,
  useTextArea,
} from "react-chatbotify";
import { stringToStream } from "src/utils";

import { useAIAssistant } from "src/views/APIs/useAIAssistant";

export default function ManualHandler() {
  const { chatAPI } = useAIAssistant();
  const [history, setHistory] = useState<
    {
      answer: string;
      question: string;
    }[]
  >([]);

  const { injectMessage, streamMessage, endStreamMessage } = useMessages();
  const { toggleIsBotTyping } = useChatWindow();
  const { setTextAreaValue } = useTextArea();

  // Listen for user submit
  useOnRcbEvent(
    RcbEvent.USER_SUBMIT_TEXT,
    async (event: RcbUserSubmitTextEvent) => {
      //stop ChatBotify from doing its usual flow-based reply
      event.preventDefault();

      const userText = event.data.inputText?.trim() ?? "";

      if (!userText) return;

      // clear the input you just submitted
      await setTextAreaValue("");

      // echo the user bubble if you want explicit control
      await injectMessage(userText, "user");

      // show "bot typing…"
      await toggleIsBotTyping(true);

      try {
        const { response } = await chatAPI({
          data: {
            question: userText,
            history: history
              .map((e) => [
                {
                  role: "user" as const,
                  content: e.question,
                },
                {
                  role: "model" as const,
                  content: e.answer,
                },
              ])
              .flat(),
          },
        });
        setHistory((history) => [
          ...history,
          {
            question: userText,
            answer: response,
          },
        ]);

        // Begin a stream message (creates a bot bubble you can append to)
        const reader = stringToStream(response).getReader();
        const decoder = new TextDecoder();

        while (reader) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          // append chunk into the active stream bubble
          await streamMessage(chunk);
        }

        // finalize the streamed bubble
        await endStreamMessage();
      } catch (err) {
        await injectMessage("Oops, something went sideways. Try again? 🙈");
      } finally {
        // stop typing indicator
        await toggleIsBotTyping(false);
      }
    }
  );

  // This component renders nothing; it just wires events.
  return null;
}
