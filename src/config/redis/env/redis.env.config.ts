import * as dotenv from 'dotenv';

dotenv.config();
export const RedisEnvConfig = () => ({
  REDIS_URL: process.env.REDIS_URL,
  CACHEABLE_MEMORY_TTL: Number(process.env.CACHEABLE_MEMORY_TTL),
  CACHEABLE_MEMORY_LRU_SIZE: Number(process.env.CACHEABLE_MEMORY_TTL),
});
