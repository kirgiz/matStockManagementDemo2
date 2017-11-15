/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { TransferStockUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/transfer/transfer-stock-utility-detail.component';
import { TransferStockUtilityService } from '../../../../../../main/webapp/app/entities/transfer/transfer-stock-utility.service';
import { TransferStockUtility } from '../../../../../../main/webapp/app/entities/transfer/transfer-stock-utility.model';

describe('Component Tests', () => {

    describe('TransferStockUtility Management Detail Component', () => {
        let comp: TransferStockUtilityDetailComponent;
        let fixture: ComponentFixture<TransferStockUtilityDetailComponent>;
        let service: TransferStockUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [TransferStockUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    TransferStockUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(TransferStockUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TransferStockUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransferStockUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TransferStockUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.transfer).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
