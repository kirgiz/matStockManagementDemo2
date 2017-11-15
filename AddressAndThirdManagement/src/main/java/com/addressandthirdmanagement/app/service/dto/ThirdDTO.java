package com.addressandthirdmanagement.app.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Third entity.
 */
public class ThirdDTO implements Serializable {

    private Long id;

    @Size(max = 3)
    private String code;

    @Size(max = 200)
    private String description;

    private Long thirdTypeDefinitionId;

    private String thirdTypeDefinitionDescription;

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

    public Long getThirdTypeDefinitionId() {
        return thirdTypeDefinitionId;
    }

    public void setThirdTypeDefinitionId(Long thirdTypeDefinitionId) {
        this.thirdTypeDefinitionId = thirdTypeDefinitionId;
    }

    public String getThirdTypeDefinitionDescription() {
        return thirdTypeDefinitionDescription;
    }

    public void setThirdTypeDefinitionDescription(String thirdTypeDefinitionDescription) {
        this.thirdTypeDefinitionDescription = thirdTypeDefinitionDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ThirdDTO thirdDTO = (ThirdDTO) o;
        if(thirdDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thirdDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThirdDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
