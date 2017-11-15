import { BaseEntity } from './../../shared';

export class RateCurrencyUtility implements BaseEntity {
    constructor(
        public id?: number,
        public factor?: number,
        public spotRateDate?: any,
        public rate?: number,
        public currencyFromId?: number,
        public currencyToId?: number,
    ) {
    }
}
