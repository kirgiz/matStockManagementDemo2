import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    TransferStockUtilityService,
    TransferStockUtilityPopupService,
    TransferStockUtilityComponent,
    TransferStockUtilityDetailComponent,
    TransferStockUtilityDialogComponent,
    TransferStockUtilityPopupComponent,
    TransferStockUtilityDeletePopupComponent,
    TransferStockUtilityDeleteDialogComponent,
    transferRoute,
    transferPopupRoute,
    TransferStockUtilityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...transferRoute,
    ...transferPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TransferStockUtilityComponent,
        TransferStockUtilityDetailComponent,
        TransferStockUtilityDialogComponent,
        TransferStockUtilityDeleteDialogComponent,
        TransferStockUtilityPopupComponent,
        TransferStockUtilityDeletePopupComponent,
    ],
    entryComponents: [
        TransferStockUtilityComponent,
        TransferStockUtilityDialogComponent,
        TransferStockUtilityPopupComponent,
        TransferStockUtilityDeleteDialogComponent,
        TransferStockUtilityDeletePopupComponent,
    ],
    providers: [
        TransferStockUtilityService,
        TransferStockUtilityPopupService,
        TransferStockUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementTransferStockUtilityModule {}
