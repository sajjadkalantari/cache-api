import { ICacheRepository } from "../Interfaces/ICacheRepository";
import { CacheModel, CacheModelDTO } from "src/Models/CacheModel";
import { CacheSchema } from "./Schemas/CacheSchema";


export class MongooseCacheRepository implements ICacheRepository {
    async createCache(data: CacheModelDTO): Promise<CacheModel> {
        return await CacheSchema.create(data);
    }
    getCache: (key: string) => Promise<CacheModel>;
    getAllCache: () => Promise<CacheModel[]>;
    deleteCache: (id: string | number) => Promise<string | number>;
    updateCache: (id: string | number) => Promise<CacheModel>;


}