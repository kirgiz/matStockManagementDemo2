import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    ThirdAddressUtilityService,
    ThirdAddressUtilityPopupService,
    ThirdAddressUtilityComponent,
    ThirdAddressUtilityDetailComponent,
    ThirdAddressUtilityDialogComponent,
    ThirdAddressUtilityPopupComponent,
    ThirdAddressUtilityDeletePopupComponent,
    ThirdAddressUtilityDeleteDialogComponent,
    thirdRoute,
    thirdPopupRoute,
} from './';

const ENTITY_STATES = [
    ...thirdRoute,
    ...thirdPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ThirdAddressUtilityComponent,
        ThirdAddressUtilityDetailComponent,
        ThirdAddressUtilityDialogComponent,
        ThirdAddressUtilityDeleteDialogComponent,
        ThirdAddressUtilityPopupComponent,
        ThirdAddressUtilityDeletePopupComponent,
    ],
    entryComponents: [
        ThirdAddressUtilityComponent,
        ThirdAddressUtilityDialogComponent,
        ThirdAddressUtilityPopupComponent,
        ThirdAddressUtilityDeleteDialogComponent,
        ThirdAddressUtilityDeletePopupComponent,
    ],
    providers: [
        ThirdAddressUtilityService,
        ThirdAddressUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementThirdAddressUtilityModule {}
