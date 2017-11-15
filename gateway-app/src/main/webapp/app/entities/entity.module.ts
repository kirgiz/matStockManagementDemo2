import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { StockManagementCountryAddressUtilityModule } from './country/country-address-utility.module';
import { StockManagementThirdTypeDefinitionAddressUtilityModule } from './third-type-definition/third-type-definition-address-utility.module';
import { StockManagementThirdAddressUtilityModule } from './third/third-address-utility.module';
import { StockManagementAddressTypeDefinitionAddressUtilityModule } from './address-type-definition/address-type-definition-address-utility.module';
import { StockManagementAddressAddressUtilityModule } from './address/address-address-utility.module';
import { StockManagementCurrencyCurrencyUtilityModule } from './currency/currency-currency-utility.module';
import { StockManagementRateCurrencyUtilityModule } from './rate/rate-currency-utility.module';
import { StockManagementMaterialTypeDefinitionStockUtilityModule } from './material-type-definition/material-type-definition-stock-utility.module';
import { StockManagementLotStockUtilityModule } from './lot/lot-stock-utility.module';
import { StockManagementTransferStockUtilityModule } from './transfer/transfer-stock-utility.module';
import { StockManagementMaterialStockUtilityModule } from './material/material-stock-utility.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        StockManagementCountryAddressUtilityModule,
        StockManagementThirdTypeDefinitionAddressUtilityModule,
        StockManagementThirdAddressUtilityModule,
        StockManagementAddressTypeDefinitionAddressUtilityModule,
        StockManagementAddressAddressUtilityModule,
        StockManagementCurrencyCurrencyUtilityModule,
        StockManagementRateCurrencyUtilityModule,
        StockManagementMaterialTypeDefinitionStockUtilityModule,
        StockManagementLotStockUtilityModule,
        StockManagementTransferStockUtilityModule,
        StockManagementMaterialStockUtilityModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementEntityModule {}
