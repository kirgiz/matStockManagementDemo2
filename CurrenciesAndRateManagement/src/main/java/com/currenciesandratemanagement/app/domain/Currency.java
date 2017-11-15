package com.currenciesandratemanagement.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Currency.
 */
@Entity
@Table(name = "currency")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "currency")
public class Currency implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 3)
    @Column(name = "iso_code", length = 3)
    private String isoCode;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @OneToMany(mappedBy = "currencyFrom")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rate> rateFroms = new HashSet<>();

    @OneToMany(mappedBy = "currencyTo")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Rate> rateTos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsoCode() {
        return isoCode;
    }

    public Currency isoCode(String isoCode) {
        this.isoCode = isoCode;
        return this;
    }

    public void setIsoCode(String isoCode) {
        this.isoCode = isoCode;
    }

    public String getDescription() {
        return description;
    }

    public Currency description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Rate> getRateFroms() {
        return rateFroms;
    }

    public Currency rateFroms(Set<Rate> rates) {
        this.rateFroms = rates;
        return this;
    }

    public Currency addRateFrom(Rate rate) {
        this.rateFroms.add(rate);
        rate.setCurrencyFrom(this);
        return this;
    }

    public Currency removeRateFrom(Rate rate) {
        this.rateFroms.remove(rate);
        rate.setCurrencyFrom(null);
        return this;
    }

    public void setRateFroms(Set<Rate> rates) {
        this.rateFroms = rates;
    }

    public Set<Rate> getRateTos() {
        return rateTos;
    }

    public Currency rateTos(Set<Rate> rates) {
        this.rateTos = rates;
        return this;
    }

    public Currency addRateTo(Rate rate) {
        this.rateTos.add(rate);
        rate.setCurrencyTo(this);
        return this;
    }

    public Currency removeRateTo(Rate rate) {
        this.rateTos.remove(rate);
        rate.setCurrencyTo(null);
        return this;
    }

    public void setRateTos(Set<Rate> rates) {
        this.rateTos = rates;
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
        Currency currency = (Currency) o;
        if (currency.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), currency.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Currency{" +
            "id=" + getId() +
            ", isoCode='" + getIsoCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
