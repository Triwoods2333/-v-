import { getOpenAIClient } from "@/service/openai";
import { Npm } from "@/types/npm";
import { ImageGenerateParams } from "openai/resources/images.mjs";
export async function POST(req: Request) {
  const { description } = await req.json();

  console.log("description", description);

  const client = getOpenAIClient();

  const img_size = "1792x1024";
  const llm_name = "dall-e-3";
  const llm_params: ImageGenerateParams = {
    prompt: `check the npm named:${description}`,
    model: llm_name,
    n: 1,
    quality: "hd",
    response_format: "url",
    size: img_size,
    style: "natural",
  };
  const result = await client.images.generate(llm_params);
  console.log("check npm result:", result);
  const raw_img_url = result.data[0].url; // openai dall-e img url
  if (!raw_img_url) {
    return Response.json({
      code: -1,
      message: "check npm failed",
    });
  }
  return Response.json({
    code: 0,
    message: "ok",
    data: {
      img_description: description,
      img_url: result.data[0].url,
    },
  });
}
