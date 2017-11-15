import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaterialStockUtility } from './material-stock-utility.model';
import { MaterialStockUtilityPopupService } from './material-stock-utility-popup.service';
import { MaterialStockUtilityService } from './material-stock-utility.service';
import { LotStockUtility, LotStockUtilityService } from '../lot';
import { MaterialTypeDefinitionStockUtility, MaterialTypeDefinitionStockUtilityService } from '../material-type-definition';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-material-stock-utility-dialog',
    templateUrl: './material-stock-utility-dialog.component.html'
})
export class MaterialStockUtilityDialogComponent implements OnInit {

    material: MaterialStockUtility;
    isSaving: boolean;

    lots: LotStockUtility[];

    materialtypedefinitions: MaterialTypeDefinitionStockUtility[];
    creationDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private materialService: MaterialStockUtilityService,
        private lotService: LotStockUtilityService,
        private materialTypeDefinitionService: MaterialTypeDefinitionStockUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.lotService.query()
            .subscribe((res: ResponseWrapper) => { this.lots = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.materialTypeDefinitionService.query()
            .subscribe((res: ResponseWrapper) => { this.materialtypedefinitions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.material.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materialService.update(this.material));
        } else {
            this.subscribeToSaveResponse(
                this.materialService.create(this.material));
        }
    }

    private subscribeToSaveResponse(result: Observable<MaterialStockUtility>) {
        result.subscribe((res: MaterialStockUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterialStockUtility) {
        this.eventManager.broadcast({ name: 'materialListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackLotById(index: number, item: LotStockUtility) {
        return item.id;
    }

    trackMaterialTypeDefinitionById(index: number, item: MaterialTypeDefinitionStockUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-material-stock-utility-popup',
    template: ''
})
export class MaterialStockUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialPopupService: MaterialStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materialPopupService
                    .open(MaterialStockUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialPopupService
                    .open(MaterialStockUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
