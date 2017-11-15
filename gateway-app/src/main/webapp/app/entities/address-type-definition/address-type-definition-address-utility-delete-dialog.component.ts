import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressTypeDefinitionAddressUtility } from './address-type-definition-address-utility.model';
import { AddressTypeDefinitionAddressUtilityPopupService } from './address-type-definition-address-utility-popup.service';
import { AddressTypeDefinitionAddressUtilityService } from './address-type-definition-address-utility.service';

@Component({
    selector: 'jhi-address-type-definition-address-utility-delete-dialog',
    templateUrl: './address-type-definition-address-utility-delete-dialog.component.html'
})
export class AddressTypeDefinitionAddressUtilityDeleteDialogComponent {

    addressTypeDefinition: AddressTypeDefinitionAddressUtility;

    constructor(
        private addressTypeDefinitionService: AddressTypeDefinitionAddressUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressTypeDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressTypeDefinitionListModification',
                content: 'Deleted an addressTypeDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-type-definition-address-utility-delete-popup',
    template: ''
})
export class AddressTypeDefinitionAddressUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressTypeDefinitionPopupService: AddressTypeDefinitionAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressTypeDefinitionPopupService
                .open(AddressTypeDefinitionAddressUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
