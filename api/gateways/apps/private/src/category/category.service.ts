import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryPreviewI } from './category.interface';
import { Category, CategoryCreateDTO, CategoryUpdateDTO } from './category.dto';
import CategoryEntity from '@core/category/category.entity';
import { CategoryI } from '@core/category/category.interface';
import FSService from '@core/FS/FS.service';
import { FSBucket } from '@core/FS/FS.enum';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
        private readonly FSService: FSService,
    ) { }

    public async getCategoryList(): Promise<CategoryPreviewI[]> {
        return await this.categoryRepo.find({
            order: {
                created_at: 'DESC',
            },
        });
    }

    public async createCategory(
        newCategory: CategoryCreateDTO, icon: Express.Multer.File | undefined,
    ): Promise<CategoryI> {
        let iconData: Awaited<ReturnType<FSService['uploadFile']>> | undefined;

        if (icon) iconData = await this.FSService.uploadFile(icon, FSBucket.CATEGORY, newCategory.url);

        try {
            return await this.categoryRepo.save({
                ...new Category(newCategory), icon: iconData?.url, icon_id: iconData?.id,
            });
        } catch (err) {
            if (iconData) this.FSService.deleteFile(FSBucket.CATEGORY, iconData.id);

            throw new BadRequestException(
                //@ts-ignore
                err.code == 23505
                    ? `category with url "${newCategory.url}" already exist`
                    : err
            );
        }
    }

    public async getCategory(categoryUrl: CategoryI['url']): Promise<CategoryI | null> {
        return await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: { propertygroups: true, products: true }
        });
    }

    public async updateCategory(categoryId: CategoryI['id'], updates: CategoryUpdateDTO): Promise<UpdateResult> {
        return await this.categoryRepo.update({ id: categoryId }, updates);
    }

    public async deleteCategory(id: CategoryI['id']): Promise<DeleteResult> {
        const category = await this.categoryRepo.findOne({
            where: { id },
            select: { id: true, icon_id: true },
        });

        const res = await this.categoryRepo.delete({ id });

        if (category?.icon_id) await this.FSService.deleteFile(FSBucket.CATEGORY, category.icon_id);

        return res;
    }
}
