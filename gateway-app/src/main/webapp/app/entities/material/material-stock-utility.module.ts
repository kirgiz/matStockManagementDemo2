import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    MaterialStockUtilityService,
    MaterialStockUtilityPopupService,
    MaterialStockUtilityComponent,
    MaterialStockUtilityDetailComponent,
    MaterialStockUtilityDialogComponent,
    MaterialStockUtilityPopupComponent,
    MaterialStockUtilityDeletePopupComponent,
    MaterialStockUtilityDeleteDialogComponent,
    materialRoute,
    materialPopupRoute,
    MaterialStockUtilityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...materialRoute,
    ...materialPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MaterialStockUtilityComponent,
        MaterialStockUtilityDetailComponent,
        MaterialStockUtilityDialogComponent,
        MaterialStockUtilityDeleteDialogComponent,
        MaterialStockUtilityPopupComponent,
        MaterialStockUtilityDeletePopupComponent,
    ],
    entryComponents: [
        MaterialStockUtilityComponent,
        MaterialStockUtilityDialogComponent,
        MaterialStockUtilityPopupComponent,
        MaterialStockUtilityDeleteDialogComponent,
        MaterialStockUtilityDeletePopupComponent,
    ],
    providers: [
        MaterialStockUtilityService,
        MaterialStockUtilityPopupService,
        MaterialStockUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementMaterialStockUtilityModule {}
