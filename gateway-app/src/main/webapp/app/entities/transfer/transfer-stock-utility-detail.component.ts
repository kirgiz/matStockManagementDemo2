import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { TransferStockUtility } from './transfer-stock-utility.model';
import { TransferStockUtilityService } from './transfer-stock-utility.service';

@Component({
    selector: 'jhi-transfer-stock-utility-detail',
    templateUrl: './transfer-stock-utility-detail.component.html'
})
export class TransferStockUtilityDetailComponent implements OnInit, OnDestroy {

    transfer: TransferStockUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transferService: TransferStockUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransfers();
    }

    load(id) {
        this.transferService.find(id).subscribe((transfer) => {
            this.transfer = transfer;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransfers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transferListModification',
            (response) => this.load(this.transfer.id)
        );
    }
}
