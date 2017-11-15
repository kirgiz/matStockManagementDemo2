package com.materialstockmanagement.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Lot.
 */
@Entity
@Table(name = "lot")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "lot")
public class Lot implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 10)
    @Column(name = "code", length = 10)
    private String code;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @Size(max = 60)
    @Column(name = "external_reference", length = 60)
    private String externalReference;

    @Column(name = "original_currency_id")
    private Integer originalCurrencyId;

    @Column(name = "sell_currency_id")
    private Integer sellCurrencyId;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Lob
    @Column(name = "additional_information")
    private String additionalInformation;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @OneToMany(mappedBy = "lot")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Material> materials = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public Lot code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Lot description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExternalReference() {
        return externalReference;
    }

    public Lot externalReference(String externalReference) {
        this.externalReference = externalReference;
        return this;
    }

    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
    }

    public Integer getOriginalCurrencyId() {
        return originalCurrencyId;
    }

    public Lot originalCurrencyId(Integer originalCurrencyId) {
        this.originalCurrencyId = originalCurrencyId;
        return this;
    }

    public void setOriginalCurrencyId(Integer originalCurrencyId) {
        this.originalCurrencyId = originalCurrencyId;
    }

    public Integer getSellCurrencyId() {
        return sellCurrencyId;
    }

    public Lot sellCurrencyId(Integer sellCurrencyId) {
        this.sellCurrencyId = sellCurrencyId;
        return this;
    }

    public void setSellCurrencyId(Integer sellCurrencyId) {
        this.sellCurrencyId = sellCurrencyId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Lot quantity(Integer quantity) {
        this.quantity = quantity;
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public Lot unitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
        return this;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public Lot additionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
        return this;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Lot creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Set<Material> getMaterials() {
        return materials;
    }

    public Lot materials(Set<Material> materials) {
        this.materials = materials;
        return this;
    }

    public Lot addMaterial(Material material) {
        this.materials.add(material);
        material.setLot(this);
        return this;
    }

    public Lot removeMaterial(Material material) {
        this.materials.remove(material);
        material.setLot(null);
        return this;
    }

    public void setMaterials(Set<Material> materials) {
        this.materials = materials;
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
        Lot lot = (Lot) o;
        if (lot.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lot.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Lot{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", externalReference='" + getExternalReference() + "'" +
            ", originalCurrencyId='" + getOriginalCurrencyId() + "'" +
            ", sellCurrencyId='" + getSellCurrencyId() + "'" +
            ", quantity='" + getQuantity() + "'" +
            ", unitPrice='" + getUnitPrice() + "'" +
            ", additionalInformation='" + getAdditionalInformation() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
