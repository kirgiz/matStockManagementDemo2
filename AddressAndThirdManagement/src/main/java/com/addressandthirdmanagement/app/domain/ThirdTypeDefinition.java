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
 * A ThirdTypeDefinition.
 */
@Entity
@Table(name = "third_type_definition")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "thirdtypedefinition")
public class ThirdTypeDefinition implements Serializable {

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

    @OneToMany(mappedBy = "thirdTypeDefinition")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Third> thirds = new HashSet<>();

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

    public ThirdTypeDefinition code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDescription() {
        return description;
    }

    public ThirdTypeDefinition description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Third> getThirds() {
        return thirds;
    }

    public ThirdTypeDefinition thirds(Set<Third> thirds) {
        this.thirds = thirds;
        return this;
    }

    public ThirdTypeDefinition addThird(Third third) {
        this.thirds.add(third);
        third.setThirdTypeDefinition(this);
        return this;
    }

    public ThirdTypeDefinition removeThird(Third third) {
        this.thirds.remove(third);
        third.setThirdTypeDefinition(null);
        return this;
    }

    public void setThirds(Set<Third> thirds) {
        this.thirds = thirds;
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
        ThirdTypeDefinition thirdTypeDefinition = (ThirdTypeDefinition) o;
        if (thirdTypeDefinition.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), thirdTypeDefinition.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ThirdTypeDefinition{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
