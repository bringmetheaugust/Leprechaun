import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

import { AuthJWT, SignInParams } from '@gen/auth';

export class AuthSignInDTO implements SignInParams {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ required: true })
    password: string
}

export class AuthSuccessDTO implements Omit<AuthJWT, 'refreshToken'> {
    @ApiProperty()
    accessToken: string;
}
