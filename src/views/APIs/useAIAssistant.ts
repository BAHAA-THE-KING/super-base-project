import { usePostAPI } from "src/APIs";

type FormFillerResponse = {
  [key: string]: {
    value: string;
    confidence: number;
  };
};
type FormFillerRequest = {
  files: File[];
  fields: {
    name: string;
    description?: string;
  }[];
};

export function useAIAssistant() {
  const formFillerAPI = usePostAPI<FormFillerResponse, FormFillerRequest>(
    "/aoun/form-filler"
  ).mutateAsync;

  return { formFillerAPI };
}
