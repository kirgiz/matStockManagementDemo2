import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    MaterialTypeDefinitionStockUtilityService,
    MaterialTypeDefinitionStockUtilityPopupService,
    MaterialTypeDefinitionStockUtilityComponent,
    MaterialTypeDefinitionStockUtilityDetailComponent,
    MaterialTypeDefinitionStockUtilityDialogComponent,
    MaterialTypeDefinitionStockUtilityPopupComponent,
    MaterialTypeDefinitionStockUtilityDeletePopupComponent,
    MaterialTypeDefinitionStockUtilityDeleteDialogComponent,
    materialTypeDefinitionRoute,
    materialTypeDefinitionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...materialTypeDefinitionRoute,
    ...materialTypeDefinitionPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MaterialTypeDefinitionStockUtilityComponent,
        MaterialTypeDefinitionStockUtilityDetailComponent,
        MaterialTypeDefinitionStockUtilityDialogComponent,
        MaterialTypeDefinitionStockUtilityDeleteDialogComponent,
        MaterialTypeDefinitionStockUtilityPopupComponent,
        MaterialTypeDefinitionStockUtilityDeletePopupComponent,
    ],
    entryComponents: [
        MaterialTypeDefinitionStockUtilityComponent,
        MaterialTypeDefinitionStockUtilityDialogComponent,
        MaterialTypeDefinitionStockUtilityPopupComponent,
        MaterialTypeDefinitionStockUtilityDeleteDialogComponent,
        MaterialTypeDefinitionStockUtilityDeletePopupComponent,
    ],
    providers: [
        MaterialTypeDefinitionStockUtilityService,
        MaterialTypeDefinitionStockUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementMaterialTypeDefinitionStockUtilityModule {}
