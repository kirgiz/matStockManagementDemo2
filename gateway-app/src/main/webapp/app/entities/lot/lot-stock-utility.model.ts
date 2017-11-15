import { BaseEntity } from './../../shared';

export class LotStockUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public externalReference?: string,
        public originalCurrencyId?: number,
        public sellCurrencyId?: number,
        public quantity?: number,
        public unitPrice?: number,
        public additionalInformation?: any,
        public creationDate?: any,
        public materials?: BaseEntity[],
    ) {
    }
}
