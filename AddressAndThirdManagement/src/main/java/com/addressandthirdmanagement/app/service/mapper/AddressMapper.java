package com.addressandthirdmanagement.app.service.mapper;

import com.addressandthirdmanagement.app.domain.*;
import com.addressandthirdmanagement.app.service.dto.AddressDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Address and its DTO AddressDTO.
 */
@Mapper(componentModel = "spring", uses = {AddressTypeDefinitionMapper.class, CountryMapper.class, ThirdMapper.class, })
public interface AddressMapper extends EntityMapper <AddressDTO, Address> {

    @Mapping(source = "addressTypeDefinition.id", target = "addressTypeDefinitionId")
    @Mapping(source = "addressTypeDefinition.description", target = "addressTypeDefinitionDescription")

    @Mapping(source = "country.id", target = "countryId")
    @Mapping(source = "country.isoCode", target = "countryIsoCode")

    @Mapping(source = "third.id", target = "thirdId")
    @Mapping(source = "third.description", target = "thirdDescription")
    AddressDTO toDto(Address address); 

    @Mapping(source = "addressTypeDefinitionId", target = "addressTypeDefinition")

    @Mapping(source = "countryId", target = "country")

    @Mapping(source = "thirdId", target = "third")
    Address toEntity(AddressDTO addressDTO); 
    default Address fromId(Long id) {
        if (id == null) {
            return null;
        }
        Address address = new Address();
        address.setId(id);
        return address;
    }
}
