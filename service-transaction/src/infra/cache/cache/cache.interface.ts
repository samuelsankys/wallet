export abstract class ICache {
  abstract set(key: string, value: any, ttl?: number): Promise<void>;
  abstract get<T>(key: string): Promise<T | null>;
}
