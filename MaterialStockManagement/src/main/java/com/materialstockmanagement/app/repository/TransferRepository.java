package com.materialstockmanagement.app.repository;

import com.materialstockmanagement.app.domain.Transfer;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Transfer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TransferRepository extends JpaRepository<Transfer, Long> {
    @Query("select distinct transfer from Transfer transfer left join fetch transfer.itemTransfereds")
    List<Transfer> findAllWithEagerRelationships();

    @Query("select transfer from Transfer transfer left join fetch transfer.itemTransfereds where transfer.id =:id")
    Transfer findOneWithEagerRelationships(@Param("id") Long id);

}
