import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url-shortener/url.entity';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'Urls',
            entities: [Url],
            synchronize: true,
        }),
        UrlShortenerModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
