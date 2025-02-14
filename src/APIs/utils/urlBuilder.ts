// Helper function to handle path variables in URLs
export const buildUrl = (
  url: string,
  params: { [key: string]: string | number } = {}
) => {
  // Find all path variables in the URL
  const matches = url.match(/:[a-zA-Z0-9_]+/g) || [];

  for (const match of matches) {
    const key = match.substring(1); // Remove the ':' prefix

    if (!(key in params)) {
      throw new Error(`Missing required path variable: ${key}`);
    }

    // Replace path variable with actual value
    url = url.replace(match, String(params[key]));

    // Remove the used parameter after replacing
    delete params[key];
  }

  return url;
};
