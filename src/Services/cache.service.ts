import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cache, CacheDocument } from "src/Models/cache.schema";

@Injectable()
export class CacheService {

    constructor(@InjectModel(Cache.name) private cacheModel: Model<CacheDocument>) { }

    async create(cache: Cache): Promise<Cache> {

        const newCache = new this.cacheModel(cache);
        return newCache.save();
    }

    async readAllKeys(): Promise<Cache[]> {
        return await this.cacheModel.find().select('key').exec();
    }

    async findByKey(key): Promise<Cache> {
        return await this.cacheModel.findOneAndUpdate({ key }, { ttl: Cache.GetTTL() }).exec();
    }

    async update(cache: Cache): Promise<Cache> {
        return await this.cacheModel.findOneAndUpdate(cache, { new: true })
    }

    async delete(key): Promise<any> {
        return await this.cacheModel.deleteOne({ key });
    }

    async deleteAll(): Promise<any> {
        return await this.cacheModel.deleteMany();
    }
}