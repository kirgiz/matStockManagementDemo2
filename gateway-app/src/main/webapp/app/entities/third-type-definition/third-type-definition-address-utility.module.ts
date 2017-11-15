import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    ThirdTypeDefinitionAddressUtilityService,
    ThirdTypeDefinitionAddressUtilityPopupService,
    ThirdTypeDefinitionAddressUtilityComponent,
    ThirdTypeDefinitionAddressUtilityDetailComponent,
    ThirdTypeDefinitionAddressUtilityDialogComponent,
    ThirdTypeDefinitionAddressUtilityPopupComponent,
    ThirdTypeDefinitionAddressUtilityDeletePopupComponent,
    ThirdTypeDefinitionAddressUtilityDeleteDialogComponent,
    thirdTypeDefinitionRoute,
    thirdTypeDefinitionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...thirdTypeDefinitionRoute,
    ...thirdTypeDefinitionPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ThirdTypeDefinitionAddressUtilityComponent,
        ThirdTypeDefinitionAddressUtilityDetailComponent,
        ThirdTypeDefinitionAddressUtilityDialogComponent,
        ThirdTypeDefinitionAddressUtilityDeleteDialogComponent,
        ThirdTypeDefinitionAddressUtilityPopupComponent,
        ThirdTypeDefinitionAddressUtilityDeletePopupComponent,
    ],
    entryComponents: [
        ThirdTypeDefinitionAddressUtilityComponent,
        ThirdTypeDefinitionAddressUtilityDialogComponent,
        ThirdTypeDefinitionAddressUtilityPopupComponent,
        ThirdTypeDefinitionAddressUtilityDeleteDialogComponent,
        ThirdTypeDefinitionAddressUtilityDeletePopupComponent,
    ],
    providers: [
        ThirdTypeDefinitionAddressUtilityService,
        ThirdTypeDefinitionAddressUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementThirdTypeDefinitionAddressUtilityModule {}
