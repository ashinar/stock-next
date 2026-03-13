//http://localhost:3000/api/scan-cup
//https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=AAPL&apikey=8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo

import redis from "@/lib/redis/redis";

const TICKERS = ["MRNA", "KTOS"];
const API_KEY = process.env.FMP_API_KEY || "8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo";

export async function GET() {
  let error = "";
  TICKERS.map(async (ticker) => {});

  const results = await Promise.all(
    TICKERS.map(async (ticker) => {
      if (error) {
        return;
      }

      let data = [];
      const redisKey = `stocks_historical:${ticker}`;
      let cached = await redis.get(redisKey);

      if (cached) {
        console.log(`${ticker} loaded from redis`);
        data = JSON.parse(cached);
      } else {
        const res = await fetch(
          `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=${ticker}&apikey=${API_KEY}`,
        );

        data = await res.json();
        if (data && data.ok) {
          if (data["Error Message"]) {
            console.log("Error Message", data["Error Message"]);
            error = data["Error Message"];
            return;
          } else {
            await redis.set(redisKey, JSON.stringify(data), "EX", 60 * 60 * 6); //saved on redis for 6 hours
          }
        }
      }

      const isCup = detectCup(data);

      return {
        symbol: ticker,
        isCup,
      };
    }),
  );

  if (error) {
    return Response.json({ error });
  }

  return Response.json(results);
}

function detectCup(candles: any[]) {
  if (!candles || candles.length < 180) {
    return false;
  }

  let bPrice = 0;
  let minPrice = 0;
  let maxPrice = 0;
  let count = 0;

  for (let i = candles.length - 1; i >= 0; i--) {
    let candle = candles[i];

    if (candle.high > maxPrice) {
      bPrice = 0;
      count = 0;
      minPrice = 0;
      maxPrice = candle.high;
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
