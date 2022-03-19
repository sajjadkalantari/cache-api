import { Module } from '@nestjs/common';
import { CacheController } from './Controllers/cache.controller';
import { CacheService } from './Services/cache.service';

@Module({
  imports: [],
  controllers: [CacheController],
  providers: [CacheService],
})
export class AppModule {}
