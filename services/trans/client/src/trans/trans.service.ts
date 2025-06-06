import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { RpcException } from "@nestjs/microservices";
import { status } from '@grpc/grpc-js';

import { Trans, TransCU } from "gen/ts/trans";
import { TransEntity } from "./trans.entity";

@Injectable()
export default class TransService {
    constructor(
        @InjectRepository(TransEntity) protected readonly transRepo: Repository<TransEntity>,
    ) { }

    async createTrans(data: TransCU): Promise<Trans> {
        return this.transRepo.save(data);
    }

    async getTrans(id: Trans['id']): Promise<Trans> {
        const trans = await this.transRepo.findOneBy({ id });

        if (!trans) throw new RpcException({ code: status.NOT_FOUND, message: 'Trans not found' });

        return trans;
    }

    async getTransList(ids: Trans['id'][]): Promise<Trans[]> {
        return this.transRepo.findBy({ id: In(ids) });
    }
}
