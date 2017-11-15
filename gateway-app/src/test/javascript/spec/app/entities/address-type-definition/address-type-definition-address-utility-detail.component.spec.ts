/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { AddressTypeDefinitionAddressUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/address-type-definition/address-type-definition-address-utility-detail.component';
import { AddressTypeDefinitionAddressUtilityService } from '../../../../../../main/webapp/app/entities/address-type-definition/address-type-definition-address-utility.service';
import { AddressTypeDefinitionAddressUtility } from '../../../../../../main/webapp/app/entities/address-type-definition/address-type-definition-address-utility.model';

describe('Component Tests', () => {

    describe('AddressTypeDefinitionAddressUtility Management Detail Component', () => {
        let comp: AddressTypeDefinitionAddressUtilityDetailComponent;
        let fixture: ComponentFixture<AddressTypeDefinitionAddressUtilityDetailComponent>;
        let service: AddressTypeDefinitionAddressUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [AddressTypeDefinitionAddressUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    AddressTypeDefinitionAddressUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(AddressTypeDefinitionAddressUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeDefinitionAddressUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeDefinitionAddressUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new AddressTypeDefinitionAddressUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.addressTypeDefinition).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
