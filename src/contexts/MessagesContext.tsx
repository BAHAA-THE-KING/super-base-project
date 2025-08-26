import {
  createContext,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Snackbar } from "@mui/material";

import { BSnackbarContent } from "src/components/Base";

type ErrorContext = {
  route: string;
  request_body: any;
  response: {
    code: number;
    errors: string[];
  };
};

export const MessagesContext = createContext<{
  addError: (message: string, context: ErrorContext) => void;
  addErrors: (errors: { message: string; context: ErrorContext }[]) => void;
  addSuccess: (message: string) => void;
  clearErrors: () => void;
  clearSuccesses: () => void;
  clearAll: () => void;
}>({
  addError: () => {},
  addErrors: () => {},
  addSuccess: () => {},
  clearErrors: () => {},
  clearSuccesses: () => {},
  clearAll: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const timers = useRef<{ [key: number]: number }>({});

  const [messages, setMessages] = useReducer(
    (
      state: {
        type: "error" | "success";
        message: string;
        open: boolean;
        context?: ErrorContext;
      }[],
      action: {
        type: "ADD" | "EXPLAIN" | "HIDE";
        message:
          | number
          | {
              type: "error" | "success";
              message: string;
              open: boolean;
              context?: ErrorContext;
            }[];
      }
    ) => {
      switch (action.type) {
        case "ADD":
          if (typeof action.message === "number") break;
          const startI = state.length;
          for (let i = startI; i < action.message.length; i++) {
            timers.current[i] = setTimeout(() => {
              setMessages({ type: "HIDE", message: i });
            }, 5000);
          }
          return [...state, ...action.message];
        case "EXPLAIN":
          if (typeof action.message !== "number") break;
          clearTimeout(timers.current[action.message]);
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

  const addError = (message: string, context: ErrorContext) =>
    setMessages({
      type: "ADD",
      message: [{ type: "error", message, open: true, context }],
    });

  const addErrors = (errors: { message: string; context: ErrorContext }[]) =>
    setMessages({
      type: "ADD",
      message: errors.map(({ message, context }) => ({
        type: "error" as const,
        message,
        open: true,
        context,
      })),
    });

  const addSuccess = (message: string) =>
    setMessages({
      type: "ADD",
      message: [{ type: "success", message, open: true }],
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
        addErrors,
        addSuccess,
        clearErrors,
        clearSuccesses,
        clearAll,
      }}
    >
      {children}
      {messages.map((m, i) => (
        <Snackbar
          key={m.message + "," + i}
          open={m.open}
          onClose={() =>
            setMessages({
              type: "HIDE",
              message: i,
            })
          }
        >
          {BSnackbarContent({ color: m.type, message: m.message })}
        </Snackbar>
      ))}
    </MessagesContext.Provider>
  );
}
