package com.materialstockmanagement.app.service.mapper;

import com.materialstockmanagement.app.domain.*;
import com.materialstockmanagement.app.service.dto.LotDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Lot and its DTO LotDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface LotMapper extends EntityMapper <LotDTO, Lot> {
    
    @Mapping(target = "materials", ignore = true)
    Lot toEntity(LotDTO lotDTO); 
    default Lot fromId(Long id) {
        if (id == null) {
            return null;
        }
        Lot lot = new Lot();
        lot.setId(id);
        return lot;
    }
}
