import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AddressAddressUtility } from './address-address-utility.model';
import { AddressAddressUtilityPopupService } from './address-address-utility-popup.service';
import { AddressAddressUtilityService } from './address-address-utility.service';
import { AddressTypeDefinitionAddressUtility, AddressTypeDefinitionAddressUtilityService } from '../address-type-definition';
import { CountryAddressUtility, CountryAddressUtilityService } from '../country';
import { ThirdAddressUtility, ThirdAddressUtilityService } from '../third';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-address-address-utility-dialog',
    templateUrl: './address-address-utility-dialog.component.html'
})
export class AddressAddressUtilityDialogComponent implements OnInit {

    address: AddressAddressUtility;
    isSaving: boolean;

    addresstypedefinitions: AddressTypeDefinitionAddressUtility[];

    countries: CountryAddressUtility[];

    thirds: ThirdAddressUtility[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressAddressUtilityService,
        private addressTypeDefinitionService: AddressTypeDefinitionAddressUtilityService,
        private countryService: CountryAddressUtilityService,
        private thirdService: ThirdAddressUtilityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.addressTypeDefinitionService.query()
            .subscribe((res: ResponseWrapper) => { this.addresstypedefinitions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.countryService.query()
            .subscribe((res: ResponseWrapper) => { this.countries = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.thirdService.query()
            .subscribe((res: ResponseWrapper) => { this.thirds = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(
                this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<AddressAddressUtility>) {
        result.subscribe((res: AddressAddressUtility) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: AddressAddressUtility) {
        this.eventManager.broadcast({ name: 'addressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAddressTypeDefinitionById(index: number, item: AddressTypeDefinitionAddressUtility) {
        return item.id;
    }

    trackCountryById(index: number, item: CountryAddressUtility) {
        return item.id;
    }

    trackThirdById(index: number, item: ThirdAddressUtility) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-address-address-utility-popup',
    template: ''
})
export class AddressAddressUtilityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressPopupService
                    .open(AddressAddressUtilityDialogComponent as Component, params['id']);
            } else {
                this.addressPopupService
                    .open(AddressAddressUtilityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
