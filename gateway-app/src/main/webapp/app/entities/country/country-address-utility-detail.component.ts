import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { CountryAddressUtility } from './country-address-utility.model';
import { CountryAddressUtilityService } from './country-address-utility.service';

@Component({
    selector: 'jhi-country-address-utility-detail',
    templateUrl: './country-address-utility-detail.component.html'
})
export class CountryAddressUtilityDetailComponent implements OnInit, OnDestroy {

    country: CountryAddressUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private countryService: CountryAddressUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCountries();
    }

    load(id) {
        this.countryService.find(id).subscribe((country) => {
            this.country = country;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCountries() {
        this.eventSubscriber = this.eventManager.subscribe(
            'countryListModification',
            (response) => this.load(this.country.id)
        );
    }
}
