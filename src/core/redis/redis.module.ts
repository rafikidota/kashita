import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { RedisCacheConfigModule } from '../../config/redis/redis.config.module';
import { RedisOptions } from '../../common/types/redis.option';
import { RedisCacheService } from './redis.service';

@Module({})
export class RedisCacheModule {
  static forRoot(options?: RedisOptions): DynamicModule {
    if (!options) {
      return {
        module: RedisCacheModule,
        imports: [RedisCacheConfigModule],
        providers: [RedisCacheService],
        exports: [RedisCacheService],
      };
    }
    return {
      module: RedisCacheModule,
      imports: [
        CacheModule.register({
          useFactory: (options: RedisOptions) => {
            const { url, ttl = 60000, lruSize = 5000 } = options;
            const store = new CacheableMemory({ ttl, lruSize });
            const keyv = new Keyv({ store });
            const keyvRedis = createKeyv(url);
            return { stores: [keyv, keyvRedis] };
          },
        }),
      ],
      providers: [RedisCacheService],
      exports: [RedisCacheService],
    };
  }
}
