import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheController } from './Controllers/cache.controller';
import { CacheService } from './Services/cache.service';
import * as config from 'config';
import { Cache, CacheSchema } from './Models/cache.schema';

@Module({
  imports: [
    MongooseModule.forRoot(config.get("db")),
    MongooseModule.forFeature([{ name: Cache.name, schema: CacheSchema }])
  ],
  controllers: [CacheController],
  providers: [CacheService],
})
export class AppModule { }
