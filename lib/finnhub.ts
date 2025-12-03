export type StockData = {
  CurrentPrice: number;
  Change: number;
  Percent: number;
  Low: number;
  OpenPrice: number;
  PreviousClose: number;
  Symbol: string;
  Img: string;
  TimeToBuy: boolean;
};

export async function getStock(symbol: string, img: string) {
  const apiKey = "d431ai1r01qvk0j9nnigd431ai1r01qvk0j9nnj0";

  const res = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  const stock: StockData = {
    CurrentPrice: data.c,
    Change: data.d,
    Percent: data.dp,
    Low: data.l,
    OpenPrice: data.o,
    PreviousClose: data.pc,
    Symbol: symbol,
    Img: img,
    TimeToBuy: false,
  };

  return stock;
}
