package com.materialstockmanagement.app.service.mapper;

import com.materialstockmanagement.app.domain.*;
import com.materialstockmanagement.app.service.dto.MaterialTypeDefinitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MaterialTypeDefinition and its DTO MaterialTypeDefinitionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface MaterialTypeDefinitionMapper extends EntityMapper <MaterialTypeDefinitionDTO, MaterialTypeDefinition> {
    
    @Mapping(target = "materials", ignore = true)
    MaterialTypeDefinition toEntity(MaterialTypeDefinitionDTO materialTypeDefinitionDTO); 
    default MaterialTypeDefinition fromId(Long id) {
        if (id == null) {
            return null;
        }
        MaterialTypeDefinition materialTypeDefinition = new MaterialTypeDefinition();
        materialTypeDefinition.setId(id);
        return materialTypeDefinition;
    }
}
