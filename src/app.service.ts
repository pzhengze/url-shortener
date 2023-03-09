import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url/url.entity';
import { UrlDto } from './url/dtos/url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class AppService {
    constructor(
        @InjectRepository(Url)
        private urls: Repository<Url>,
    ) {}
    async shortenUrl(inputUrl: UrlDto) {
        const { url } = inputUrl;

        if (!isURL(url)) {
            throw new BadRequestException('Must be a valid URL!');
        }

        const baseUrl = 'http://localhost:3000';

        try {
            let urlObj = await this.urls.findOneBy({ url });

            if (urlObj) {
                return `${baseUrl}/${urlObj.shortUrl}`;
            }

            const shortUrl = nanoid(8);

            urlObj = this.urls.create({
                url,
                shortUrl,
            });

            this.urls.save(urlObj);
            return `${baseUrl}/${urlObj.shortUrl}`;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An error occured in the server. Please try again later.',
            );
        }
    }
}
