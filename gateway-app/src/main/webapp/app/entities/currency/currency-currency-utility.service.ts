import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CurrencyCurrencyUtility } from './currency-currency-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CurrencyCurrencyUtilityService {

    private resourceUrl = '/currenciesandratemanagement/api/currencies';
    private resourceSearchUrl = '/currenciesandratemanagement/api/_search/currencies';

    constructor(private http: Http) { }

    create(currency: CurrencyCurrencyUtility): Observable<CurrencyCurrencyUtility> {
        const copy = this.convert(currency);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(currency: CurrencyCurrencyUtility): Observable<CurrencyCurrencyUtility> {
        const copy = this.convert(currency);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CurrencyCurrencyUtility> {
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
     * Convert a returned JSON object to CurrencyCurrencyUtility.
     */
    private convertItemFromServer(json: any): CurrencyCurrencyUtility {
        const entity: CurrencyCurrencyUtility = Object.assign(new CurrencyCurrencyUtility(), json);
        return entity;
    }

    /**
     * Convert a CurrencyCurrencyUtility to a JSON which can be sent to the server.
     */
    private convert(currency: CurrencyCurrencyUtility): CurrencyCurrencyUtility {
        const copy: CurrencyCurrencyUtility = Object.assign({}, currency);
        return copy;
    }
}
