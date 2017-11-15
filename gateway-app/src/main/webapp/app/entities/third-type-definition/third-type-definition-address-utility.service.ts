import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { ThirdTypeDefinitionAddressUtility } from './third-type-definition-address-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ThirdTypeDefinitionAddressUtilityService {

    private resourceUrl = '/addressandthirdmanagement/api/third-type-definitions';
    private resourceSearchUrl = '/addressandthirdmanagement/api/_search/third-type-definitions';

    constructor(private http: Http) { }

    create(thirdTypeDefinition: ThirdTypeDefinitionAddressUtility):
        Observable<ThirdTypeDefinitionAddressUtility> {
        const copy = this.convert(thirdTypeDefinition);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(thirdTypeDefinition: ThirdTypeDefinitionAddressUtility):
        Observable<ThirdTypeDefinitionAddressUtility> {
        const copy = this.convert(thirdTypeDefinition);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ThirdTypeDefinitionAddressUtility> {
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
     * Convert a returned JSON object to ThirdTypeDefinitionAddressUtility.
     */
    private convertItemFromServer(json: any): ThirdTypeDefinitionAddressUtility {
        const entity: ThirdTypeDefinitionAddressUtility = Object.assign(new ThirdTypeDefinitionAddressUtility(), json);
        return entity;
    }

    /**
     * Convert a ThirdTypeDefinitionAddressUtility to a JSON which can be sent to the server.
     */
    private convert(thirdTypeDefinition: ThirdTypeDefinitionAddressUtility): ThirdTypeDefinitionAddressUtility {
        const copy: ThirdTypeDefinitionAddressUtility = Object.assign({}, thirdTypeDefinition);
        return copy;
    }
}
