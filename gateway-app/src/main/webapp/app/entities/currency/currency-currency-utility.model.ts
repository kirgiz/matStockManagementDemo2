import { BaseEntity } from './../../shared';

export class CurrencyCurrencyUtility implements BaseEntity {
    constructor(
        public id?: number,
        public isoCode?: string,
        public description?: string,
        public rateFroms?: BaseEntity[],
        public rateTos?: BaseEntity[],
    ) {
    }
}
