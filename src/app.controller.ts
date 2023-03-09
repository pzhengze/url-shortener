import { Controller, Post, Body } from '@nestjs/common';
import { UrlDto } from './url/dtos/url.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('shorten')
    shortenUrl(@Body() url: UrlDto) {
        return this.appService.shortenUrl(url);
    }
}
