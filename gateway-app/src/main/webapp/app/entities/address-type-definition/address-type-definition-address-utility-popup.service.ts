import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddressTypeDefinitionAddressUtility } from './address-type-definition-address-utility.model';
import { AddressTypeDefinitionAddressUtilityService } from './address-type-definition-address-utility.service';

@Injectable()
export class AddressTypeDefinitionAddressUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private addressTypeDefinitionService: AddressTypeDefinitionAddressUtilityService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.addressTypeDefinitionService.find(id).subscribe((addressTypeDefinition) => {
                    this.ngbModalRef = this.addressTypeDefinitionModalRef(component, addressTypeDefinition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.addressTypeDefinitionModalRef(component, new AddressTypeDefinitionAddressUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    addressTypeDefinitionModalRef(component: Component, addressTypeDefinition: AddressTypeDefinitionAddressUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.addressTypeDefinition = addressTypeDefinition;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
