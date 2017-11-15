import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { MaterialStockUtility } from './material-stock-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class MaterialStockUtilityService {

    private resourceUrl = '/materialstockmanagement/api/materials';
    private resourceSearchUrl = '/materialstockmanagement/api/_search/materials';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(material: MaterialStockUtility): Observable<MaterialStockUtility> {
        const copy = this.convert(material);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(material: MaterialStockUtility): Observable<MaterialStockUtility> {
        const copy = this.convert(material);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<MaterialStockUtility> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to MaterialStockUtility.
     */
    private convertItemFromServer(json: any): MaterialStockUtility {
        const entity: MaterialStockUtility = Object.assign(new MaterialStockUtility(), json);
        entity.creationDate = this.dateUtils
            .convertLocalDateFromServer(json.creationDate);
        return entity;
    }

    /**
     * Convert a MaterialStockUtility to a JSON which can be sent to the server.
     */
    private convert(material: MaterialStockUtility): MaterialStockUtility {
        const copy: MaterialStockUtility = Object.assign({}, material);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(material.creationDate);
        return copy;
    }
}
