import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ThirdAddressUtility } from './third-address-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ThirdAddressUtilityService {

    private resourceUrl = '/addressandthirdmanagement/api/thirds';
    private resourceSearchUrl = '/addressandthirdmanagement/api/_search/thirds';

    constructor(private http: Http) { }

    create(third: ThirdAddressUtility): Observable<ThirdAddressUtility> {
        const copy = this.convert(third);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(third: ThirdAddressUtility): Observable<ThirdAddressUtility> {
        const copy = this.convert(third);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ThirdAddressUtility> {
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
     * Convert a returned JSON object to ThirdAddressUtility.
     */
    private convertItemFromServer(json: any): ThirdAddressUtility {
        const entity: ThirdAddressUtility = Object.assign(new ThirdAddressUtility(), json);
        return entity;
    }

    /**
     * Convert a ThirdAddressUtility to a JSON which can be sent to the server.
     */
    private convert(third: ThirdAddressUtility): ThirdAddressUtility {
        const copy: ThirdAddressUtility = Object.assign({}, third);
        return copy;
    }
}
