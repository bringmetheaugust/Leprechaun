import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, DeleteResult, Repository } from 'typeorm';

import { ProductPreviewPublicI } from '../product/product.interface';
import { ProductPreviewPublic } from '../product/product.dto';
import ConfigService from '@core/config/config.service';
import { ProductI } from '@core/product/product.interface';
import { QueriesCommonI } from '@core/queries/queries.interface';
import { SessionI } from '@core/session/session.interface';
import ProductHistoryEntity from '@core/productHistory/productHistory.entity';
import { ProductHistoryI } from '@core/productHistory/productHistory.interface';

@Injectable()
export default class HistoryProductService {
    private readonly historyLength: number;

    constructor(
        @InjectRepository(ProductHistoryEntity) public readonly historyRepo: Repository<ProductHistoryEntity>,
        private readonly configService: ConfigService,
    ) {
        this.historyLength = Number(this.configService.getVal('USER_HISTORY_LENGTH'));
    }

    public async addHistoryProductItem(productId: ProductI['id'], sid: SessionI['sid']): Promise<void> {
        await this.historyRepo.upsert(
            { product: productId, sid } as DeepPartial<ProductHistoryI>,
            {
                conflictPaths: { product: true, sid: true },
            },
        )
    }

    public async getHistoryList(sid: SessionI['sid'], searchParams: QueriesCommonI): Promise<ProductPreviewPublicI[]> {
        const res = await this.historyRepo.find({
            where: { sid },
            order: { created_at: 'DESC' },
            relations: { product: { images: true } },
            take: this.historyLength,
        });

        return res.map(({ product }) => new ProductPreviewPublic(product, searchParams.lang));
    }

    public async clearHistoryList(sid: SessionI['sid']): Promise<DeleteResult> {
        return await this.historyRepo.delete({ sid });
    }
}
