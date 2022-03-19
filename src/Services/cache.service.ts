import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cache, CacheDocument } from "src/Models/cache.schema";
import * as config from "config";
@Injectable()
export class CacheService {

    constructor(@InjectModel(Cache.name) private cacheModel: Model<CacheDocument>) { }

    async create(cache: Cache): Promise<Cache> {
        const cacheSize = await this.cacheModel.count();
        if (cacheSize < config.get("maxCacheLimit")) {
            const newCache = new this.cacheModel(cache);
            return newCache.save();
        } else {
            //sort by ttl and hits time and ovvewrite it
            let oldetsCacheQuery = this.cacheModel.findOne({}).sort({ ttl: 1, hits: 1 });
            oldetsCacheQuery.update(cache);
            return cache;
        }

    }

    async readAllKeys(): Promise<Cache[]> {
        return await this.cacheModel.find().select('key').exec();
    }

    async findByKey(key): Promise<Cache> {
        return await this.cacheModel.findOneAndUpdate({ key }, { ttl: Cache.GetTTL(), $inc: { 'hits': 1 } }).exec();
    }

    async update(cache: Cache): Promise<Cache> {
        return await this.cacheModel.findOneAndUpdate(
            { key: cache.key },
            {
                value: cache.value,
                ttl: Cache.GetTTL(),
                $inc: { 'hits': 1 }
            },
            { new: true })
    }

    async delete(key): Promise<any> {
        return await this.cacheModel.deleteOne({ key });
    }

    async deleteAll(): Promise<any> {
        return await this.cacheModel.deleteMany();
    }
}