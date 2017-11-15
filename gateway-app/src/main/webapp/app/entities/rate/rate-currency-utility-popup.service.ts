import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RateCurrencyUtility } from './rate-currency-utility.model';
import { RateCurrencyUtilityService } from './rate-currency-utility.service';

@Injectable()
export class RateCurrencyUtilityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private rateService: RateCurrencyUtilityService

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
                this.rateService.find(id).subscribe((rate) => {
                    if (rate.spotRateDate) {
                        rate.spotRateDate = {
                            year: rate.spotRateDate.getFullYear(),
                            month: rate.spotRateDate.getMonth() + 1,
                            day: rate.spotRateDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.rateModalRef(component, rate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateModalRef(component, new RateCurrencyUtility());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateModalRef(component: Component, rate: RateCurrencyUtility): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.rate = rate;
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
