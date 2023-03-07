import { Controller, Post, Body } from '@nestjs/common';
import { UrlDto } from './dtos/url.dto';
import { UrlShortenerService } from './url-shortener.service';

@Controller()
export class UrlShortenerController {
    constructor(private service: UrlShortenerService) {}
    @Post('shorten')
    shortenUrl(@Body() url: UrlDto) {
        return this.service.shortenUrl(url);
    }
}
