import { IoAdapter } from "@nestjs/platform-socket.io";
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from "redis";
import { ServerOptions } from 'socket.io';

import ConfigService from "@core/config/config.service";

const config = new ConfigService();

export class RedisIoAdapter extends IoAdapter {
    private adapterConstructor: ReturnType<typeof createAdapter>;

    async connectToRedis(): Promise<void> {
        const pubClient = createClient(config.getSocketStoreConfig());
        const subClient = pubClient.duplicate();

        await Promise.all([pubClient.connect(), subClient.connect()]);

        this.adapterConstructor = createAdapter(pubClient, subClient);
    }

    createIOServer(port: number, options?: ServerOptions): any {
        const server = super.createIOServer(port, options);

        server.adapter(this.adapterConstructor);

        return server;
    }
}
