import { z } from "zod";
import { ITokenCore, TokenCore } from "./model";
import { appFetch } from "@/lib/utils/appFetch";

const URL = "https://li.quest/v1/tokens";

export async function fetchTokens(
  fetchOptions: RequestInit = {}
): Promise<ITokenCore[]> {
  const response = await appFetch(URL, fetchOptions);

  const validatedResponse = tokenListSchema.parse(response);
  const tokens = Object.values(validatedResponse.tokens).flat();
  return tokens.slice(0, 50);
}

const tokenListSchema = z.object({
  tokens: z.record(z.string(), z.array(TokenCore)),
});
