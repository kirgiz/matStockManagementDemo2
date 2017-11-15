import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ThirdAddressUtilityComponent } from './third-address-utility.component';
import { ThirdAddressUtilityDetailComponent } from './third-address-utility-detail.component';
import { ThirdAddressUtilityPopupComponent } from './third-address-utility-dialog.component';
import { ThirdAddressUtilityDeletePopupComponent } from './third-address-utility-delete-dialog.component';

export const thirdRoute: Routes = [
    {
        path: 'third-address-utility',
        component: ThirdAddressUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.third.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'third-address-utility/:id',
        component: ThirdAddressUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.third.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thirdPopupRoute: Routes = [
    {
        path: 'third-address-utility-new',
        component: ThirdAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.third.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'third-address-utility/:id/edit',
        component: ThirdAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.third.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'third-address-utility/:id/delete',
        component: ThirdAddressUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.third.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
