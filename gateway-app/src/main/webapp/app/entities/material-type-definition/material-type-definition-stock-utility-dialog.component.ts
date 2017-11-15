import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MaterialTypeDefinitionStockUtility } from './material-type-definition-stock-utility.model';
import { MaterialTypeDefinitionStockUtilityPopupService } from './material-type-definition-stock-utility-popup.service';
import { MaterialTypeDefinitionStockUtilityService } from './material-type-definition-stock-utility.service';

@Component({
    selector: 'jhi-material-type-definition-stock-utility-dialog',
    templateUrl: './material-type-definition-stock-utility-dialog.component.html'
})
export class MaterialTypeDefinitionStockUtilityDialogComponent implements OnInit {

    materialTypeDefinition: MaterialTypeDefinitionStockUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private materialTypeDefinitionService: MaterialTypeDefinitionStockUtilityService,
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
        if (this.materialTypeDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.materialTypeDefinitionService.update(this.materialTypeDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.materialTypeDefinitionService.create(this.materialTypeDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<MaterialTypeDefinitionStockUtility>) {
        result.subscribe((res: MaterialTypeDefinitionStockUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MaterialTypeDefinitionStockUtility) {
        this.eventManager.broadcast({ name: 'materialTypeDefinitionListModification', content: 'OK'});
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
    selector: 'jhi-material-type-definition-stock-utility-popup',
    template: ''
})
export class MaterialTypeDefinitionStockUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialTypeDefinitionPopupService: MaterialTypeDefinitionStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.materialTypeDefinitionPopupService
                    .open(MaterialTypeDefinitionStockUtilityDialogComponent as Component, params['id']);
            } else {
                this.materialTypeDefinitionPopupService
                    .open(MaterialTypeDefinitionStockUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
