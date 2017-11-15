package com.currenciesandratemanagement.app.service.mapper;

import com.currenciesandratemanagement.app.domain.*;
import com.currenciesandratemanagement.app.service.dto.CurrencyDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Currency and its DTO CurrencyDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CurrencyMapper extends EntityMapper <CurrencyDTO, Currency> {
    
    @Mapping(target = "rateFroms", ignore = true)
    @Mapping(target = "rateTos", ignore = true)
    Currency toEntity(CurrencyDTO currencyDTO); 
    default Currency fromId(Long id) {
        if (id == null) {
            return null;
        }
        Currency currency = new Currency();
        currency.setId(id);
        return currency;
    }
}
