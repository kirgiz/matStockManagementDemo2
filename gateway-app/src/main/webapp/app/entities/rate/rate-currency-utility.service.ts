import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { RateCurrencyUtility } from './rate-currency-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RateCurrencyUtilityService {

    private resourceUrl = '/currenciesandratemanagement/api/rates';
    private resourceSearchUrl = '/currenciesandratemanagement/api/_search/rates';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rate: RateCurrencyUtility): Observable<RateCurrencyUtility> {
        const copy = this.convert(rate);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rate: RateCurrencyUtility): Observable<RateCurrencyUtility> {
        const copy = this.convert(rate);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RateCurrencyUtility> {
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
     * Convert a returned JSON object to RateCurrencyUtility.
     */
    private convertItemFromServer(json: any): RateCurrencyUtility {
        const entity: RateCurrencyUtility = Object.assign(new RateCurrencyUtility(), json);
        entity.spotRateDate = this.dateUtils
            .convertLocalDateFromServer(json.spotRateDate);
        return entity;
    }

    /**
     * Convert a RateCurrencyUtility to a JSON which can be sent to the server.
     */
    private convert(rate: RateCurrencyUtility): RateCurrencyUtility {
        const copy: RateCurrencyUtility = Object.assign({}, rate);
        copy.spotRateDate = this.dateUtils
            .convertLocalDateToServer(rate.spotRateDate);
        return copy;
    }
}
