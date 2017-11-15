package com.addressandthirdmanagement.app.service.mapper;

import com.addressandthirdmanagement.app.domain.*;
import com.addressandthirdmanagement.app.service.dto.AddressTypeDefinitionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AddressTypeDefinition and its DTO AddressTypeDefinitionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AddressTypeDefinitionMapper extends EntityMapper <AddressTypeDefinitionDTO, AddressTypeDefinition> {
    
    @Mapping(target = "addresses", ignore = true)
    AddressTypeDefinition toEntity(AddressTypeDefinitionDTO addressTypeDefinitionDTO); 
    default AddressTypeDefinition fromId(Long id) {
        if (id == null) {
            return null;
        }
        AddressTypeDefinition addressTypeDefinition = new AddressTypeDefinition();
        addressTypeDefinition.setId(id);
        return addressTypeDefinition;
    }
}
