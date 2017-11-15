import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { LotStockUtility } from './lot-stock-utility.model';
import { LotStockUtilityPopupService } from './lot-stock-utility-popup.service';
import { LotStockUtilityService } from './lot-stock-utility.service';

@Component({
    selector: 'jhi-lot-stock-utility-dialog',
    templateUrl: './lot-stock-utility-dialog.component.html'
})
export class LotStockUtilityDialogComponent implements OnInit {

    lot: LotStockUtility;
    isSaving: boolean;
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private lotService: LotStockUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.lot.id !== undefined) {
            this.subscribeToSaveResponse(
                this.lotService.update(this.lot));
        } else {
            this.subscribeToSaveResponse(
                this.lotService.create(this.lot));
        }
    }

    private subscribeToSaveResponse(result: Observable<LotStockUtility>) {
        result.subscribe((res: LotStockUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: LotStockUtility) {
        this.eventManager.broadcast({ name: 'lotListModification', content: 'OK'});
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
    selector: 'jhi-lot-stock-utility-popup',
    template: ''
})
export class LotStockUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private lotPopupService: LotStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.lotPopupService
                    .open(LotStockUtilityDialogComponent as Component, params['id']);
            } else {
                this.lotPopupService
                    .open(LotStockUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
