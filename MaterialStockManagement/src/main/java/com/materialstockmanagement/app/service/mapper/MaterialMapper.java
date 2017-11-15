package com.materialstockmanagement.app.service.mapper;

import com.materialstockmanagement.app.domain.*;
import com.materialstockmanagement.app.service.dto.MaterialDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Material and its DTO MaterialDTO.
 */
@Mapper(componentModel = "spring", uses = {LotMapper.class, MaterialTypeDefinitionMapper.class, })
public interface MaterialMapper extends EntityMapper <MaterialDTO, Material> {

    @Mapping(source = "lot.id", target = "lotId")
    @Mapping(source = "lot.code", target = "lotCode")

    @Mapping(source = "materialTypeDefinition.id", target = "materialTypeDefinitionId")
    @Mapping(source = "materialTypeDefinition.code", target = "materialTypeDefinitionCode")
    MaterialDTO toDto(Material material); 

    @Mapping(source = "lotId", target = "lot")

    @Mapping(source = "materialTypeDefinitionId", target = "materialTypeDefinition")
    Material toEntity(MaterialDTO materialDTO); 
    default Material fromId(Long id) {
        if (id == null) {
            return null;
        }
        Material material = new Material();
        material.setId(id);
        return material;
    }
}
