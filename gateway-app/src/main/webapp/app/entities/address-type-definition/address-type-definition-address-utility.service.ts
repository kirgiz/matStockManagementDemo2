import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AddressTypeDefinitionAddressUtility } from './address-type-definition-address-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AddressTypeDefinitionAddressUtilityService {

    private resourceUrl = '/addressandthirdmanagement/api/address-type-definitions';
    private resourceSearchUrl = '/addressandthirdmanagement/api/_search/address-type-definitions';

    constructor(private http: Http) { }

    create(addressTypeDefinition: AddressTypeDefinitionAddressUtility):
        Observable<AddressTypeDefinitionAddressUtility> {
        const copy = this.convert(addressTypeDefinition);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(addressTypeDefinition: AddressTypeDefinitionAddressUtility):
        Observable<AddressTypeDefinitionAddressUtility> {
        const copy = this.convert(addressTypeDefinition);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AddressTypeDefinitionAddressUtility> {
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
     * Convert a returned JSON object to AddressTypeDefinitionAddressUtility.
     */
    private convertItemFromServer(json: any): AddressTypeDefinitionAddressUtility {
        const entity: AddressTypeDefinitionAddressUtility = Object.assign(new AddressTypeDefinitionAddressUtility(), json);
        return entity;
    }

    /**
     * Convert a AddressTypeDefinitionAddressUtility to a JSON which can be sent to the server.
     */
    private convert(addressTypeDefinition: AddressTypeDefinitionAddressUtility): AddressTypeDefinitionAddressUtility {
        const copy: AddressTypeDefinitionAddressUtility = Object.assign({}, addressTypeDefinition);
        return copy;
    }
}
