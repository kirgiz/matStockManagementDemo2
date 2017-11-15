package com.materialstockmanagement.app.domain;

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
 * A Transfer.
 */
@Entity
@Table(name = "transfer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "transfer")
public class Transfer implements Serializable {

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

    @Column(name = "warehouse_from_id")
    private Integer warehouseFromId;

    @Column(name = "warehouse_to_id")
    private Integer warehouseToId;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "validation_date")
    private LocalDate validationDate;

    @Column(name = "user_id")
    private Integer userId;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "transfer_item_transfered",
               joinColumns = @JoinColumn(name="transfers_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="item_transfereds_id", referencedColumnName="id"))
    private Set<Material> itemTransfereds = new HashSet<>();

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

    public Transfer code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Transfer description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getWarehouseFromId() {
        return warehouseFromId;
    }

    public Transfer warehouseFromId(Integer warehouseFromId) {
        this.warehouseFromId = warehouseFromId;
        return this;
    }

    public void setWarehouseFromId(Integer warehouseFromId) {
        this.warehouseFromId = warehouseFromId;
    }

    public Integer getWarehouseToId() {
        return warehouseToId;
    }

    public Transfer warehouseToId(Integer warehouseToId) {
        this.warehouseToId = warehouseToId;
        return this;
    }

    public void setWarehouseToId(Integer warehouseToId) {
        this.warehouseToId = warehouseToId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public Transfer creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getValidationDate() {
        return validationDate;
    }

    public Transfer validationDate(LocalDate validationDate) {
        this.validationDate = validationDate;
        return this;
    }

    public void setValidationDate(LocalDate validationDate) {
        this.validationDate = validationDate;
    }

    public Integer getUserId() {
        return userId;
    }

    public Transfer userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Set<Material> getItemTransfereds() {
        return itemTransfereds;
    }

    public Transfer itemTransfereds(Set<Material> materials) {
        this.itemTransfereds = materials;
        return this;
    }

    public Transfer addItemTransfered(Material material) {
        this.itemTransfereds.add(material);
        return this;
    }

    public Transfer removeItemTransfered(Material material) {
        this.itemTransfereds.remove(material);
        return this;
    }

    public void setItemTransfereds(Set<Material> materials) {
        this.itemTransfereds = materials;
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
        Transfer transfer = (Transfer) o;
        if (transfer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transfer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Transfer{" +
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
