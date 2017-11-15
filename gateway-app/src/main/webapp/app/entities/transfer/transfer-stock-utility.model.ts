import { BaseEntity } from './../../shared';

export class TransferStockUtility implements BaseEntity {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public warehouseFromId?: number,
        public warehouseToId?: number,
        public creationDate?: any,
        public validationDate?: any,
        public userId?: number,
        public itemTransfereds?: BaseEntity[],
    ) {
    }
}
