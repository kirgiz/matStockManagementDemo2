import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { CountryAddressUtility } from './country-address-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CountryAddressUtilityService {

    private resourceUrl = '/addressandthirdmanagement/api/countries';
    private resourceSearchUrl = '/addressandthirdmanagement/api/_search/countries';

    constructor(private http: Http) { }

    create(country: CountryAddressUtility): Observable<CountryAddressUtility> {
        const copy = this.convert(country);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(country: CountryAddressUtility): Observable<CountryAddressUtility> {
        const copy = this.convert(country);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CountryAddressUtility> {
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
     * Convert a returned JSON object to CountryAddressUtility.
     */
    private convertItemFromServer(json: any): CountryAddressUtility {
        const entity: CountryAddressUtility = Object.assign(new CountryAddressUtility(), json);
        return entity;
    }

    /**
     * Convert a CountryAddressUtility to a JSON which can be sent to the server.
     */
    private convert(country: CountryAddressUtility): CountryAddressUtility {
        const copy: CountryAddressUtility = Object.assign({}, country);
        return copy;
    }
}
