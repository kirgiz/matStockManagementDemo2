import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    LotStockUtilityService,
    LotStockUtilityPopupService,
    LotStockUtilityComponent,
    LotStockUtilityDetailComponent,
    LotStockUtilityDialogComponent,
    LotStockUtilityPopupComponent,
    LotStockUtilityDeletePopupComponent,
    LotStockUtilityDeleteDialogComponent,
    lotRoute,
    lotPopupRoute,
    LotStockUtilityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...lotRoute,
    ...lotPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LotStockUtilityComponent,
        LotStockUtilityDetailComponent,
        LotStockUtilityDialogComponent,
        LotStockUtilityDeleteDialogComponent,
        LotStockUtilityPopupComponent,
        LotStockUtilityDeletePopupComponent,
    ],
    entryComponents: [
        LotStockUtilityComponent,
        LotStockUtilityDialogComponent,
        LotStockUtilityPopupComponent,
        LotStockUtilityDeleteDialogComponent,
        LotStockUtilityDeletePopupComponent,
    ],
    providers: [
        LotStockUtilityService,
        LotStockUtilityPopupService,
        LotStockUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementLotStockUtilityModule {}
