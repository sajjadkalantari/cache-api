import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Cache } from "src/Models/cache.schema";
import { CacheService } from "src/Services/cache.service";
import { Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';


@Controller('cache')
export class CacheController {
  private readonly logger = new Logger(CacheController.name);


  constructor(private readonly cacheService: CacheService) { }

  @Post()
  async createCache(@Res() response, @Body() cache: Cache) {
    const newCache = await this.cacheService.create(cache);
    return response.status(HttpStatus.CREATED).json({
      newCache
    })
  }

  @Get('/keys')
  async fetchAllKeys(@Res() response) {
    const chahcesKeys = await this.cacheService.readAllKeys();
    return response.status(HttpStatus.OK).json({
      chahcesKeys
    })
  }

  @Get('/:key')
  async findByKey(@Res() response, @Param('key') key) {

    let cache = await this.cacheService.findByKey(key);

    if (cache) {
      this.logger.log("Cache Missed");
      cache = await this.cacheService.create(Cache.Create(key, uuidv4()));
    } else
      this.logger.log("Cache Hits");


    return response.status(HttpStatus.OK).json({ cache });

  }

  @Put()
  async update(@Res() response, @Param('id') id, @Body() cache: Cache) {
    const updatedCache = await this.cacheService.update(cache);
    return response.status(HttpStatus.OK).json({
      updatedCache
    })
  }

  @Delete('/:id')
  async delete(@Res() response, @Param('id') id) {
    const deletedCache = await this.cacheService.delete(id);
    return response.status(HttpStatus.OK).json({
      deletedCache
    })
  }
}