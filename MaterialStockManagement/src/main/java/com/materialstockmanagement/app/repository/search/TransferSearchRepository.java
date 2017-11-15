package com.materialstockmanagement.app.repository.search;

import com.materialstockmanagement.app.domain.Transfer;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Transfer entity.
 */
public interface TransferSearchRepository extends ElasticsearchRepository<Transfer, Long> {
}
