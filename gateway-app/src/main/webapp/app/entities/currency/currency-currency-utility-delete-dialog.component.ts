import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CurrencyCurrencyUtility } from './currency-currency-utility.model';
import { CurrencyCurrencyUtilityPopupService } from './currency-currency-utility-popup.service';
import { CurrencyCurrencyUtilityService } from './currency-currency-utility.service';

@Component({
    selector: 'jhi-currency-currency-utility-delete-dialog',
    templateUrl: './currency-currency-utility-delete-dialog.component.html'
})
export class CurrencyCurrencyUtilityDeleteDialogComponent {

    currency: CurrencyCurrencyUtility;

    constructor(
        private currencyService: CurrencyCurrencyUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.currencyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'currencyListModification',
                content: 'Deleted an currency'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-currency-currency-utility-delete-popup',
    template: ''
})
export class CurrencyCurrencyUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private currencyPopupService: CurrencyCurrencyUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.currencyPopupService
                .open(CurrencyCurrencyUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
