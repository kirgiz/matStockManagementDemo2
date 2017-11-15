/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { CountryAddressUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/country/country-address-utility-detail.component';
import { CountryAddressUtilityService } from '../../../../../../main/webapp/app/entities/country/country-address-utility.service';
import { CountryAddressUtility } from '../../../../../../main/webapp/app/entities/country/country-address-utility.model';

describe('Component Tests', () => {

    describe('CountryAddressUtility Management Detail Component', () => {
        let comp: CountryAddressUtilityDetailComponent;
        let fixture: ComponentFixture<CountryAddressUtilityDetailComponent>;
        let service: CountryAddressUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [CountryAddressUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    CountryAddressUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(CountryAddressUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CountryAddressUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CountryAddressUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new CountryAddressUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.country).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
