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
        return await this.cacheModel.findOne({ key }).exec();
    }

    async update(id, cache: Cache): Promise<Cache> {
        return await this.cacheModel.findByIdAndUpdate(id, cache, { new: true })
    }

    async delete(id): Promise<any> {
        return await this.cacheModel.findByIdAndRemove(id);
    }
}