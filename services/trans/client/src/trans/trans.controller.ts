import {
    Trans,
    TransCU,
    TransList,
    TransListSearchParams,
    TransSearchParams,
    TransServiceController,
    TransServiceControllerMethods,
} from "gen/ts/trans";
import TransService from "./trans.service";

@TransServiceControllerMethods()
export default class TransController implements TransServiceController {
    constructor(
        private readonly transService: TransService,
    ) { }

    getTrans({ id }: TransSearchParams): Promise<Trans> {
        return this.transService.getTrans(id);
    }

    async getTransList({ ids }: TransListSearchParams): Promise<TransList> {
        const res = await this.transService.getTransList(ids);

        return { items: res };
    }

    createTrans(data: TransCU): Promise<Trans> {
        return this.transService.createTrans(data);
    }

    deleteTrans(request: TransSearchParams): void {
        throw new Error("Method not implemented.");
    }
}
