import { BaseEntity } from './../../shared';

export class ThirdTypeDefinitionAddressUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public thirds?: BaseEntity[],
    ) {
    }
}
