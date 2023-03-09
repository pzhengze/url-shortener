import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './url/url.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'Urls',
            entities: [Url],
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Url]),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
