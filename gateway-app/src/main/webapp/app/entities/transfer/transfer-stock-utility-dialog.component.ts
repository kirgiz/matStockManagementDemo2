import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TransferStockUtility } from './transfer-stock-utility.model';
import { TransferStockUtilityPopupService } from './transfer-stock-utility-popup.service';
import { TransferStockUtilityService } from './transfer-stock-utility.service';
import { MaterialStockUtility, MaterialStockUtilityService } from '../material';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-transfer-stock-utility-dialog',
    templateUrl: './transfer-stock-utility-dialog.component.html'
})
export class TransferStockUtilityDialogComponent implements OnInit {

    transfer: TransferStockUtility;
    isSaving: boolean;

    materials: MaterialStockUtility[];
    creationDateDp: any;
    validationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transferService: TransferStockUtilityService,
        private materialService: MaterialStockUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.materialService.query()
            .subscribe((res: ResponseWrapper) => { this.materials = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transfer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transferService.update(this.transfer));
        } else {
            this.subscribeToSaveResponse(
                this.transferService.create(this.transfer));
        }
    }

    private subscribeToSaveResponse(result: Observable<TransferStockUtility>) {
        result.subscribe((res: TransferStockUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TransferStockUtility) {
        this.eventManager.broadcast({ name: 'transferListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMaterialById(index: number, item: MaterialStockUtility) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-transfer-stock-utility-popup',
    template: ''
})
export class TransferStockUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transferPopupService: TransferStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transferPopupService
                    .open(TransferStockUtilityDialogComponent as Component, params['id']);
            } else {
                this.transferPopupService
                    .open(TransferStockUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
