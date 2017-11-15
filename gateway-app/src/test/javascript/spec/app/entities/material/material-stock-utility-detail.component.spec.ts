/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { StockManagementTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { MaterialStockUtilityDetailComponent } from '../../../../../../main/webapp/app/entities/material/material-stock-utility-detail.component';
import { MaterialStockUtilityService } from '../../../../../../main/webapp/app/entities/material/material-stock-utility.service';
import { MaterialStockUtility } from '../../../../../../main/webapp/app/entities/material/material-stock-utility.model';

describe('Component Tests', () => {

    describe('MaterialStockUtility Management Detail Component', () => {
        let comp: MaterialStockUtilityDetailComponent;
        let fixture: ComponentFixture<MaterialStockUtilityDetailComponent>;
        let service: MaterialStockUtilityService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [StockManagementTestModule],
                declarations: [MaterialStockUtilityDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    MaterialStockUtilityService,
                    JhiEventManager
                ]
            }).overrideTemplate(MaterialStockUtilityDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MaterialStockUtilityDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MaterialStockUtilityService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MaterialStockUtility(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.material).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
