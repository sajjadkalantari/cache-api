import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CacheDocument = Cache & Document;

@Schema()
export class Cache {

    @Prop()
    key: string;

    @Prop()
    value: string;

    @Prop()
    ttl: Date;
}

export const CacheSchema = SchemaFactory.createForClass(Cache);