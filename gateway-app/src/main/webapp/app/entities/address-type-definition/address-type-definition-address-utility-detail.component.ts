import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { AddressTypeDefinitionAddressUtility } from './address-type-definition-address-utility.model';
import { AddressTypeDefinitionAddressUtilityService } from './address-type-definition-address-utility.service';

@Component({
    selector: 'jhi-address-type-definition-address-utility-detail',
    templateUrl: './address-type-definition-address-utility-detail.component.html'
})
export class AddressTypeDefinitionAddressUtilityDetailComponent implements OnInit, OnDestroy {

    addressTypeDefinition: AddressTypeDefinitionAddressUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private addressTypeDefinitionService: AddressTypeDefinitionAddressUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAddressTypeDefinitions();
    }

    load(id) {
        this.addressTypeDefinitionService.find(id).subscribe((addressTypeDefinition) => {
            this.addressTypeDefinition = addressTypeDefinition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAddressTypeDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'addressTypeDefinitionListModification',
            (response) => this.load(this.addressTypeDefinition.id)
        );
    }
}
