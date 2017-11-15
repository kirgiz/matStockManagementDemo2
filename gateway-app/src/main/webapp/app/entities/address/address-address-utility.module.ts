import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    AddressAddressUtilityService,
    AddressAddressUtilityPopupService,
    AddressAddressUtilityComponent,
    AddressAddressUtilityDetailComponent,
    AddressAddressUtilityDialogComponent,
    AddressAddressUtilityPopupComponent,
    AddressAddressUtilityDeletePopupComponent,
    AddressAddressUtilityDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
    AddressAddressUtilityResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressAddressUtilityComponent,
        AddressAddressUtilityDetailComponent,
        AddressAddressUtilityDialogComponent,
        AddressAddressUtilityDeleteDialogComponent,
        AddressAddressUtilityPopupComponent,
        AddressAddressUtilityDeletePopupComponent,
    ],
    entryComponents: [
        AddressAddressUtilityComponent,
        AddressAddressUtilityDialogComponent,
        AddressAddressUtilityPopupComponent,
        AddressAddressUtilityDeleteDialogComponent,
        AddressAddressUtilityDeletePopupComponent,
    ],
    providers: [
        AddressAddressUtilityService,
        AddressAddressUtilityPopupService,
        AddressAddressUtilityResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementAddressAddressUtilityModule {}
