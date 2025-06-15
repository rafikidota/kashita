# Kashita

Sometimes, the best way to solve your own problems is to help someone else.

**Kashita** is a plug-and-play Redis integration library for [NestJS](https://nestjs.com/). It provides a clean, typed, and environment-ready setup to add Redis support in any NestJS app.

## 🔧 Features

- 📦 Easy integration
- 🧪 Typed Redis options
- 🔐 Environment variable validation
- 🧱 Modular structure and extendable design
- 💾 Simple wrapper over `@nestjs/cache-manager` for `Redis`


## 🚀 Getting Started

```ts
import { RedisCacheModule } from '@rafikidota/kashita'

@Module({
  imports: [RedisCacheModule.forRoot()],
})
export class AppModule {}
```

## 🧰 Using the RedisCacheService
You can inject RedisCacheService into any provider or service:

```ts
import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '@rafikidota/kashita';

@Injectable()
export class CacheManagerService {
  constructor(private readonly service: RedisCacheService) {}

  async get<T>(key: string): Promise<T | undefined> {
    return this.service.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl: number): Promise<T> {
    return this.service.set(key, value, ttl);
  }

  async del(key: string): Promise<boolean> {
    return this.service.del(key);
  }

  async clear(): Promise<boolean> {
    return this.service.clear();
  }
}
```


## ⚙️Environment Variables
You can configure Redis via `.env`:

```env
REDIS_URL=REDIS_URL=redis://localhost:6379
CACHEABLE_MEMORY_TTL=60000,
CACHEABLE_MEMORY_LRU_SIZE=5000
```

## 📖Additional Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Nestjs Iroh example on GitHub](https://github.com/rafikidota/nestjs-iroh/)