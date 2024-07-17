import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageCacheService {
  private cache: Map<string, string> = new Map();

  constructor() { }
  cacheImage(url: string, imagePath: string) {
    this.cache.set(url, imagePath);
  }

  getImageFromCache(url: string): string | undefined {
    return this.cache.get(url);
  }

  clearCache() {
    this.cache.clear();
  }
}
