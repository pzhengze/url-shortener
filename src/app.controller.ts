import { Controller, Post, Body, Get, Res, Param } from '@nestjs/common';
import { UrlDto } from './dtos/url.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('shorten')
    shortenUrl(@Body() url: UrlDto) {
        return this.appService.shortenUrl(url);
    }
    @Get(':shorturl')
    async redirect(@Res() res, @Param('shorturl') shortenUrl: string) {
        const urlObj = await this.appService.redirect(shortenUrl);
        return res.redirect(urlObj.url);
    }
}
