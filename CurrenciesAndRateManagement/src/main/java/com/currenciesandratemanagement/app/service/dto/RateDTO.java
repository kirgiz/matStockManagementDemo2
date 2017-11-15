package com.currenciesandratemanagement.app.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Rate entity.
 */
public class RateDTO implements Serializable {

    private Long id;

    private Integer factor;

    private LocalDate spotRateDate;

    private Double rate;

    private Long currencyFromId;

    private String currencyFromIsoCode;

    private Long currencyToId;

    private String currencyToIsoCode;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFactor() {
        return factor;
    }

    public void setFactor(Integer factor) {
        this.factor = factor;
    }

    public LocalDate getSpotRateDate() {
        return spotRateDate;
    }

    public void setSpotRateDate(LocalDate spotRateDate) {
        this.spotRateDate = spotRateDate;
    }

    public Double getRate() {
        return rate;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Long getCurrencyFromId() {
        return currencyFromId;
    }

    public void setCurrencyFromId(Long currencyId) {
        this.currencyFromId = currencyId;
    }

    public String getCurrencyFromIsoCode() {
        return currencyFromIsoCode;
    }

    public void setCurrencyFromIsoCode(String currencyIsoCode) {
        this.currencyFromIsoCode = currencyIsoCode;
    }

    public Long getCurrencyToId() {
        return currencyToId;
    }

    public void setCurrencyToId(Long currencyId) {
        this.currencyToId = currencyId;
    }

    public String getCurrencyToIsoCode() {
        return currencyToIsoCode;
    }

    public void setCurrencyToIsoCode(String currencyIsoCode) {
        this.currencyToIsoCode = currencyIsoCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        RateDTO rateDTO = (RateDTO) o;
        if(rateDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rateDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RateDTO{" +
            "id=" + getId() +
            ", factor='" + getFactor() + "'" +
            ", spotRateDate='" + getSpotRateDate() + "'" +
            ", rate='" + getRate() + "'" +
            "}";
    }
}
