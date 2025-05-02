import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import {
  FaMicrophone as FaMicrophoneIcon,
  FaMicrophoneSlash as FaMicrophoneSlashIcon,
} from "react-icons/fa";
import { IoMdClose as IoMdCloseIcon } from "react-icons/io";

import { BaseIconButton } from "./Base";

import { BTooltip } from "src/components/Base";

import { useBaseTranslation } from "src/hooks";
import { usePreferredLanguage, useVoiceInput } from "src/globals/hooks";
import { SvgIcon } from "@mui/material";

const i18ns = ["voice_input", "voice_input_not_available"];
const VoiceToggle: React.FC = () => {
  const [VoiceInputText, VoiceInputNotAvailableText] =
    useBaseTranslation(i18ns);

  const [, setVoiceInputText] = useVoiceInput();
  const [language] = usePreferredLanguage();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setVoiceInputText(transcript);
  }, [transcript]);

  useEffect(() => {
    function keyup(ev: KeyboardEvent) {
      if (ev.ctrlKey && ev.code === "KeyI") {
        if (listening) {
          SpeechRecognition.stopListening();
          resetTranscript();
        } else {
          SpeechRecognition.startListening({ language, continuous: true });
        }
      }
    }
    window.addEventListener("keyup", keyup);
    return () => window.removeEventListener("keyup", keyup);
  }, [listening]);

  return (
    <BTooltip
      title={
        !browserSupportsSpeechRecognition
          ? VoiceInputNotAvailableText
          : VoiceInputText + " ctrl+i"
      }
    >
      <BaseIconButton
        onClick={() => {
          if (listening) {
            SpeechRecognition.stopListening();
            resetTranscript();
          } else {
            SpeechRecognition.startListening({ language, continuous: true });
          }
        }}
      >
        <SvgIcon>
          {!browserSupportsSpeechRecognition ? (
            <>
              <FaMicrophoneIcon color="grey" />
              <IoMdCloseIcon color="red" />
            </>
          ) : listening ? (
            <FaMicrophoneIcon />
          ) : (
            <FaMicrophoneSlashIcon />
          )}
        </SvgIcon>
      </BaseIconButton>
    </BTooltip>
  );
};

export default VoiceToggle;
