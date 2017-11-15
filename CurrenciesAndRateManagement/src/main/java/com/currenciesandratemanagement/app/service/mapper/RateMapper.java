package com.currenciesandratemanagement.app.service.mapper;

import com.currenciesandratemanagement.app.domain.*;
import com.currenciesandratemanagement.app.service.dto.RateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rate and its DTO RateDTO.
 */
@Mapper(componentModel = "spring", uses = {CurrencyMapper.class, })
public interface RateMapper extends EntityMapper <RateDTO, Rate> {

    @Mapping(source = "currencyFrom.id", target = "currencyFromId")
    @Mapping(source = "currencyFrom.isoCode", target = "currencyFromIsoCode")

    @Mapping(source = "currencyTo.id", target = "currencyToId")
    @Mapping(source = "currencyTo.isoCode", target = "currencyToIsoCode")
    RateDTO toDto(Rate rate); 

    @Mapping(source = "currencyFromId", target = "currencyFrom")

    @Mapping(source = "currencyToId", target = "currencyTo")
    Rate toEntity(RateDTO rateDTO); 
    default Rate fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rate rate = new Rate();
        rate.setId(id);
        return rate;
    }
}
