/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressAddressUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/address/address-address-utility-detail.component';
import { AddressAddressUtilityService } from '../../../../../../main/webapp/app/entities/address/address-address-utility.service';
import { AddressAddressUtility } from '../../../../../../main/webapp/app/entities/address/address-address-utility.model';

describe('Component Tests', () => {

    describe('AddressAddressUtility Management Detail Component', () => {
        let comp: AddressAddressUtilityDetailComponent;
        let fixture: ComponentFixture<AddressAddressUtilityDetailComponent>;
        let service: AddressAddressUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [AddressAddressUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressAddressUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressAddressUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressAddressUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressAddressUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressAddressUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.address).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
