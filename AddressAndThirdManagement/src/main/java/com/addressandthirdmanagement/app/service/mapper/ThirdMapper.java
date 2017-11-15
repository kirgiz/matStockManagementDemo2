package com.addressandthirdmanagement.app.service.mapper;

import com.addressandthirdmanagement.app.domain.*;
import com.addressandthirdmanagement.app.service.dto.ThirdDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Third and its DTO ThirdDTO.
 */
@Mapper(componentModel = "spring", uses = {ThirdTypeDefinitionMapper.class, })
public interface ThirdMapper extends EntityMapper <ThirdDTO, Third> {

    @Mapping(source = "thirdTypeDefinition.id", target = "thirdTypeDefinitionId")
    @Mapping(source = "thirdTypeDefinition.description", target = "thirdTypeDefinitionDescription")
    ThirdDTO toDto(Third third); 
    @Mapping(target = "addresses", ignore = true)

    @Mapping(source = "thirdTypeDefinitionId", target = "thirdTypeDefinition")
    Third toEntity(ThirdDTO thirdDTO); 
    default Third fromId(Long id) {
        if (id == null) {
            return null;
        }
        Third third = new Third();
        third.setId(id);
        return third;
    }
}
