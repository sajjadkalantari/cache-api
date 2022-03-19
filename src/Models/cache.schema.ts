import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as moment from 'moment';
import * as config from 'config';
export type CacheDocument = Cache & Document;

@Schema()
export class Cache {

    @Prop({ required: true, index: true, unique: true })
    key: string;

    @Prop({ required: true })
    value: string;

    @Prop()
    ttl: Date;

    static Create(key: string, value: string): Cache {
        let model: Cache = {
            key: key,
            value: value,
            ttl: moment().add(config.get('ttlTimeInMinutes'), 'm').toDate()
        };

        return model;
    }

    static GetTTL(): Date {
        return moment().add(config.get('ttlTimeInMinutes'), 'm').toDate();
    }
}

export const CacheSchema = SchemaFactory.createForClass(Cache);