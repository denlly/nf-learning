import { ApiModelProperty } from '@nestjs/swagger';
import {
    IsString,
    IsEmail,
    Length,
    IsIn,
    IsLowercase,
    IsUppercase,
    IsInt,
    Min,
    Max,
    IsPositive,
    IsNumber,
    IsNumberString,
    IsOptional,
    IsBoolean,
    IsEnum,
} from 'class-validator';

enum Fields {
    NAME = 'name',
    SUBSCRIBED = 'subscribed',
}

enum WalletType {
    USDT = 'USDT',
    Bitcoin = 'Bitcoin',
    Litecoin = 'Litecoin',
    Ethereum = 'Ethereum',
    Dash = 'Dash',
    Monero = 'Monero',
    Zcash = 'Zcash',
}

export class UpdateAccountDto {
    @IsEnum(Fields)
    @ApiModelProperty({ description: '属性', example: 'email' })
    readonly field: Fields;

    @IsString()
    @ApiModelProperty({ description: '属性值', example: 'john@gmail.com' })
    readonly value: string;
}

export class ModifyPasswordDto {
    @IsString()
    @ApiModelProperty({ description: '原始密码', example: '123456' })
    readonly originalPwd: string;

    @IsString()
    @ApiModelProperty({ description: '新密码', example: '654321' })
    readonly newPwd: string;
}

export class SetWalletAddressDto {
    @IsString()
    @ApiModelProperty({ description: '钱包类型', example: 'USDT' })
    readonly walletType: WalletType;

    @IsString()
    @ApiModelProperty({ description: '钱包地址' })
    readonly address: string;
}
