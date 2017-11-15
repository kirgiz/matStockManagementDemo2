package com.materialstockmanagement.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Material.
 */
@Entity
@Table(name = "material")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "material")
public class Material implements Serializable {

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

    @Column(name = "warehouse_id")
    private Integer warehouseId;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @ManyToOne(optional = false)
    @NotNull
    private Lot lot;

    @ManyToOne(optional = false)
    @NotNull
    private MaterialTypeDefinition materialTypeDefinition;

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

    public Material code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Material description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public Material warehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
        return this;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Material creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Lot getLot() {
        return lot;
    }

    public Material lot(Lot lot) {
        this.lot = lot;
        return this;
    }

    public void setLot(Lot lot) {
        this.lot = lot;
    }

    public MaterialTypeDefinition getMaterialTypeDefinition() {
        return materialTypeDefinition;
    }

    public Material materialTypeDefinition(MaterialTypeDefinition materialTypeDefinition) {
        this.materialTypeDefinition = materialTypeDefinition;
        return this;
    }

    public void setMaterialTypeDefinition(MaterialTypeDefinition materialTypeDefinition) {
        this.materialTypeDefinition = materialTypeDefinition;
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
        Material material = (Material) o;
        if (material.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), material.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Material{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            ", warehouseId='" + getWarehouseId() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
