import OpenAI from "openai";
import { HttpsProxyAgent } from "https-proxy-agent";

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  const baseURL = process.env.OPENAI_BASE_URL;

  const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
  });

  return openai;
}
