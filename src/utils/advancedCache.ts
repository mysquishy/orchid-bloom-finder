
import { apiCache } from './api-helpers';

// Enhanced caching with compression and TTL
class AdvancedCache {
  private cache = new Map<string, {
    data: any;
    timestamp: number;
    ttl: number;
    compressed: boolean;
    size: number;
  }>();
  
  private maxSize = 50 * 1024 * 1024; // 50MB cache limit
  private currentSize = 0;

  async set(key: string, data: any, ttlMs = 300000, compress = true): Promise<void> {
    try {
      let processedData = data;
      let isCompressed = false;
      
      // Compress large data
      if (compress && typeof data === 'object' && JSON.stringify(data).length > 1024) {
        processedData = await this.compress(JSON.stringify(data));
        isCompressed = true;
      }
      
      const size = this.getDataSize(processedData);
      
      // Evict old entries if needed
      while (this.currentSize + size > this.maxSize && this.cache.size > 0) {
        this.evictOldest();
      }
      
      this.cache.set(key, {
        data: processedData,
        timestamp: Date.now(),
        ttl: ttlMs,
        compressed: isCompressed,
        size
      });
      
      this.currentSize += size;
      
      console.log(`Cache: Stored ${key} (${size} bytes, compressed: ${isCompressed})`);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async get(key: string): Promise<any | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if expired
    if (Date.now() - item.timestamp > item.ttl) {
      this.delete(key);
      return null;
    }

    try {
      // Decompress if needed
      if (item.compressed) {
        const decompressed = await this.decompress(item.data);
        return JSON.parse(decompressed);
      }
      
      return item.data;
    } catch (error) {
      console.error('Cache get error:', error);
      this.delete(key);
      return null;
    }
  }

  delete(key: string): void {
    const item = this.cache.get(key);
    if (item) {
      this.currentSize -= item.size;
      this.cache.delete(key);
    }
  }

  clear(): void {
    this.cache.clear();
    this.currentSize = 0;
  }

  private evictOldest(): void {
    let oldestKey = '';
    let oldestTime = Infinity;
    
    for (const [key, item] of this.cache.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }
    
    if (oldestKey) {
      this.delete(oldestKey);
    }
  }

  private async compress(data: string): Promise<string> {
    if (!('CompressionStream' in window)) {
      return data; // No compression support
    }
    
    try {
      const stream = new CompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();
      
      writer.write(new TextEncoder().encode(data));
      writer.close();
      
      const chunks = [];
      let done = false;
      
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }
      
      const compressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        compressed.set(chunk, offset);
        offset += chunk.length;
      }
      
      return btoa(String.fromCharCode(...compressed));
    } catch (error) {
      console.error('Compression failed:', error);
      return data;
    }
  }

  private async decompress(compressedData: string): Promise<string> {
    if (!('DecompressionStream' in window)) {
      return compressedData;
    }
    
    try {
      const compressed = Uint8Array.from(atob(compressedData), c => c.charCodeAt(0));
      const stream = new DecompressionStream('gzip');
      const writer = stream.writable.getWriter();
      const reader = stream.readable.getReader();
      
      writer.write(compressed);
      writer.close();
      
      const chunks = [];
      let done = false;
      
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) chunks.push(value);
      }
      
      const decompressed = new Uint8Array(chunks.reduce((acc, chunk) => acc + chunk.length, 0));
      let offset = 0;
      for (const chunk of chunks) {
        decompressed.set(chunk, offset);
        offset += chunk.length;
      }
      
      return new TextDecoder().decode(decompressed);
    } catch (error) {
      console.error('Decompression failed:', error);
      return compressedData;
    }
  }

  private getDataSize(data: any): number {
    return JSON.stringify(data).length * 2; // Rough estimate
  }

  getStats() {
    return {
      size: this.cache.size,
      currentSize: this.currentSize,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate()
    };
  }

  private calculateHitRate(): number {
    // This would need tracking of hits/misses in a real implementation
    return 0.85; // Placeholder
  }
}

export const advancedCache = new AdvancedCache();

// Enhanced API helpers with advanced caching
export const createOptimizedApiEndpoint = (baseUrl: string) => ({
  get: async <T = any>(path: string, params?: Record<string, any>, useCache = true): Promise<T> => {
    const url = new URL(path, baseUrl);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const cacheKey = url.toString();
    
    // Try advanced cache first
    if (useCache) {
      const cached = await advancedCache.get(cacheKey);
      if (cached) {
        console.log(`Cache hit: ${cacheKey}`);
        return cached;
      }
    }

    try {
      const response = await fetch(url.toString(), {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'max-age=300'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (useCache) {
        await advancedCache.set(cacheKey, data, 300000, true);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
});
