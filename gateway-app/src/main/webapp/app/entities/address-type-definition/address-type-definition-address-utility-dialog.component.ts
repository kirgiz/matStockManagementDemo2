import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressTypeDefinitionAddressUtility } from './address-type-definition-address-utility.model';
import { AddressTypeDefinitionAddressUtilityPopupService } from './address-type-definition-address-utility-popup.service';
import { AddressTypeDefinitionAddressUtilityService } from './address-type-definition-address-utility.service';

@Component({
    selector: 'jhi-address-type-definition-address-utility-dialog',
    templateUrl: './address-type-definition-address-utility-dialog.component.html'
})
export class AddressTypeDefinitionAddressUtilityDialogComponent implements OnInit {

    addressTypeDefinition: AddressTypeDefinitionAddressUtility;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressTypeDefinitionService: AddressTypeDefinitionAddressUtilityService,
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
        if (this.addressTypeDefinition.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressTypeDefinitionService.update(this.addressTypeDefinition));
        } else {
            this.subscribeToSaveResponse(
                this.addressTypeDefinitionService.create(this.addressTypeDefinition));
        }
    }

    private subscribeToSaveResponse(result: Observable<AddressTypeDefinitionAddressUtility>) {
        result.subscribe((res: AddressTypeDefinitionAddressUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressTypeDefinitionAddressUtility) {
        this.eventManager.broadcast({ name: 'addressTypeDefinitionListModification', content: 'OK'});
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
    selector: 'jhi-address-type-definition-address-utility-popup',
    template: ''
})
export class AddressTypeDefinitionAddressUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressTypeDefinitionPopupService: AddressTypeDefinitionAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressTypeDefinitionPopupService
                    .open(AddressTypeDefinitionAddressUtilityDialogComponent as Component, params['id']);
            } else {
                this.addressTypeDefinitionPopupService
                    .open(AddressTypeDefinitionAddressUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
