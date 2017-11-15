import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { ThirdTypeDefinitionAddressUtility } from './third-type-definition-address-utility.model';
import { ThirdTypeDefinitionAddressUtilityService } from './third-type-definition-address-utility.service';

@Component({
    selector: 'jhi-third-type-definition-address-utility-detail',
    templateUrl: './third-type-definition-address-utility-detail.component.html'
})
export class ThirdTypeDefinitionAddressUtilityDetailComponent implements OnInit, OnDestroy {

    thirdTypeDefinition: ThirdTypeDefinitionAddressUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private thirdTypeDefinitionService: ThirdTypeDefinitionAddressUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInThirdTypeDefinitions();
    }

    load(id) {
        this.thirdTypeDefinitionService.find(id).subscribe((thirdTypeDefinition) => {
            this.thirdTypeDefinition = thirdTypeDefinition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInThirdTypeDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'thirdTypeDefinitionListModification',
            (response) => this.load(this.thirdTypeDefinition.id)
        );
    }
}
