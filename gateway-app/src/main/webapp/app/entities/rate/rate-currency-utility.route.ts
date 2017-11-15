import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { RateCurrencyUtilityComponent } from './rate-currency-utility.component';
import { RateCurrencyUtilityDetailComponent } from './rate-currency-utility-detail.component';
import { RateCurrencyUtilityPopupComponent } from './rate-currency-utility-dialog.component';
import { RateCurrencyUtilityDeletePopupComponent } from './rate-currency-utility-delete-dialog.component';

export const rateRoute: Routes = [
    {
        path: 'rate-currency-utility',
        component: RateCurrencyUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.rate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rate-currency-utility/:id',
        component: RateCurrencyUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.rate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const ratePopupRoute: Routes = [
    {
        path: 'rate-currency-utility-new',
        component: RateCurrencyUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.rate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-currency-utility/:id/edit',
        component: RateCurrencyUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.rate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-currency-utility/:id/delete',
        component: RateCurrencyUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.rate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
