import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { LotStockUtility } from './lot-stock-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class LotStockUtilityService {

    private resourceUrl = '/materialstockmanagement/api/lots';
    private resourceSearchUrl = '/materialstockmanagement/api/_search/lots';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(lot: LotStockUtility): Observable<LotStockUtility> {
        const copy = this.convert(lot);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(lot: LotStockUtility): Observable<LotStockUtility> {
        const copy = this.convert(lot);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<LotStockUtility> {
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
     * Convert a returned JSON object to LotStockUtility.
     */
    private convertItemFromServer(json: any): LotStockUtility {
        const entity: LotStockUtility = Object.assign(new LotStockUtility(), json);
        entity.creationDate = this.dateUtils
            .convertLocalDateFromServer(json.creationDate);
        return entity;
    }

    /**
     * Convert a LotStockUtility to a JSON which can be sent to the server.
     */
    private convert(lot: LotStockUtility): LotStockUtility {
        const copy: LotStockUtility = Object.assign({}, lot);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(lot.creationDate);
        return copy;
    }
}
