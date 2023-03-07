import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from './url.entity';

@Injectable()
export class UrlShortenerService {
    constructor(
        @InjectRepository(Url)
        private urls: Repository<Url>,
    ) {}
}
