import { BaseEntity } from './../../shared';

export class AddressTypeDefinitionAddressUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public addresses?: BaseEntity[],
    ) {
    }
}
