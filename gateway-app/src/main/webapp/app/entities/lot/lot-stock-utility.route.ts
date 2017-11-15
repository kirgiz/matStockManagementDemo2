import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { LotStockUtilityComponent } from './lot-stock-utility.component';
import { LotStockUtilityDetailComponent } from './lot-stock-utility-detail.component';
import { LotStockUtilityPopupComponent } from './lot-stock-utility-dialog.component';
import { LotStockUtilityDeletePopupComponent } from './lot-stock-utility-delete-dialog.component';

@Injectable()
export class LotStockUtilityResolvePagingParams implements Resolve<any> {

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

export const lotRoute: Routes = [
    {
        path: 'lot-stock-utility',
        component: LotStockUtilityComponent,
        resolve: {
            'pagingParams': LotStockUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'lot-stock-utility/:id',
        component: LotStockUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const lotPopupRoute: Routes = [
    {
        path: 'lot-stock-utility-new',
        component: LotStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lot-stock-utility/:id/edit',
        component: LotStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'lot-stock-utility/:id/delete',
        component: LotStockUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.lot.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
