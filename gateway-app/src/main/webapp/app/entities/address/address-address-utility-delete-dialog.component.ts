import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AddressAddressUtility } from './address-address-utility.model';
import { AddressAddressUtilityPopupService } from './address-address-utility-popup.service';
import { AddressAddressUtilityService } from './address-address-utility.service';

@Component({
    selector: 'jhi-address-address-utility-delete-dialog',
    templateUrl: './address-address-utility-delete-dialog.component.html'
})
export class AddressAddressUtilityDeleteDialogComponent {

    address: AddressAddressUtility;

    constructor(
        private addressService: AddressAddressUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.addressService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'addressListModification',
                content: 'Deleted an address'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-address-address-utility-delete-popup',
    template: ''
})
export class AddressAddressUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.addressPopupService
                .open(AddressAddressUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
