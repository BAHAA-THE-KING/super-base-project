import React, {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Slide, Snackbar, SvgIcon } from "@mui/material";

import { Close as CloseIcon } from "@mui/icons-material";
import { FaRobot as FaRobotIcon } from "react-icons/fa";

import { BButton, BSnackbarContent, BTypography } from "src/components/Base";

import { useAIAssistant } from "src/views/APIs/useAIAssistant";
import { useLocation } from "react-router";

type ErrorContext = {
  route: string;
  request_body: any;
  response: {
    code: number;
    errors: string[];
  };
};

export const MessagesContext = createContext<{
  addError: (error: { messages: string[]; context: ErrorContext }) => void;
  addSuccess: (message: string) => void;
  clearErrors: () => void;
  clearSuccesses: () => void;
  clearAll: () => void;
  aiInfo: string;
}>({
  addError: () => {},
  addSuccess: () => {},
  clearErrors: () => {},
  clearSuccesses: () => {},
  clearAll: () => {},
  aiInfo: "",
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const timers = useRef<{ [key: number]: number }>({});

  const { thinkAPI } = useAIAssistant();
  const [aiInfo, setAIInfo] = useState("");

  const { pathname } = useLocation();
  useEffect(() => {
    setAIInfo("");
  }, [pathname]);

  const reducer = useCallback(
    (
      state: {
        type: "error" | "success" | "info";
        message: React.ReactNode;
        open: boolean;
        context?: ErrorContext;
      }[],
      action: {
        type: "ADD" | "EXPLAIN" | "HIDE";
        message:
          | number
          | {
              type: "error" | "success" | "info";
              message: React.ReactNode;
              open: boolean;
              context?: ErrorContext;
            };
      }
    ) => {
      switch (action.type) {
        case "ADD":
          if (typeof action.message === "number") break;
          const i = state.length;
          timers.current[i] = setTimeout(
            () => setMessages({ type: "HIDE", message: i }),
            5000
          );
          return [...state, action.message];

        case "EXPLAIN":
          if (typeof action.message !== "number") break;
          clearTimeout(timers.current[action.message]);

          const context = state[action.message].context;
          if (context) {
            thinkAPI({
              data: {
                question: "help",
                context,
              },
            }).then((res) => setAIInfo(res.response));
          }
          return [...state];

        case "HIDE":
          return state.map((e, i) => ({
            ...e,
            open: action.message === i ? false : e.open,
          }));

        default:
          throw new Error("Unknown action type");
      }
      console.log("state", [...state], action);
      console.log("action", action);

      throw new Error("Error in Messages Context Happened");
    },
    []
  );
  const [messages, setMessages] = useReducer(reducer, []);

  const addError = (error: { messages: string[]; context: ErrorContext }) =>
    setMessages({
      type: "ADD",
      message: {
        type: "error",
        message: error.messages.reduce(
          (p, e) => (
            <>
              {p}
              <BTypography>{e}</BTypography>
            </>
          ),
          <></>
        ),
        open: true,
        context: error.context,
      },
    });

  const addSuccess = (message: string) =>
    setMessages({
      type: "ADD",
      message: { type: "success", message, open: true },
    });

  const clearErrors = () => {
    // setMessages();
  };

  const clearSuccesses = () => {
    // setMessages((msgs) => msgs.filter((msg) => msg.type !== "success"));
  };

  const clearAll = () => {
    // setMessages([]);
  };

  return (
    <MessagesContext.Provider
      value={{
        addError,
        addSuccess,
        clearErrors,
        clearSuccesses,
        clearAll,
        aiInfo,
      }}
    >
      {children}
      {messages.map((m, i) => {
        const closeMe = () =>
          setMessages({
            type: "HIDE",
            message: i,
          });
        const thinkMe = () => {
          setMessages({
            type: "EXPLAIN",
            message: i,
          });
        };

        return (
          <Snackbar
            key={m.message + "," + i}
            open={m.open}
            onClose={(_, reason) => reason === "clickaway" || closeMe()}
            TransitionComponent={Slide}
            TransitionProps={{ direction: "left" }}
          >
            {BSnackbarContent({
              color: m.type,
              message: m.message,
              action: (
                <>
                  <BButton
                    icon={
                      <SvgIcon>
                        <FaRobotIcon />
                      </SvgIcon>
                    }
                    onClick={thinkMe}
                    color="secondary"
                  />
                  <BButton icon={<CloseIcon />} onClick={closeMe} />
                </>
              ),
            })}
          </Snackbar>
        );
      })}
    </MessagesContext.Provider>
  );
}
