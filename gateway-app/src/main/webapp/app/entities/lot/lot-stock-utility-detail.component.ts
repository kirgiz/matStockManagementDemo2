import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { LotStockUtility } from './lot-stock-utility.model';
import { LotStockUtilityService } from './lot-stock-utility.service';

@Component({
    selector: 'jhi-lot-stock-utility-detail',
    templateUrl: './lot-stock-utility-detail.component.html'
})
export class LotStockUtilityDetailComponent implements OnInit, OnDestroy {

    lot: LotStockUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private lotService: LotStockUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInLots();
    }

    load(id) {
        this.lotService.find(id).subscribe((lot) => {
            this.lot = lot;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInLots() {
        this.eventSubscriber = this.eventManager.subscribe(
            'lotListModification',
            (response) => this.load(this.lot.id)
        );
    }
}
