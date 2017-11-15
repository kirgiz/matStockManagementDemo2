import { BaseEntity } from './../../shared';

export class CountryAddressUtility implements BaseEntity {
    constructor(
        public id?: number,
        public isoCode?: string,
        public description?: string,
        public addresses?: BaseEntity[],
    ) {
    }
}
