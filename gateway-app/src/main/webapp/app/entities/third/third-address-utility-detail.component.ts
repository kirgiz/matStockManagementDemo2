import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ThirdAddressUtility } from './third-address-utility.model';
import { ThirdAddressUtilityService } from './third-address-utility.service';

@Component({
    selector: 'jhi-third-address-utility-detail',
    templateUrl: './third-address-utility-detail.component.html'
})
export class ThirdAddressUtilityDetailComponent implements OnInit, OnDestroy {

    third: ThirdAddressUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private thirdService: ThirdAddressUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInThirds();
    }

    load(id) {
        this.thirdService.find(id).subscribe((third) => {
            this.third = third;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInThirds() {
        this.eventSubscriber = this.eventManager.subscribe(
            'thirdListModification',
            (response) => this.load(this.third.id)
        );
    }
}
