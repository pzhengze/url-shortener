import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shortUrl: string;

    @Column()
    url: string;
}
