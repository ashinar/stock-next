// services/redisService.ts

import redis from "@/lib/redis/redis";

export class RedisService {
  static async saveArray(key: string, data: string[]) {
    await redis.set(key, JSON.stringify(data));
  }

  static async getArray(key: string): Promise<string[]> {
    const value = await redis.get(key);

    if (!value) return [];

    return JSON.parse(value);
  }
}
