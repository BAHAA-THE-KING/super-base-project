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

type ErrorExplainerResponse = {
  response: string;
};
type ErrorExplainerRequest = {
  question: string;
  context: {
    route: string;
    request_body: any;
    response: {
      code: number;
      errors: string[];
    };
  };
};

export function useAIAssistant() {
  const formFillerAPI = usePostAPI<FormFillerResponse, FormFillerRequest>(
    "/aoun/form-filler"
  ).mutateAsync;

  const thinkAPI = usePostAPI<ErrorExplainerResponse, ErrorExplainerRequest>(
    "/aoun/error-interpreter"
  ).mutateAsync;

  return { formFillerAPI, thinkAPI };
}
