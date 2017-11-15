import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StockManagementSharedModule } from '../../shared';
import {
    CountryAddressUtilityService,
    CountryAddressUtilityPopupService,
    CountryAddressUtilityComponent,
    CountryAddressUtilityDetailComponent,
    CountryAddressUtilityDialogComponent,
    CountryAddressUtilityPopupComponent,
    CountryAddressUtilityDeletePopupComponent,
    CountryAddressUtilityDeleteDialogComponent,
    countryRoute,
    countryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...countryRoute,
    ...countryPopupRoute,
];

@NgModule({
    imports: [
        StockManagementSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CountryAddressUtilityComponent,
        CountryAddressUtilityDetailComponent,
        CountryAddressUtilityDialogComponent,
        CountryAddressUtilityDeleteDialogComponent,
        CountryAddressUtilityPopupComponent,
        CountryAddressUtilityDeletePopupComponent,
    ],
    entryComponents: [
        CountryAddressUtilityComponent,
        CountryAddressUtilityDialogComponent,
        CountryAddressUtilityPopupComponent,
        CountryAddressUtilityDeleteDialogComponent,
        CountryAddressUtilityDeletePopupComponent,
    ],
    providers: [
        CountryAddressUtilityService,
        CountryAddressUtilityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StockManagementCountryAddressUtilityModule {}
