package com.materialstockmanagement.app.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Transfer entity.
 */
public class TransferDTO implements Serializable {

    private Long id;

    @Size(max = 10)
    private String code;

    @Size(max = 200)
    private String description;

    private Integer warehouseFromId;

    private Integer warehouseToId;

    private LocalDate creationDate;

    private LocalDate validationDate;

    private Integer userId;

    private Set<MaterialDTO> itemTransfereds = new HashSet<>();

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

    public Integer getWarehouseFromId() {
        return warehouseFromId;
    }

    public void setWarehouseFromId(Integer warehouseFromId) {
        this.warehouseFromId = warehouseFromId;
    }

    public Integer getWarehouseToId() {
        return warehouseToId;
    }

    public void setWarehouseToId(Integer warehouseToId) {
        this.warehouseToId = warehouseToId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getValidationDate() {
        return validationDate;
    }

    public void setValidationDate(LocalDate validationDate) {
        this.validationDate = validationDate;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Set<MaterialDTO> getItemTransfereds() {
        return itemTransfereds;
    }

    public void setItemTransfereds(Set<MaterialDTO> materials) {
        this.itemTransfereds = materials;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransferDTO transferDTO = (TransferDTO) o;
        if(transferDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transferDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransferDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", warehouseFromId='" + getWarehouseFromId() + "'" +
            ", warehouseToId='" + getWarehouseToId() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", validationDate='" + getValidationDate() + "'" +
            ", userId='" + getUserId() + "'" +
            "}";
    }
}
