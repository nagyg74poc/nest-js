import {ApiModelProperty} from '@nestjs/swagger';
import {CustomerBalance} from './customerbalance';
import {Balances} from './balances';

export class CustomerBalanceResponse extends CustomerBalance {
    @ApiModelProperty()
    balances: Balances;

    @ApiModelProperty({description: 'Currency registered for the customer', example: 'USD'})
    currency: string;
}

export class CustomerBalanceRequest {
    @ApiModelProperty({description: 'Internal Customer ID'})
    customerId: number
}