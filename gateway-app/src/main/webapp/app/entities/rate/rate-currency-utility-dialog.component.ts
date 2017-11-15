import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RateCurrencyUtility } from './rate-currency-utility.model';
import { RateCurrencyUtilityPopupService } from './rate-currency-utility-popup.service';
import { RateCurrencyUtilityService } from './rate-currency-utility.service';
import { CurrencyCurrencyUtility, CurrencyCurrencyUtilityService } from '../currency';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-rate-currency-utility-dialog',
    templateUrl: './rate-currency-utility-dialog.component.html'
})
export class RateCurrencyUtilityDialogComponent implements OnInit {

    rate: RateCurrencyUtility;
    isSaving: boolean;

    currencies: CurrencyCurrencyUtility[];
    spotRateDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rateService: RateCurrencyUtilityService,
        private currencyService: CurrencyCurrencyUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.currencyService.query()
            .subscribe((res: ResponseWrapper) => { this.currencies = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rate.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rateService.update(this.rate));
        } else {
            this.subscribeToSaveResponse(
                this.rateService.create(this.rate));
        }
    }

    private subscribeToSaveResponse(result: Observable<RateCurrencyUtility>) {
        result.subscribe((res: RateCurrencyUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: RateCurrencyUtility) {
        this.eventManager.broadcast({ name: 'rateListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCurrencyById(index: number, item: CurrencyCurrencyUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rate-currency-utility-popup',
    template: ''
})
export class RateCurrencyUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratePopupService: RateCurrencyUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ratePopupService
                    .open(RateCurrencyUtilityDialogComponent as Component, params['id']);
            } else {
                this.ratePopupService
                    .open(RateCurrencyUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
