const priceFormatter = new Intl.NumberFormat("us-US", {
  style: "currency",
  currency: "USD",
  maximumSignificantDigits: 6,
});

export const formatPrice = (price: number) => priceFormatter.format(price);
