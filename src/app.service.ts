import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './entities/url.entity';
import { UrlDto } from './dtos/url.dto';
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

        const baseUrl = process.env.baseUrl;

        try {
            let urlObj = await this.urls.findOneBy({ url });

            if (urlObj) {
                return `${baseUrl}/${urlObj.shortUrl}`;
            }

            const shortUrl = nanoid(8);

            urlObj = this.urls.create({ url, shortUrl });

            this.urls.save(urlObj);
            return `${baseUrl}/${urlObj.shortUrl}`;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(
                'An error occured in the server. Please try again later.',
            );
        }
    }
    async redirect(shortUrl: string) {
        try {
            const urlObj = await this.urls.findOneBy({ shortUrl });

            if (urlObj) {
                return urlObj;
            } else {
                throw new NotFoundException('Resource Not Found');
            }
        } catch (error) {
            console.log(error);
            throw new NotFoundException('Resource Not Found');
        }
    }
}
