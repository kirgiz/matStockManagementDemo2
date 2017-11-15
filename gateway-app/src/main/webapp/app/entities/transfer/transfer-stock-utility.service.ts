import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { JhiDateUtils } from 'ng-jhipster';

import { TransferStockUtility } from './transfer-stock-utility.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TransferStockUtilityService {

    private resourceUrl = '/materialstockmanagement/api/transfers';
    private resourceSearchUrl = '/materialstockmanagement/api/_search/transfers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(transfer: TransferStockUtility): Observable<TransferStockUtility> {
        const copy = this.convert(transfer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(transfer: TransferStockUtility): Observable<TransferStockUtility> {
        const copy = this.convert(transfer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TransferStockUtility> {
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
     * Convert a returned JSON object to TransferStockUtility.
     */
    private convertItemFromServer(json: any): TransferStockUtility {
        const entity: TransferStockUtility = Object.assign(new TransferStockUtility(), json);
        entity.creationDate = this.dateUtils
            .convertLocalDateFromServer(json.creationDate);
        entity.validationDate = this.dateUtils
            .convertLocalDateFromServer(json.validationDate);
        return entity;
    }

    /**
     * Convert a TransferStockUtility to a JSON which can be sent to the server.
     */
    private convert(transfer: TransferStockUtility): TransferStockUtility {
        const copy: TransferStockUtility = Object.assign({}, transfer);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(transfer.creationDate);
        copy.validationDate = this.dateUtils
            .convertLocalDateToServer(transfer.validationDate);
        return copy;
    }
}
