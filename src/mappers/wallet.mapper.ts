export namespace WalletMappers {
    export const CustomerBalances = {
        dto: {
            customerId: 'customerID'
        },
        model: {
            'balances.spendable': 'balances.current',
            'balances.withdrawable': 'balances.withdrawable',
            'balances.unsettled': 'balances.unsettled',
            'balances.locked': 'balances.locked',
            'currency': 'currency'
        }
    };
}

