/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ThirdAddressUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/third/third-address-utility-detail.component';
import { ThirdAddressUtilityService } from '../../../../../../main/webapp/app/entities/third/third-address-utility.service';
import { ThirdAddressUtility } from '../../../../../../main/webapp/app/entities/third/third-address-utility.model';

describe('Component Tests', () => {

    describe('ThirdAddressUtility Management Detail Component', () => {
        let comp: ThirdAddressUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdAddressUtilityDetailComponent>;
        let service: ThirdAddressUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [ThirdAddressUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ThirdAddressUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(ThirdAddressUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdAddressUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdAddressUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ThirdAddressUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.third).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
