import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ThirdTypeDefinitionAddressUtility } from './third-type-definition-address-utility.model';
import { ThirdTypeDefinitionAddressUtilityService } from './third-type-definition-address-utility.service';

@Injectable()
export class ThirdTypeDefinitionAddressUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private thirdTypeDefinitionService: ThirdTypeDefinitionAddressUtilityService

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
                this.thirdTypeDefinitionService.find(id).subscribe((thirdTypeDefinition) => {
                    this.ngbModalRef = this.thirdTypeDefinitionModalRef(component, thirdTypeDefinition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.thirdTypeDefinitionModalRef(component, new ThirdTypeDefinitionAddressUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    thirdTypeDefinitionModalRef(component: Component, thirdTypeDefinition: ThirdTypeDefinitionAddressUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.thirdTypeDefinition = thirdTypeDefinition;
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
