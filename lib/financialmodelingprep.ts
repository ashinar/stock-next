import redis from "@/lib/redis/redis";
const API_KEY = process.env.FMP_API_KEY || "8OjFIRUUXYFUbSLsgI4EKN38d8wNoLWo";

export async function getFinancialModelStock(symbol: string) {
  const redisKey = `stocks:financialModelStock:profile:${symbol}`;
  let cached = await redis.get(redisKey);

  if (cached) {
    console.log(`${symbol} loaded from redis`);
    return JSON.parse(cached);
  }

  const res = await fetch(
    `https://financialmodelingprep.com/stable/profile?symbol=${symbol}&apikey=${API_KEY}`,
  );

  let data = await res.json();
  if (data && data.length) {
    await redis.set(redisKey, JSON.stringify(data[0]), "EX", 60 * 60 * 6); //saved on redis for 6 hours
  }

  return data;
}
