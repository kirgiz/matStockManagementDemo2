import { BaseEntity } from './../../shared';

export class ThirdAddressUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public addresses?: BaseEntity[],
        public thirdTypeDefinitionId?: number,
    ) {
    }
}
