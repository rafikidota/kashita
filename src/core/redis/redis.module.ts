import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { RedisConfigModule } from '../../config/redis/redis.config.module';
import { RedisOptions } from '../../common/types/redis.option';
import { RedisService } from './redis.service';

@Module({})
export class RedisModule {
  static forRoot(options?: RedisOptions): DynamicModule {
    if (!options) {
      return {
        module: RedisModule,
        imports: [RedisConfigModule],
        providers: [RedisService],
        exports: [RedisService],
      };
    }
    return {
      module: RedisModule,
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
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
