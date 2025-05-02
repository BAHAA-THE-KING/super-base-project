import { useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

import { useVoiceInput } from "src/globals/hooks";

export function useVoiceInputHandler(
  initialValue: string,
  onChange: (value: string) => void
) {
  const [voiceInputText] = useVoiceInput();
  const { listening } = useSpeechRecognition();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (listening) {
      setValue(initialValue);
    } else {
      setValue("");
    }
  }, [listening, window.document.activeElement === inputRef.current]);
  useEffect(() => {
    if (
      listening &&
      voiceInputText &&
      window.document.activeElement === inputRef.current
    )
      onChange(value + voiceInputText);
  }, [voiceInputText, window.document.activeElement === inputRef.current]);
  return { inputRef };
}
