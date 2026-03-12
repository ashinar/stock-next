//http://localhost:3000/api/scan-cup
//https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=AAPL&apikey=8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo

const TICKERS = ["MRNA"];
const API_KEY = process.env.FMP_API_KEY || "8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo";

export async function GET() {
  const results = await Promise.all(
    TICKERS.map(async (ticker) => {
      const res = await fetch(
        `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${ticker}&apikey=${API_KEY}`,
      );

      const data = await res.json();
      const isCup = detectCup(data);

      return {
        symbol: ticker,
        isCup,
      };
    }),
  );

  return Response.json(results);
}

function detectCup(candles: any[]) {
  if (!candles || candles.length < 180) {
    return false;
  }

  candles = candles.slice(0, 400);

  let bPrice = 0;
  let minPrice = 0;
  let maxPrice = 0;
  let count = 0;

  for (let i = candles.length - 1; i >= 0; i--) {
    let candle = candles[i];

    if (candle.high > maxPrice) {
      maxPrice = candle.high;
      count = 0;
    } else {
      count++;
      if (!minPrice || minPrice > candle.low) {
        minPrice = candle.low;
        bPrice = 0;
      } else if (candle.high > bPrice) {
        //180 candles
        if (bPrice && count > 180 && candle.high > bPrice) {
          return true;
        }
        bPrice = candle.high;
      }
    }
  }

  return false;
}
