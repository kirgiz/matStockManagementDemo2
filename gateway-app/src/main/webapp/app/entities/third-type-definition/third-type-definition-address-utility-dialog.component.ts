import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ThirdTypeDefinitionAddressUtility } from './third-type-definition-address-utility.model';
import { ThirdTypeDefinitionAddressUtilityPopupService } from './third-type-definition-address-utility-popup.service';
import { ThirdTypeDefinitionAddressUtilityService } from './third-type-definition-address-utility.service';

@Component({
    selector: 'jhi-third-type-definition-address-utility-dialog',
    templateUrl: './third-type-definition-address-utility-dialog.component.html'
})
export class ThirdTypeDefinitionAddressUtilityDialogComponent implements OnInit {

    thirdTypeDefinition: ThirdTypeDefinitionAddressUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private thirdTypeDefinitionService: ThirdTypeDefinitionAddressUtilityService,
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
        if (this.thirdTypeDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.thirdTypeDefinitionService.update(this.thirdTypeDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.thirdTypeDefinitionService.create(this.thirdTypeDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<ThirdTypeDefinitionAddressUtility>) {
        result.subscribe((res: ThirdTypeDefinitionAddressUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ThirdTypeDefinitionAddressUtility) {
        this.eventManager.broadcast({ name: 'thirdTypeDefinitionListModification', content: 'OK'});
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
    selector: 'jhi-third-type-definition-address-utility-popup',
    template: ''
})
export class ThirdTypeDefinitionAddressUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thirdTypeDefinitionPopupService: ThirdTypeDefinitionAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.thirdTypeDefinitionPopupService
                    .open(ThirdTypeDefinitionAddressUtilityDialogComponent as Component, params['id']);
            } else {
                this.thirdTypeDefinitionPopupService
                    .open(ThirdTypeDefinitionAddressUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
