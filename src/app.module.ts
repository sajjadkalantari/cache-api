import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheController } from './Controllers/cache.controller';
import { CacheService } from './Services/cache.service';
import { config } from 'config'

@Module({
  imports: [MongooseModule.forRoot(config.get('db'))],
  controllers: [CacheController],
  providers: [CacheService],
})
export class AppModule { }
