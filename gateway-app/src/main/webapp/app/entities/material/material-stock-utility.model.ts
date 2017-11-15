import { BaseEntity } from './../../shared';

export class MaterialStockUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public warehouseId?: number,
        public creationDate?: any,
        public lotId?: number,
        public materialTypeDefinitionId?: number,
    ) {
    }
}
