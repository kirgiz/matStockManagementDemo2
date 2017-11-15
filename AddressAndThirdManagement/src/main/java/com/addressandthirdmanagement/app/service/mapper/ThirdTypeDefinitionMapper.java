package com.addressandthirdmanagement.app.service.mapper;

import com.addressandthirdmanagement.app.domain.*;
import com.addressandthirdmanagement.app.service.dto.ThirdTypeDefinitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ThirdTypeDefinition and its DTO ThirdTypeDefinitionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ThirdTypeDefinitionMapper extends EntityMapper <ThirdTypeDefinitionDTO, ThirdTypeDefinition> {
    
    @Mapping(target = "thirds", ignore = true)
    ThirdTypeDefinition toEntity(ThirdTypeDefinitionDTO thirdTypeDefinitionDTO); 
    default ThirdTypeDefinition fromId(Long id) {
        if (id == null) {
            return null;
        }
        ThirdTypeDefinition thirdTypeDefinition = new ThirdTypeDefinition();
        thirdTypeDefinition.setId(id);
        return thirdTypeDefinition;
    }
}
