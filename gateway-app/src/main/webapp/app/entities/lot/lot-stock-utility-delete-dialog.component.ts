import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LotStockUtility } from './lot-stock-utility.model';
import { LotStockUtilityPopupService } from './lot-stock-utility-popup.service';
import { LotStockUtilityService } from './lot-stock-utility.service';

@Component({
    selector: 'jhi-lot-stock-utility-delete-dialog',
    templateUrl: './lot-stock-utility-delete-dialog.component.html'
})
export class LotStockUtilityDeleteDialogComponent {

    lot: LotStockUtility;

    constructor(
        private lotService: LotStockUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.lotService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'lotListModification',
                content: 'Deleted an lot'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lot-stock-utility-delete-popup',
    template: ''
})
export class LotStockUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lotPopupService: LotStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.lotPopupService
                .open(LotStockUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
