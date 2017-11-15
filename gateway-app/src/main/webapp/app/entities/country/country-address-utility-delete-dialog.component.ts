import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CountryAddressUtility } from './country-address-utility.model';
import { CountryAddressUtilityPopupService } from './country-address-utility-popup.service';
import { CountryAddressUtilityService } from './country-address-utility.service';

@Component({
    selector: 'jhi-country-address-utility-delete-dialog',
    templateUrl: './country-address-utility-delete-dialog.component.html'
})
export class CountryAddressUtilityDeleteDialogComponent {

    country: CountryAddressUtility;

    constructor(
        private countryService: CountryAddressUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.countryService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'countryListModification',
                content: 'Deleted an country'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-country-address-utility-delete-popup',
    template: ''
})
export class CountryAddressUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private countryPopupService: CountryAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.countryPopupService
                .open(CountryAddressUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
