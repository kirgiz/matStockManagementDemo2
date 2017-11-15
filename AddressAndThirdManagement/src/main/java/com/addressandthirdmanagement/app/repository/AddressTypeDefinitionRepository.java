package com.addressandthirdmanagement.app.repository;

import com.addressandthirdmanagement.app.domain.AddressTypeDefinition;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the AddressTypeDefinition entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressTypeDefinitionRepository extends JpaRepository<AddressTypeDefinition, Long> {

}
