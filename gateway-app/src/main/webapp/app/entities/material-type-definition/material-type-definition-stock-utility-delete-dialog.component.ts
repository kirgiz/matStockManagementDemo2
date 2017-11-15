import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterialTypeDefinitionStockUtility } from './material-type-definition-stock-utility.model';
import { MaterialTypeDefinitionStockUtilityPopupService } from './material-type-definition-stock-utility-popup.service';
import { MaterialTypeDefinitionStockUtilityService } from './material-type-definition-stock-utility.service';

@Component({
    selector: 'jhi-material-type-definition-stock-utility-delete-dialog',
    templateUrl: './material-type-definition-stock-utility-delete-dialog.component.html'
})
export class MaterialTypeDefinitionStockUtilityDeleteDialogComponent {

    materialTypeDefinition: MaterialTypeDefinitionStockUtility;

    constructor(
        private materialTypeDefinitionService: MaterialTypeDefinitionStockUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materialTypeDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'materialTypeDefinitionListModification',
                content: 'Deleted an materialTypeDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-material-type-definition-stock-utility-delete-popup',
    template: ''
})
export class MaterialTypeDefinitionStockUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialTypeDefinitionPopupService: MaterialTypeDefinitionStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.materialTypeDefinitionPopupService
                .open(MaterialTypeDefinitionStockUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
