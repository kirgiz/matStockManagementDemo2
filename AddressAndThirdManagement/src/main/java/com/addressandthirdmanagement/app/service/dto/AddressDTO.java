package com.addressandthirdmanagement.app.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Address entity.
 */
public class AddressDTO implements Serializable {

    private Long id;

    @Size(max = 200)
    private String description;

    @Size(max = 60)
    private String addressLine1;

    @Size(max = 60)
    private String addressLine2;

    @Size(max = 60)
    private String addressLine3;

    @Size(max = 60)
    private String city;

    @Size(max = 20)
    private String zipCode;

    @Size(max = 3)
    private String type;

    private Long addressTypeDefinitionId;

    private String addressTypeDefinitionDescription;

    private Long countryId;

    private String countryIsoCode;

    private Long thirdId;

    private String thirdDescription;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddressLine1() {
        return addressLine1;
    }

    public void setAddressLine1(String addressLine1) {
        this.addressLine1 = addressLine1;
    }

    public String getAddressLine2() {
        return addressLine2;
    }

    public void setAddressLine2(String addressLine2) {
        this.addressLine2 = addressLine2;
    }

    public String getAddressLine3() {
        return addressLine3;
    }

    public void setAddressLine3(String addressLine3) {
        this.addressLine3 = addressLine3;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getAddressTypeDefinitionId() {
        return addressTypeDefinitionId;
    }

    public void setAddressTypeDefinitionId(Long addressTypeDefinitionId) {
        this.addressTypeDefinitionId = addressTypeDefinitionId;
    }

    public String getAddressTypeDefinitionDescription() {
        return addressTypeDefinitionDescription;
    }

    public void setAddressTypeDefinitionDescription(String addressTypeDefinitionDescription) {
        this.addressTypeDefinitionDescription = addressTypeDefinitionDescription;
    }

    public Long getCountryId() {
        return countryId;
    }

    public void setCountryId(Long countryId) {
        this.countryId = countryId;
    }

    public String getCountryIsoCode() {
        return countryIsoCode;
    }

    public void setCountryIsoCode(String countryIsoCode) {
        this.countryIsoCode = countryIsoCode;
    }

    public Long getThirdId() {
        return thirdId;
    }

    public void setThirdId(Long thirdId) {
        this.thirdId = thirdId;
    }

    public String getThirdDescription() {
        return thirdDescription;
    }

    public void setThirdDescription(String thirdDescription) {
        this.thirdDescription = thirdDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AddressDTO addressDTO = (AddressDTO) o;
        if(addressDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), addressDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AddressDTO{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", addressLine1='" + getAddressLine1() + "'" +
            ", addressLine2='" + getAddressLine2() + "'" +
            ", addressLine3='" + getAddressLine3() + "'" +
            ", city='" + getCity() + "'" +
            ", zipCode='" + getZipCode() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}
