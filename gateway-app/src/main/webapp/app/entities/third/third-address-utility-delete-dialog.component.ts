import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ThirdAddressUtility } from './third-address-utility.model';
import { ThirdAddressUtilityPopupService } from './third-address-utility-popup.service';
import { ThirdAddressUtilityService } from './third-address-utility.service';

@Component({
    selector: 'jhi-third-address-utility-delete-dialog',
    templateUrl: './third-address-utility-delete-dialog.component.html'
})
export class ThirdAddressUtilityDeleteDialogComponent {

    third: ThirdAddressUtility;

    constructor(
        private thirdService: ThirdAddressUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thirdService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'thirdListModification',
                content: 'Deleted an third'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-third-address-utility-delete-popup',
    template: ''
})
export class ThirdAddressUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thirdPopupService: ThirdAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.thirdPopupService
                .open(ThirdAddressUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
