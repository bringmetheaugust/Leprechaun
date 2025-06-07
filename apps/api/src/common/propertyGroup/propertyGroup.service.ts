import { ClientGrpc } from '@nestjs/microservices';
import { BadRequestException, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { catchError, lastValueFrom, throwError } from 'rxjs';

import {
    PROPERTY_GROUP_SERVICE_NAME, PropertyGroup, PropertyGroupCreate, PropertyGroupPreview, PropertyGroupServiceClient,
} from '@gen/prop_group';
import { PROP_GROUP_PACKAGE } from './propertyGroup.constants';

@Injectable()
export default class PropertyGroupService implements OnModuleInit {
    private propGroupService: PropertyGroupServiceClient;

    constructor(@Inject(PROP_GROUP_PACKAGE) private client: ClientGrpc) { }

    onModuleInit() {
        this.propGroupService = this.client.getService<PropertyGroupServiceClient>(PROPERTY_GROUP_SERVICE_NAME);
    }

    // public async getGroup(id: PropertyGroupI['id']): Promise<PropertyGroupI | null> {
    //     return await this.propertyGroupRepo.findOne({
    //         where: { id },
    //         relations: { categories: true },
    //         order: { properties: { created_at: 'DESC' } },
    //     });
    // }

    public async getGroupListPrivate(): Promise<PropertyGroupPreview[]> {
        const { items } = await lastValueFrom(this.propGroupService.getGroupListPrivate({}));

        return items || [];
    }

    // public async getGroupListByCategoryID(id: CategoryI['id']): Promise<PropertyGroupPreviewI[]> {
    //     return await this.propertyGroupRepo.find({
    //         where: { categories: { id } },
    //     });
    // }

    public async createGroup(newGroup: PropertyGroupCreate): Promise<PropertyGroup> {
        return lastValueFrom(
            this.propGroupService.createGroup(newGroup).pipe(
                catchError(({ details }) => throwError(() => new BadRequestException(details)))
            )
        );
    }

    // async updateGroup(id: PropertyGroupI['id'], updates: PropertyGroupUpdateDTO): Promise<UpdateResult> {
    //     return await this.propertyGroupRepo.update({ id }, updates);
    // }

    // public async deleteGroup(groupId: number): Promise<DeleteResult> {
    //     return await this.propertyGroupRepo.delete({ id: groupId });
    // }
}
