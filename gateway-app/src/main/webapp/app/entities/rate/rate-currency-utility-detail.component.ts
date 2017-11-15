import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { RateCurrencyUtility } from './rate-currency-utility.model';
import { RateCurrencyUtilityService } from './rate-currency-utility.service';

@Component({
    selector: 'jhi-rate-currency-utility-detail',
    templateUrl: './rate-currency-utility-detail.component.html'
})
export class RateCurrencyUtilityDetailComponent implements OnInit, OnDestroy {

    rate: RateCurrencyUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rateService: RateCurrencyUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRates();
    }

    load(id) {
        this.rateService.find(id).subscribe((rate) => {
            this.rate = rate;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRates() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rateListModification',
            (response) => this.load(this.rate.id)
        );
    }
}
