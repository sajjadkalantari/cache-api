export type CacheModel = {
    id: string | number;
    key: string;
    value: string;
    ttl: Date;
  }
  
export type CacheModelDTO = Omit<CacheModel, 'id'>