import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TransferStockUtility } from './transfer-stock-utility.model';
import { TransferStockUtilityService } from './transfer-stock-utility.service';

@Injectable()
export class TransferStockUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private transferService: TransferStockUtilityService

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
                this.transferService.find(id).subscribe((transfer) => {
                    if (transfer.creationDate) {
                        transfer.creationDate = {
                            year: transfer.creationDate.getFullYear(),
                            month: transfer.creationDate.getMonth() + 1,
                            day: transfer.creationDate.getDate()
                        };
                    }
                    if (transfer.validationDate) {
                        transfer.validationDate = {
                            year: transfer.validationDate.getFullYear(),
                            month: transfer.validationDate.getMonth() + 1,
                            day: transfer.validationDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.transferModalRef(component, transfer);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transferModalRef(component, new TransferStockUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transferModalRef(component: Component, transfer: TransferStockUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transfer = transfer;
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
