package com.currenciesandratemanagement.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Rate.
 */
@Entity
@Table(name = "rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "rate")
public class Rate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "factor")
    private Integer factor;

    @Column(name = "spot_rate_date")
    private LocalDate spotRateDate;

    @Column(name = "rate")
    private Double rate;

    @ManyToOne(optional = false)
    @NotNull
    private Currency currencyFrom;

    @ManyToOne(optional = false)
    @NotNull
    private Currency currencyTo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getFactor() {
        return factor;
    }

    public Rate factor(Integer factor) {
        this.factor = factor;
        return this;
    }

    public void setFactor(Integer factor) {
        this.factor = factor;
    }

    public LocalDate getSpotRateDate() {
        return spotRateDate;
    }

    public Rate spotRateDate(LocalDate spotRateDate) {
        this.spotRateDate = spotRateDate;
        return this;
    }

    public void setSpotRateDate(LocalDate spotRateDate) {
        this.spotRateDate = spotRateDate;
    }

    public Double getRate() {
        return rate;
    }

    public Rate rate(Double rate) {
        this.rate = rate;
        return this;
    }

    public void setRate(Double rate) {
        this.rate = rate;
    }

    public Currency getCurrencyFrom() {
        return currencyFrom;
    }

    public Rate currencyFrom(Currency currency) {
        this.currencyFrom = currency;
        return this;
    }

    public void setCurrencyFrom(Currency currency) {
        this.currencyFrom = currency;
    }

    public Currency getCurrencyTo() {
        return currencyTo;
    }

    public Rate currencyTo(Currency currency) {
        this.currencyTo = currency;
        return this;
    }

    public void setCurrencyTo(Currency currency) {
        this.currencyTo = currency;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rate rate = (Rate) o;
        if (rate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rate{" +
            "id=" + getId() +
            ", factor='" + getFactor() + "'" +
            ", spotRateDate='" + getSpotRateDate() + "'" +
            ", rate='" + getRate() + "'" +
            "}";
    }
}
