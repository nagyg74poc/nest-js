import {Get, Controller, Param, UseGuards, UseInterceptors, HttpStatus} from '@nestjs/common';
import {
    ApiUseTags,
    ApiImplicitHeader,
    ApiOkResponse, ApiResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiGatewayTimeoutResponse,
} from '@nestjs/swagger';
import {WalletManager} from '../../managers/v1';
import {AuthGuard} from '../../utils/auth.guard';
import {Properties} from '../../utils/configuration';
import {CustomerBalanceRequest, CustomerBalanceResponse} from '../../classes/_reqresclasses';
import {ResponseMapper} from "../../interceptors/response-mapper.interceptor";
import {WalletMappers} from '../../mappers/wallet.mapper';

//Controller level Swagger documentation
@ApiUseTags('wallet')
@ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized'})
@ApiForbiddenResponse({description: 'Forbidden'})
@ApiBadRequestResponse({description: 'Bad request'})
@ApiInternalServerErrorResponse({description: 'Internal Server Error'})
@ApiGatewayTimeoutResponse({description: 'Gateway Timeout'})
// JWT and SessionToken validation
@UseGuards(AuthGuard)
@Controller('wallet')
export class WalletController {
    constructor(private readonly walletManager: WalletManager) {
    }

    // Endpoint level Swagger documentation
    @ApiImplicitHeader({name: Properties.getServicesProperties().properties.AUTH_TOKEN, required: true, description: 'JWT Token'})
    @ApiOkResponse({type: CustomerBalanceResponse, description: 'Returns Customer Balances'})
    // Response mapper
    @UseInterceptors(new ResponseMapper<CustomerBalanceResponse>(WalletMappers.CustomerBalances.model))
    @Get(':customerId')
    getBalance(@Param() customerBalanceRequest: CustomerBalanceRequest): CustomerBalanceResponse {
        return this.walletManager.getBalance(customerBalanceRequest.customerId)
            .catch(err => this.walletManager.errorHandler(err));
    }
}
