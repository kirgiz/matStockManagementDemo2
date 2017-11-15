/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { LotStockUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/lot/lot-stock-utility-detail.component';
import { LotStockUtilityService } from '../../../../../../main/webapp/app/entities/lot/lot-stock-utility.service';
import { LotStockUtility } from '../../../../../../main/webapp/app/entities/lot/lot-stock-utility.model';

describe('Component Tests', () => {

    describe('LotStockUtility Management Detail Component', () => {
        let comp: LotStockUtilityDetailComponent;
        let fixture: ComponentFixture<LotStockUtilityDetailComponent>;
        let service: LotStockUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [LotStockUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    LotStockUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(LotStockUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LotStockUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LotStockUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LotStockUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.lot).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
