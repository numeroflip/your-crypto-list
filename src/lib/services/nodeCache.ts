import NodeCache from "node-cache";

const TIME_TO_LIVE_SECONDS = 60 * 5;

export const appCache = new NodeCache({
  stdTTL: TIME_TO_LIVE_SECONDS,
  checkperiod: 120,
});
