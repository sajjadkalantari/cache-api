import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { Cache } from "src/Models/cache.schema";
import { CacheService } from "src/Services/cache.service";
import { Logger } from '@nestjs/common';

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

  @Get()
  async fetchAll(@Res() response) {
    const chahces = await this.cacheService.readAll();
    return response.status(HttpStatus.OK).json({
      chahces
    })
  }

  @Get('/:id')
  async findById(@Res() response, @Param('id') id) {
    const cache = await this.cacheService.readById(id);
    return response.status(HttpStatus.OK).json({
      cache
    })
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id, @Body() cache: Cache) {
    const updatedCache = await this.cacheService.update(id, cache);
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