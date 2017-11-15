import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyCurrencyUtility } from './currency-currency-utility.model';
import { CurrencyCurrencyUtilityService } from './currency-currency-utility.service';

@Component({
    selector: 'jhi-currency-currency-utility-detail',
    templateUrl: './currency-currency-utility-detail.component.html'
})
export class CurrencyCurrencyUtilityDetailComponent implements OnInit, OnDestroy {

    currency: CurrencyCurrencyUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private currencyService: CurrencyCurrencyUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCurrencies();
    }

    load(id) {
        this.currencyService.find(id).subscribe((currency) => {
            this.currency = currency;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCurrencies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'currencyListModification',
            (response) => this.load(this.currency.id)
        );
    }
}
