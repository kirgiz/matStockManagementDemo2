import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TransferStockUtility } from './transfer-stock-utility.model';
import { TransferStockUtilityPopupService } from './transfer-stock-utility-popup.service';
import { TransferStockUtilityService } from './transfer-stock-utility.service';

@Component({
    selector: 'jhi-transfer-stock-utility-delete-dialog',
    templateUrl: './transfer-stock-utility-delete-dialog.component.html'
})
export class TransferStockUtilityDeleteDialogComponent {

    transfer: TransferStockUtility;

    constructor(
        private transferService: TransferStockUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transferService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transferListModification',
                content: 'Deleted an transfer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfer-stock-utility-delete-popup',
    template: ''
})
export class TransferStockUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferPopupService: TransferStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transferPopupService
                .open(TransferStockUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
