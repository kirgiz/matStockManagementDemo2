import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MaterialTypeDefinitionStockUtility } from './material-type-definition-stock-utility.model';
import { MaterialTypeDefinitionStockUtilityService } from './material-type-definition-stock-utility.service';

@Injectable()
export class MaterialTypeDefinitionStockUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private materialTypeDefinitionService: MaterialTypeDefinitionStockUtilityService

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
                this.materialTypeDefinitionService.find(id).subscribe((materialTypeDefinition) => {
                    this.ngbModalRef = this.materialTypeDefinitionModalRef(component, materialTypeDefinition);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.materialTypeDefinitionModalRef(component, new MaterialTypeDefinitionStockUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    materialTypeDefinitionModalRef(component: Component, materialTypeDefinition: MaterialTypeDefinitionStockUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.materialTypeDefinition = materialTypeDefinition;
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
