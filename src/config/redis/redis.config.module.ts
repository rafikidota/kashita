import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { RedisEnv } from '../../common/constants/redis.env';
import { RedisEnvConfig } from './env/redis.env.config';
import { RedisConfigValidationSchema } from './env/redis.env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [RedisEnvConfig],
      validationSchema: RedisConfigValidationSchema,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (service: ConfigService) => {
        const redisUrl = service.get<string>(RedisEnv.REDIS_URL);
        const ttl: number = service.get<number>(RedisEnv.TTL);
        const lruSize: number = service.get<number>(RedisEnv.LRU_SIZE);
        const store = new CacheableMemory({ ttl, lruSize });
        const keyv = new Keyv({ store });
        const keyvRedis = createKeyv(redisUrl);
        return { stores: [keyv, keyvRedis] };
      },
    }),
  ],
})
export class RedisCacheConfigModule {}
