export function jsonToFormdata(
  json: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
): FormData {
  for (const [key, value] of Object.entries(json)) {
    if (value === null || value === undefined) continue;

    const formKey = parentKey
      ? `${parentKey}[${key}]`
      : key;

    if (typeof value === "string" || value instanceof File) {
      formData.append(formKey, value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      formData.append(formKey, value.toString());
    } else if (Array.isArray(value) || typeof value === "object") {
      jsonToFormdata(value, formData, formKey);
    }
  }

  return formData;
}
