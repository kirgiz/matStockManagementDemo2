/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MaterialTypeDefinitionStockUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/material-type-definition/material-type-definition-stock-utility-detail.component';
import { MaterialTypeDefinitionStockUtilityService } from '../../../../../../main/webapp/app/entities/material-type-definition/material-type-definition-stock-utility.service';
import { MaterialTypeDefinitionStockUtility } from '../../../../../../main/webapp/app/entities/material-type-definition/material-type-definition-stock-utility.model';

describe('Component Tests', () => {

    describe('MaterialTypeDefinitionStockUtility Management Detail Component', () => {
        let comp: MaterialTypeDefinitionStockUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialTypeDefinitionStockUtilityDetailComponent>;
        let service: MaterialTypeDefinitionStockUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [MaterialTypeDefinitionStockUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MaterialTypeDefinitionStockUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(MaterialTypeDefinitionStockUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialTypeDefinitionStockUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialTypeDefinitionStockUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MaterialTypeDefinitionStockUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.materialTypeDefinition).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
