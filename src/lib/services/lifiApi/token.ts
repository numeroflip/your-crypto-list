import { IToken, Token } from "./model";
import { appFetch } from "@/lib/utils/appFetch";

const URL = "https://li.quest/v1/token";

type Options = {
  /**
   * Id or key of the chain that contains the token
   */
  chain: string;
  /**
   * Address or symbol of the token on the requested chain
   */
  token: string;
};

export async function fetchToken(
  { chain, token }: Options,
  fetchOptions: RequestInit = {}
): Promise<IToken> {
  try {
    const response = await appFetch(
      `${URL}?chain=${chain}&token=${token}`,
      fetchOptions
    );

    const tokenResponse = Token.parse(response);
    return tokenResponse;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
