import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    CurrencyCurrencyUtilityService,
    CurrencyCurrencyUtilityPopupService,
    CurrencyCurrencyUtilityComponent,
    CurrencyCurrencyUtilityDetailComponent,
    CurrencyCurrencyUtilityDialogComponent,
    CurrencyCurrencyUtilityPopupComponent,
    CurrencyCurrencyUtilityDeletePopupComponent,
    CurrencyCurrencyUtilityDeleteDialogComponent,
    currencyRoute,
    currencyPopupRoute,
    CurrencyCurrencyUtilityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...currencyRoute,
    ...currencyPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CurrencyCurrencyUtilityComponent,
        CurrencyCurrencyUtilityDetailComponent,
        CurrencyCurrencyUtilityDialogComponent,
        CurrencyCurrencyUtilityDeleteDialogComponent,
        CurrencyCurrencyUtilityPopupComponent,
        CurrencyCurrencyUtilityDeletePopupComponent,
    ],
    entryComponents: [
        CurrencyCurrencyUtilityComponent,
        CurrencyCurrencyUtilityDialogComponent,
        CurrencyCurrencyUtilityPopupComponent,
        CurrencyCurrencyUtilityDeleteDialogComponent,
        CurrencyCurrencyUtilityDeletePopupComponent,
    ],
    providers: [
        CurrencyCurrencyUtilityService,
        CurrencyCurrencyUtilityPopupService,
        CurrencyCurrencyUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementCurrencyCurrencyUtilityModule {}
