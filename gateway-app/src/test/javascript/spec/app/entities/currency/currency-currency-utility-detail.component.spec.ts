/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CurrencyCurrencyUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/currency/currency-currency-utility-detail.component';
import { CurrencyCurrencyUtilityService } from '../../../../../../main/webapp/app/entities/currency/currency-currency-utility.service';
import { CurrencyCurrencyUtility } from '../../../../../../main/webapp/app/entities/currency/currency-currency-utility.model';

describe('Component Tests', () => {

    describe('CurrencyCurrencyUtility Management Detail Component', () => {
        let comp: CurrencyCurrencyUtilityDetailComponent;
        let fixture: ComponentFixture<CurrencyCurrencyUtilityDetailComponent>;
        let service: CurrencyCurrencyUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [CurrencyCurrencyUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CurrencyCurrencyUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(CurrencyCurrencyUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CurrencyCurrencyUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CurrencyCurrencyUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CurrencyCurrencyUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.currency).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
