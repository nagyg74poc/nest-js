import {ApiModelProperty} from '@nestjs/swagger';

export class Balances {
    @ApiModelProperty({description: 'Current balance', example: 180})
    current: number;

    @ApiModelProperty({description: 'Withdrawable amount', example: 120})
    withdrawable: number;

    @ApiModelProperty({description: 'Locked amount', example: 60})
    locked: number;

    @ApiModelProperty()
    unsettled: number;
}