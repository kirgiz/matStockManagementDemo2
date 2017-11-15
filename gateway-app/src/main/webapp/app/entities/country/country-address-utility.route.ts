import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CountryAddressUtilityComponent } from './country-address-utility.component';
import { CountryAddressUtilityDetailComponent } from './country-address-utility-detail.component';
import { CountryAddressUtilityPopupComponent } from './country-address-utility-dialog.component';
import { CountryAddressUtilityDeletePopupComponent } from './country-address-utility-delete-dialog.component';

export const countryRoute: Routes = [
    {
        path: 'country-address-utility',
        component: CountryAddressUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'country-address-utility/:id',
        component: CountryAddressUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const countryPopupRoute: Routes = [
    {
        path: 'country-address-utility-new',
        component: CountryAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-address-utility/:id/edit',
        component: CountryAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'country-address-utility/:id/delete',
        component: CountryAddressUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.country.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
