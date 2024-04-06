import { config } from './config';
export default class Cache {
  constructor(capacity = 1000000) {
    this.capacity = capacity;
    this.cache = [];
    this.map = new Map();
  }

  get(key) {
    if (!config.enableCache) return false;
    if (this.map.has(key)) {
      return this.map.get(key);
    }
    return null;
  }

  put(key, value) {
    if (!config.enableCache) return false;
    if (this.cache.length >= this.capacity) {
      const oldestKey = this.cache.shift();  
      this.map.delete(oldestKey);  
    }

    if (!this.map.has(key)) {
      this.cache.push(key); 
    }
    this.map.set(key, value);  
  }

  has(key) {
    if (!config.enableCache) return false;
    return this.map.has(key);
  }
}