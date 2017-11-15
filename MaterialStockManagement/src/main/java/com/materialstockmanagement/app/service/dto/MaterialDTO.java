package com.materialstockmanagement.app.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Material entity.
 */
public class MaterialDTO implements Serializable {

    private Long id;

    @Size(max = 10)
    private String code;

    @Size(max = 200)
    private String description;

    private Integer warehouseId;

    private LocalDate creationDate;

    private Long lotId;

    private String lotCode;

    private Long materialTypeDefinitionId;

    private String materialTypeDefinitionCode;

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

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Long getLotId() {
        return lotId;
    }

    public void setLotId(Long lotId) {
        this.lotId = lotId;
    }

    public String getLotCode() {
        return lotCode;
    }

    public void setLotCode(String lotCode) {
        this.lotCode = lotCode;
    }

    public Long getMaterialTypeDefinitionId() {
        return materialTypeDefinitionId;
    }

    public void setMaterialTypeDefinitionId(Long materialTypeDefinitionId) {
        this.materialTypeDefinitionId = materialTypeDefinitionId;
    }

    public String getMaterialTypeDefinitionCode() {
        return materialTypeDefinitionCode;
    }

    public void setMaterialTypeDefinitionCode(String materialTypeDefinitionCode) {
        this.materialTypeDefinitionCode = materialTypeDefinitionCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MaterialDTO materialDTO = (MaterialDTO) o;
        if(materialDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), materialDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MaterialDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", warehouseId='" + getWarehouseId() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
