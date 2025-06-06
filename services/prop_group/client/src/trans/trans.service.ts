import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientGrpc } from "@nestjs/microservices";
import { Observable } from "rxjs";

import {
    Trans,
    TRANS_SERVICE_NAME,
    TransCU,
    TransList,
    TransListSearchParams,
    TransSearchParams,
    TransServiceClient,
} from "gen/ts/trans";

@Injectable()
export default class TransService implements OnModuleInit {
    private transService: TransServiceClient;

    constructor(@Inject('TRANS_PACKAGE') private client: ClientGrpc) { }

    onModuleInit() {
        this.transService = this.client.getService<TransServiceClient>(TRANS_SERVICE_NAME);
    }

    getTrans(data: TransSearchParams): Observable<Trans> {
        return this.transService.getTrans(data);
    }

    getTransList(data: TransListSearchParams): Observable<TransList> {
        return this.transService.getTransList(data);
    }

    createTrans(data: TransCU): Observable<Trans> {
        return this.transService.createTrans(data);
    }
}
