import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheController } from './Controllers/cache.controller';
import { CacheService } from './Services/cache.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/demo')],
  controllers: [CacheController],
  providers: [CacheService],
})
export class AppModule {}
