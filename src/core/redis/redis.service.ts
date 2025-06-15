import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private manager: Cache) {}

  async get<T>(key: string): Promise<T | undefined> {
    return await this.manager.get<T>(key);
  }

  async set<T>(key: string, value: T, ttl: number): Promise<T> {
    return await this.manager.set(key, value, ttl);
  }

  async del(key: string): Promise<boolean> {
    return await this.manager.del(key);
  }

  async clear(): Promise<boolean> {
    return await this.manager.clear();
  }
}
