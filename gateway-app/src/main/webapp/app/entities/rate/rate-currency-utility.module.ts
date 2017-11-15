import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    RateCurrencyUtilityService,
    RateCurrencyUtilityPopupService,
    RateCurrencyUtilityComponent,
    RateCurrencyUtilityDetailComponent,
    RateCurrencyUtilityDialogComponent,
    RateCurrencyUtilityPopupComponent,
    RateCurrencyUtilityDeletePopupComponent,
    RateCurrencyUtilityDeleteDialogComponent,
    rateRoute,
    ratePopupRoute,
} from './';

const ENTITY_STATES = [
    ...rateRoute,
    ...ratePopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RateCurrencyUtilityComponent,
        RateCurrencyUtilityDetailComponent,
        RateCurrencyUtilityDialogComponent,
        RateCurrencyUtilityDeleteDialogComponent,
        RateCurrencyUtilityPopupComponent,
        RateCurrencyUtilityDeletePopupComponent,
    ],
    entryComponents: [
        RateCurrencyUtilityComponent,
        RateCurrencyUtilityDialogComponent,
        RateCurrencyUtilityPopupComponent,
        RateCurrencyUtilityDeleteDialogComponent,
        RateCurrencyUtilityDeletePopupComponent,
    ],
    providers: [
        RateCurrencyUtilityService,
        RateCurrencyUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementRateCurrencyUtilityModule {}
