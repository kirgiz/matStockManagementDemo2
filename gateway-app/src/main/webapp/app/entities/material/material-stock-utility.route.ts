import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MaterialStockUtilityComponent } from './material-stock-utility.component';
import { MaterialStockUtilityDetailComponent } from './material-stock-utility-detail.component';
import { MaterialStockUtilityPopupComponent } from './material-stock-utility-dialog.component';
import { MaterialStockUtilityDeletePopupComponent } from './material-stock-utility-delete-dialog.component';

@Injectable()
export class MaterialStockUtilityResolvePagingParams implements Resolve<any> {

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

export const materialRoute: Routes = [
    {
        path: 'material-stock-utility',
        component: MaterialStockUtilityComponent,
        resolve: {
            'pagingParams': MaterialStockUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'material-stock-utility/:id',
        component: MaterialStockUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const materialPopupRoute: Routes = [
    {
        path: 'material-stock-utility-new',
        component: MaterialStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'material-stock-utility/:id/edit',
        component: MaterialStockUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'material-stock-utility/:id/delete',
        component: MaterialStockUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.material.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
