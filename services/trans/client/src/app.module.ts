import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import TransModule from './trans/trans.module';
import ConfigModule from './config/config.module';
import ConfigService from './config/config.service';

@Module({
    imports: [
        TransModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => configService.getDBConnectionData(),
        }),
    ],
})
export class AppModule { }
