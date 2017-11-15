package com.addressandthirdmanagement.app.repository;

import com.addressandthirdmanagement.app.domain.ThirdTypeDefinition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the ThirdTypeDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdTypeDefinitionRepository extends JpaRepository<ThirdTypeDefinition, Long> {

}
