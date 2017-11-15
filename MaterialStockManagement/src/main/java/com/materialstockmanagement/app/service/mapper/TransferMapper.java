package com.materialstockmanagement.app.service.mapper;

import com.materialstockmanagement.app.domain.*;
import com.materialstockmanagement.app.service.dto.TransferDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Transfer and its DTO TransferDTO.
 */
@Mapper(componentModel = "spring", uses = {MaterialMapper.class, })
public interface TransferMapper extends EntityMapper <TransferDTO, Transfer> {
    
    
    default Transfer fromId(Long id) {
        if (id == null) {
            return null;
        }
        Transfer transfer = new Transfer();
        transfer.setId(id);
        return transfer;
    }
}
