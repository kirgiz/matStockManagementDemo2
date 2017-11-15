import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MaterialStockUtility } from './material-stock-utility.model';
import { MaterialStockUtilityPopupService } from './material-stock-utility-popup.service';
import { MaterialStockUtilityService } from './material-stock-utility.service';

@Component({
    selector: 'jhi-material-stock-utility-delete-dialog',
    templateUrl: './material-stock-utility-delete-dialog.component.html'
})
export class MaterialStockUtilityDeleteDialogComponent {

    material: MaterialStockUtility;

    constructor(
        private materialService: MaterialStockUtilityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.materialService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'materialListModification',
                content: 'Deleted an material'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-material-stock-utility-delete-popup',
    template: ''
})
export class MaterialStockUtilityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private materialPopupService: MaterialStockUtilityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.materialPopupService
                .open(MaterialStockUtilityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
