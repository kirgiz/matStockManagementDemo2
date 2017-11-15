import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CurrencyCurrencyUtilityComponent } from './currency-currency-utility.component';
import { CurrencyCurrencyUtilityDetailComponent } from './currency-currency-utility-detail.component';
import { CurrencyCurrencyUtilityPopupComponent } from './currency-currency-utility-dialog.component';
import { CurrencyCurrencyUtilityDeletePopupComponent } from './currency-currency-utility-delete-dialog.component';

@Injectable()
export class CurrencyCurrencyUtilityResolvePagingParams implements Resolve<any> {

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

export const currencyRoute: Routes = [
    {
        path: 'currency-currency-utility',
        component: CurrencyCurrencyUtilityComponent,
        resolve: {
            'pagingParams': CurrencyCurrencyUtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'currency-currency-utility/:id',
        component: CurrencyCurrencyUtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const currencyPopupRoute: Routes = [
    {
        path: 'currency-currency-utility-new',
        component: CurrencyCurrencyUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'currency-currency-utility/:id/edit',
        component: CurrencyCurrencyUtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'currency-currency-utility/:id/delete',
        component: CurrencyCurrencyUtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'stockManagementApp.currency.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
