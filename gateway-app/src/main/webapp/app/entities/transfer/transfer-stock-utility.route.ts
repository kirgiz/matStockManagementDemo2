import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TransferStockUtilityComponent } from './transfer-stock-utility.component';
import { TransferStockUtilityDetailComponent } from './transfer-stock-utility-detail.component';
import { TransferStockUtilityPopupComponent } from './transfer-stock-utility-dialog.component';
import { TransferStockUtilityDeletePopupComponent } from './transfer-stock-utility-delete-dialog.component';

@Injectable()
export class TransferStockUtilityResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const transferRoute: Routes = [
    {
        path: 'transfer-stock-utility',
        component: TransferStockUtilityComponent,
        resolve: {
            'pagingParams': TransferStockUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transfer-stock-utility/:id',
        component: TransferStockUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transferPopupRoute: Routes = [
    {
        path: 'transfer-stock-utility-new',
        component: TransferStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfer-stock-utility/:id/edit',
        component: TransferStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfer-stock-utility/:id/delete',
        component: TransferStockUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.transfer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
