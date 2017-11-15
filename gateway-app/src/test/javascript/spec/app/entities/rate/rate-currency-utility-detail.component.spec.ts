/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { RateCurrencyUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/rate/rate-currency-utility-detail.component';
import { RateCurrencyUtilityService } from '../../../../../../main/webapp/app/entities/rate/rate-currency-utility.service';
import { RateCurrencyUtility } from '../../../../../../main/webapp/app/entities/rate/rate-currency-utility.model';

describe('Component Tests', () => {

    describe('RateCurrencyUtility Management Detail Component', () => {
        let comp: RateCurrencyUtilityDetailComponent;
        let fixture: ComponentFixture<RateCurrencyUtilityDetailComponent>;
        let service: RateCurrencyUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [RateCurrencyUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    RateCurrencyUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(RateCurrencyUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RateCurrencyUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RateCurrencyUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RateCurrencyUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rate).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
