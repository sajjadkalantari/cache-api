import { Controller, Get, Post } from '@nestjs/common';
import { CacheService } from '../Services/cache.service';

@Controller("cache")
export class CacheController {
  constructor(private readonly appService: CacheService) { }

  @Get()
  get(): string {
    return "";
    // return this.appService.getHello();
  }

  @Post()
  async create(): Promise<string> {
    return 'This action adds a new cat';
  }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
}
