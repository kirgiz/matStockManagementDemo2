package com.addressandthirdmanagement.app.domain;

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
 * A Third.
 */
@Entity
@Table(name = "third")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "third")
public class Third implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Size(max = 3)
    @Column(name = "code", length = 3)
    private String code;

    @Size(max = 200)
    @Column(name = "description", length = 200)
    private String description;

    @OneToMany(mappedBy = "third")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Address> addresses = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    private ThirdTypeDefinition thirdTypeDefinition;

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

    public Third code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public Third description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Address> getAddresses() {
        return addresses;
    }

    public Third addresses(Set<Address> addresses) {
        this.addresses = addresses;
        return this;
    }

    public Third addAddress(Address address) {
        this.addresses.add(address);
        address.setThird(this);
        return this;
    }

    public Third removeAddress(Address address) {
        this.addresses.remove(address);
        address.setThird(null);
        return this;
    }

    public void setAddresses(Set<Address> addresses) {
        this.addresses = addresses;
    }

    public ThirdTypeDefinition getThirdTypeDefinition() {
        return thirdTypeDefinition;
    }

    public Third thirdTypeDefinition(ThirdTypeDefinition thirdTypeDefinition) {
        this.thirdTypeDefinition = thirdTypeDefinition;
        return this;
    }

    public void setThirdTypeDefinition(ThirdTypeDefinition thirdTypeDefinition) {
        this.thirdTypeDefinition = thirdTypeDefinition;
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
        Third third = (Third) o;
        if (third.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), third.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Third{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
