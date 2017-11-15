/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ThirdTypeDefinitionAddressUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/third-type-definition/third-type-definition-address-utility-detail.component';
import { ThirdTypeDefinitionAddressUtilityService } from '../../../../../../main/webapp/app/entities/third-type-definition/third-type-definition-address-utility.service';
import { ThirdTypeDefinitionAddressUtility } from '../../../../../../main/webapp/app/entities/third-type-definition/third-type-definition-address-utility.model';

describe('Component Tests', () => {

    describe('ThirdTypeDefinitionAddressUtility Management Detail Component', () => {
        let comp: ThirdTypeDefinitionAddressUtilityDetailComponent;
        let fixture: ComponentFixture<ThirdTypeDefinitionAddressUtilityDetailComponent>;
        let service: ThirdTypeDefinitionAddressUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [ThirdTypeDefinitionAddressUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    ThirdTypeDefinitionAddressUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(ThirdTypeDefinitionAddressUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ThirdTypeDefinitionAddressUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ThirdTypeDefinitionAddressUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ThirdTypeDefinitionAddressUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.thirdTypeDefinition).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
