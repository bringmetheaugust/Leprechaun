import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

import { PropertyGroupEntity } from './propertyGroup.entity';
import { PropertyGroup, PropertyGroupCreate } from 'gen/ts/prop_group';
import TransService from '@trans/trans.service';
import { Trans } from 'gen/ts/trans';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
        private readonly transService: TransService,
    ) { }

    public async getGroupList(isPreview: boolean, isPublic?: boolean): Promise<PropertyGroup[]> {
        const propGroups = await this.propertyGroupRepo.find({
            order: { createdAt: 'DESC' },
            relations: { properties: !isPreview },
        });

        if (!propGroups.length) return [];

        const { items } = await firstValueFrom(
            this.transService.getTransList({
                ids: propGroups.map(p => p.title)
            })
        );

        const translationMap = new Map(items.map(t => [t.id, t]));

        return propGroups.map(propGroup => ({
            ...propGroup,
            title: translationMap.get(propGroup.title) as Trans,
        }));
    }

    public async createGroup(newGroup: PropertyGroupCreate): Promise<PropertyGroup> {
        try {
            const { id, ...title } = await firstValueFrom(
                this.transService.createTrans(newGroup.title).pipe(
                    catchError(err => throwError(() => new RpcException(err)))
                )
            );

            const group = await this.propertyGroupRepo.save({ ...newGroup, title: id });

            return { ...group, title };
        } catch (err: any) {
            if (err.code === '23505') throw new RpcException({ code: status.UNAVAILABLE, message: err.detail });

            throw new RpcException({ code: err.code, message: err.message });
        }
    }
}
