
// Fallback to your local server if the environment variable is not defined
export const Link_Prefix =
  // process.env.NEXT_PUBLIC_CDN_URL || "https://khagarpurwebassets.khagarpur.workers.dev";
  process.env.NEXT_PUBLIC_CDN_URL || "http://100.127.178.13";

export const BusinessesJson = `${Link_Prefix}/businesses/data/businesses.json`;
export const CommunitiesJson = `${Link_Prefix}/organizations/data/organizations.json`;