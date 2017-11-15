import { BaseEntity } from './../../shared';

export class AddressAddressUtility implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public addressLine3?: string,
        public city?: string,
        public zipCode?: string,
        public type?: string,
        public addressTypeDefinitionId?: number,
        public countryId?: number,
        public thirdId?: number,
    ) {
    }
}
