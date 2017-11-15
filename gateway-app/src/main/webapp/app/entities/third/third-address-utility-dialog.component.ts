import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ThirdAddressUtility } from './third-address-utility.model';
import { ThirdAddressUtilityPopupService } from './third-address-utility-popup.service';
import { ThirdAddressUtilityService } from './third-address-utility.service';
import { ThirdTypeDefinitionAddressUtility, ThirdTypeDefinitionAddressUtilityService } from '../third-type-definition';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-third-address-utility-dialog',
    templateUrl: './third-address-utility-dialog.component.html'
})
export class ThirdAddressUtilityDialogComponent implements OnInit {

    third: ThirdAddressUtility;
    isSaving: boolean;

    thirdtypedefinitions: ThirdTypeDefinitionAddressUtility[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private thirdService: ThirdAddressUtilityService,
        private thirdTypeDefinitionService: ThirdTypeDefinitionAddressUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.thirdTypeDefinitionService.query()
            .subscribe((res: ResponseWrapper) => { this.thirdtypedefinitions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.third.id !== undefined) {
            this.subscribeToSaveResponse(
                this.thirdService.update(this.third));
        } else {
            this.subscribeToSaveResponse(
                this.thirdService.create(this.third));
        }
    }

    private subscribeToSaveResponse(result: Observable<ThirdAddressUtility>) {
        result.subscribe((res: ThirdAddressUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ThirdAddressUtility) {
        this.eventManager.broadcast({ name: 'thirdListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackThirdTypeDefinitionById(index: number, item: ThirdTypeDefinitionAddressUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-third-address-utility-popup',
    template: ''
})
export class ThirdAddressUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thirdPopupService: ThirdAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.thirdPopupService
                    .open(ThirdAddressUtilityDialogComponent as Component, params['id']);
            } else {
                this.thirdPopupService
                    .open(ThirdAddressUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
