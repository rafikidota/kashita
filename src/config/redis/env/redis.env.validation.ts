import * as joi from 'joi';

export const RedisConfigValidationSchema = joi.object({
  REDIS_URL: joi.string().required(),
  CACHEABLE_MEMORY_TTL: joi.number().default(60000),
  CACHEABLE_MEMORY_LRU_SIZE: joi.number().default(5000),
});
