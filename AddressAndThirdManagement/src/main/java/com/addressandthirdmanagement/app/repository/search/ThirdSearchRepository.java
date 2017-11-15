package com.addressandthirdmanagement.app.repository.search;

import com.addressandthirdmanagement.app.domain.Third;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Third entity.
 */
public interface ThirdSearchRepository extends ElasticsearchRepository<Third, Long> {
}
