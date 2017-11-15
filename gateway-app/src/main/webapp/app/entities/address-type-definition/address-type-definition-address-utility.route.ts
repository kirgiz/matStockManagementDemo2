import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AddressTypeDefinitionAddressUtilityComponent } from './address-type-definition-address-utility.component';
import { AddressTypeDefinitionAddressUtilityDetailComponent } from './address-type-definition-address-utility-detail.component';
import { AddressTypeDefinitionAddressUtilityPopupComponent } from './address-type-definition-address-utility-dialog.component';
import {
    AddressTypeDefinitionAddressUtilityDeletePopupComponent
} from './address-type-definition-address-utility-delete-dialog.component';

export const addressTypeDefinitionRoute: Routes = [
    {
        path: 'address-type-definition-address-utility',
        component: AddressTypeDefinitionAddressUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.addressTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-type-definition-address-utility/:id',
        component: AddressTypeDefinitionAddressUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.addressTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressTypeDefinitionPopupRoute: Routes = [
    {
        path: 'address-type-definition-address-utility-new',
        component: AddressTypeDefinitionAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.addressTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-type-definition-address-utility/:id/edit',
        component: AddressTypeDefinitionAddressUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.addressTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-type-definition-address-utility/:id/delete',
        component: AddressTypeDefinitionAddressUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.addressTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
