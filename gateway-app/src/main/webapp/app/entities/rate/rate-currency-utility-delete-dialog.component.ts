import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RateCurrencyUtility } from './rate-currency-utility.model';
import { RateCurrencyUtilityPopupService } from './rate-currency-utility-popup.service';
import { RateCurrencyUtilityService } from './rate-currency-utility.service';

@Component({
    selector: 'jhi-rate-currency-utility-delete-dialog',
    templateUrl: './rate-currency-utility-delete-dialog.component.html'
})
export class RateCurrencyUtilityDeleteDialogComponent {

    rate: RateCurrencyUtility;

    constructor(
        private rateService: RateCurrencyUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rateService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rateListModification',
                content: 'Deleted an rate'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rate-currency-utility-delete-popup',
    template: ''
})
export class RateCurrencyUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ratePopupService: RateCurrencyUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ratePopupService
                .open(RateCurrencyUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
