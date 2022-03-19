import { CacheModel, CacheModelDTO } from "src/Models/CacheModel";

export interface ICacheRepository {
    getCache: (key: string) => Promise<CacheModel>;
    getAllCache: () => Promise<CacheModel[]>;
    createCache: (data: CacheModelDTO) => Promise<CacheModel>;
    deleteCache: (id: string | number) => Promise<string | number>;
    updateCache: (id: string | number) => Promise<CacheModel>;
}