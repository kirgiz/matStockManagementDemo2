import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    AddressTypeDefinitionAddressUtilityService,
    AddressTypeDefinitionAddressUtilityPopupService,
    AddressTypeDefinitionAddressUtilityComponent,
    AddressTypeDefinitionAddressUtilityDetailComponent,
    AddressTypeDefinitionAddressUtilityDialogComponent,
    AddressTypeDefinitionAddressUtilityPopupComponent,
    AddressTypeDefinitionAddressUtilityDeletePopupComponent,
    AddressTypeDefinitionAddressUtilityDeleteDialogComponent,
    addressTypeDefinitionRoute,
    addressTypeDefinitionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressTypeDefinitionRoute,
    ...addressTypeDefinitionPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressTypeDefinitionAddressUtilityComponent,
        AddressTypeDefinitionAddressUtilityDetailComponent,
        AddressTypeDefinitionAddressUtilityDialogComponent,
        AddressTypeDefinitionAddressUtilityDeleteDialogComponent,
        AddressTypeDefinitionAddressUtilityPopupComponent,
        AddressTypeDefinitionAddressUtilityDeletePopupComponent,
    ],
    entryComponents: [
        AddressTypeDefinitionAddressUtilityComponent,
        AddressTypeDefinitionAddressUtilityDialogComponent,
        AddressTypeDefinitionAddressUtilityPopupComponent,
        AddressTypeDefinitionAddressUtilityDeleteDialogComponent,
        AddressTypeDefinitionAddressUtilityDeletePopupComponent,
    ],
    providers: [
        AddressTypeDefinitionAddressUtilityService,
        AddressTypeDefinitionAddressUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementAddressTypeDefinitionAddressUtilityModule {}
