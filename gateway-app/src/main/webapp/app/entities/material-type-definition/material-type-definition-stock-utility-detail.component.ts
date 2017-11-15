import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { MaterialTypeDefinitionStockUtility } from './material-type-definition-stock-utility.model';
import { MaterialTypeDefinitionStockUtilityService } from './material-type-definition-stock-utility.service';

@Component({
    selector: 'jhi-material-type-definition-stock-utility-detail',
    templateUrl: './material-type-definition-stock-utility-detail.component.html'
})
export class MaterialTypeDefinitionStockUtilityDetailComponent implements OnInit, OnDestroy {

    materialTypeDefinition: MaterialTypeDefinitionStockUtility;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private materialTypeDefinitionService: MaterialTypeDefinitionStockUtilityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMaterialTypeDefinitions();
    }

    load(id) {
        this.materialTypeDefinitionService.find(id).subscribe((materialTypeDefinition) => {
            this.materialTypeDefinition = materialTypeDefinition;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMaterialTypeDefinitions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'materialTypeDefinitionListModification',
            (response) => this.load(this.materialTypeDefinition.id)
        );
    }
}
