import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ThirdTypeDefinitionAddressUtilityComponent } from './third-type-definition-address-utility.component';
import { ThirdTypeDefinitionAddressUtilityDetailComponent } from './third-type-definition-address-utility-detail.component';
import { ThirdTypeDefinitionAddressUtilityPopupComponent } from './third-type-definition-address-utility-dialog.component';
import {
    ThirdTypeDefinitionAddressUtilityDeletePopupComponent
} from './third-type-definition-address-utility-delete-dialog.component';

export const thirdTypeDefinitionRoute: Routes = [
    {
        path: 'third-type-definition-address-utility',
        component: ThirdTypeDefinitionAddressUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.thirdTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'third-type-definition-address-utility/:id',
        component: ThirdTypeDefinitionAddressUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.thirdTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const thirdTypeDefinitionPopupRoute: Routes = [
    {
        path: 'third-type-definition-address-utility-new',
        component: ThirdTypeDefinitionAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.thirdTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'third-type-definition-address-utility/:id/edit',
        component: ThirdTypeDefinitionAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.thirdTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'third-type-definition-address-utility/:id/delete',
        component: ThirdTypeDefinitionAddressUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.thirdTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
