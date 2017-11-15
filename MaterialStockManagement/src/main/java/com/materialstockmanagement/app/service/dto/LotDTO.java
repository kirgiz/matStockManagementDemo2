package com.materialstockmanagement.app.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Lot entity.
 */
public class LotDTO implements Serializable {

    private Long id;

    @Size(max = 10)
    private String code;

    @Size(max = 200)
    private String description;

    @Size(max = 60)
    private String externalReference;

    private Integer originalCurrencyId;

    private Integer sellCurrencyId;

    private Integer quantity;

    private Double unitPrice;

    @Lob
    private String additionalInformation;

    private LocalDate creationDate;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExternalReference() {
        return externalReference;
    }

    public void setExternalReference(String externalReference) {
        this.externalReference = externalReference;
    }

    public Integer getOriginalCurrencyId() {
        return originalCurrencyId;
    }

    public void setOriginalCurrencyId(Integer originalCurrencyId) {
        this.originalCurrencyId = originalCurrencyId;
    }

    public Integer getSellCurrencyId() {
        return sellCurrencyId;
    }

    public void setSellCurrencyId(Integer sellCurrencyId) {
        this.sellCurrencyId = sellCurrencyId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(Double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        LotDTO lotDTO = (LotDTO) o;
        if(lotDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), lotDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "LotDTO{" +
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
