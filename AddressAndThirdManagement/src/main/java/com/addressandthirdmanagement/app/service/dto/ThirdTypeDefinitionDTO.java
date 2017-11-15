package com.addressandthirdmanagement.app.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the ThirdTypeDefinition entity.
 */
public class ThirdTypeDefinitionDTO implements Serializable {

    private Long id;

    @Size(max = 3)
    private String code;

    @Size(max = 200)
    private String description;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = (ThirdTypeDefinitionDTO) o;
        if(thirdTypeDefinitionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thirdTypeDefinitionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThirdTypeDefinitionDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
