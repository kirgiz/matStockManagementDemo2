import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MaterialTypeDefinitionStockUtilityComponent } from './material-type-definition-stock-utility.component';
import { MaterialTypeDefinitionStockUtilityDetailComponent } from './material-type-definition-stock-utility-detail.component';
import { MaterialTypeDefinitionStockUtilityPopupComponent } from './material-type-definition-stock-utility-dialog.component';
import {
    MaterialTypeDefinitionStockUtilityDeletePopupComponent
} from './material-type-definition-stock-utility-delete-dialog.component';

export const materialTypeDefinitionRoute: Routes = [
    {
        path: 'material-type-definition-stock-utility',
        component: MaterialTypeDefinitionStockUtilityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.materialTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'material-type-definition-stock-utility/:id',
        component: MaterialTypeDefinitionStockUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.materialTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialTypeDefinitionPopupRoute: Routes = [
    {
        path: 'material-type-definition-stock-utility-new',
        component: MaterialTypeDefinitionStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.materialTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'material-type-definition-stock-utility/:id/edit',
        component: MaterialTypeDefinitionStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.materialTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'material-type-definition-stock-utility/:id/delete',
        component: MaterialTypeDefinitionStockUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.materialTypeDefinition.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
