package com.materialstockmanagement.app.repository;

import com.materialstockmanagement.app.domain.MaterialTypeDefinition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the MaterialTypeDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MaterialTypeDefinitionRepository extends JpaRepository<MaterialTypeDefinition, Long> {

}
