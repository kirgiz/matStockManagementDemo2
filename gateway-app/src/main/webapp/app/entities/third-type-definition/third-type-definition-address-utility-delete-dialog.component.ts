import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ThirdTypeDefinitionAddressUtility } from './third-type-definition-address-utility.model';
import { ThirdTypeDefinitionAddressUtilityPopupService } from './third-type-definition-address-utility-popup.service';
import { ThirdTypeDefinitionAddressUtilityService } from './third-type-definition-address-utility.service';

@Component({
    selector: 'jhi-third-type-definition-address-utility-delete-dialog',
    templateUrl: './third-type-definition-address-utility-delete-dialog.component.html'
})
export class ThirdTypeDefinitionAddressUtilityDeleteDialogComponent {

    thirdTypeDefinition: ThirdTypeDefinitionAddressUtility;

    constructor(
        private thirdTypeDefinitionService: ThirdTypeDefinitionAddressUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.thirdTypeDefinitionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'thirdTypeDefinitionListModification',
                content: 'Deleted an thirdTypeDefinition'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-third-type-definition-address-utility-delete-popup',
    template: ''
})
export class ThirdTypeDefinitionAddressUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private thirdTypeDefinitionPopupService: ThirdTypeDefinitionAddressUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.thirdTypeDefinitionPopupService
                .open(ThirdTypeDefinitionAddressUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
