import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CurrencyCurrencyUtility } from './currency-currency-utility.model';
import { CurrencyCurrencyUtilityPopupService } from './currency-currency-utility-popup.service';
import { CurrencyCurrencyUtilityService } from './currency-currency-utility.service';

@Component({
    selector: 'jhi-currency-currency-utility-dialog',
    templateUrl: './currency-currency-utility-dialog.component.html'
})
export class CurrencyCurrencyUtilityDialogComponent implements OnInit {

    currency: CurrencyCurrencyUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private currencyService: CurrencyCurrencyUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.currency.id !== undefined) {
            this.subscribeToSaveResponse(
                this.currencyService.update(this.currency));
        } else {
            this.subscribeToSaveResponse(
                this.currencyService.create(this.currency));
        }
    }

    private subscribeToSaveResponse(result: Observable<CurrencyCurrencyUtility>) {
        result.subscribe((res: CurrencyCurrencyUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CurrencyCurrencyUtility) {
        this.eventManager.broadcast({ name: 'currencyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-currency-currency-utility-popup',
    template: ''
})
export class CurrencyCurrencyUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyPopupService: CurrencyCurrencyUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.currencyPopupService
                    .open(CurrencyCurrencyUtilityDialogComponent as Component, params['id']);
            } else {
                this.currencyPopupService
                    .open(CurrencyCurrencyUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
