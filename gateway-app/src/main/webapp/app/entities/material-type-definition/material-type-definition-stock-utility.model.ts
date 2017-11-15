import { BaseEntity } from './../../shared';

export class MaterialTypeDefinitionStockUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public materials?: BaseEntity[],
    ) {
    }
}
