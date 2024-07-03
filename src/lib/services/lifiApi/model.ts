import { z } from "zod";

/**
 * How many rows are in a desktop viewport on the token list overview
 */
const DESKTOP_COLUMN_COUNT = 4;
const DESKTOP_ROW_COUNT = 8;

export const TOKEN_ITEMS_PER_PAGE = DESKTOP_COLUMN_COUNT * DESKTOP_ROW_COUNT;

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

export const Chain = z.object({
  key: z.string(),
  chainType: z.string(),
  name: z.string(),
  coin: z.string(),
  id: z.number(),
  mainnet: z.boolean(),
  logoURI: z.string(),
  tokenlistUrl: z.string().optional(),
  faucetUrls: z.array(z.string()).optional(),
  multicallAddress: z.string(),
  metamask: z.object({
    chainId: z.string(),
    blockExplorerUrls: z.array(z.string()),
    chainName: z.string(),
    nativeCurrency: z.object({
      name: z.string(),
      symbol: z.string(),
      decimals: z.number(),
    }),
    rpcUrls: z.array(z.string()),
  }),
  nativeToken: z.object({
    address: z.string(),
    chainId: z.number(),
    symbol: z.string(),
    decimals: z.number(),
    name: z.string(),
    coinKey: z.string(),
    logoURI: z.string(),
    priceUSD: z.string(),
  }),
});

export type IChain = z.infer<typeof Chain>;
