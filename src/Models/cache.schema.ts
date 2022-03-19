import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CacheDocument = Cache & Document;

@Schema()
export class Cache {

    @Prop({ required: true })
    key: string;

    @Prop({ required: true })
    value: string;

    @Prop()
    ttl: Date;
}

export const CacheSchema = SchemaFactory.createForClass(Cache);