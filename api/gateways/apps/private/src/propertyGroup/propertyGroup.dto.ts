import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { TransDTO } from '@core/trans/trans.dto';

export class PropertyGroupCreateDTO {
    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, description: 'visible property for ProductCard', default: false })
    is_primary: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}

export class PropertyGroupUpdateDTO implements PropertyGroupCreateDTO {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => TransDTO)
    @ApiProperty()
    title: TransDTO;

    @IsOptional()
    @IsString()
    @ApiProperty()
    alt_name: string;

    @IsOptional()
    @IsBoolean()
    @ApiProperty({ required: false, description: 'visible property for ProductCard', default: false })
    is_primary: boolean;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false, default: null })
    comment: string;
}
