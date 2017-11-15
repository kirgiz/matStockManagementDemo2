package com.addressandthirdmanagement.app.repository;

import com.addressandthirdmanagement.app.domain.Third;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Third entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ThirdRepository extends JpaRepository<Third, Long> {

}
