import { z } from "zod";

export const Token = z.object({
  chainId: z.number(),
  address: z.string(),
  symbol: z.string(),
  name: z.string(),
  decimals: z.number(),
  priceUSD: z.string(),
  coinKey: z.string().optional(),
  logoURI: z.string().optional(),
});

export const TokenCore = Token.pick({
  chainId: true,
  address: true,
  name: true,
  logoURI: true,
});

export type ITokenCore = z.infer<typeof TokenCore>;
export type IToken = z.infer<typeof Token>;
