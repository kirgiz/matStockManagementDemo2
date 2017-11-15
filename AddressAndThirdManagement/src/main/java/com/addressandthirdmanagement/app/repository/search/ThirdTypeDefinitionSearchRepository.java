package com.addressandthirdmanagement.app.repository.search;

import com.addressandthirdmanagement.app.domain.ThirdTypeDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the ThirdTypeDefinition entity.
 */
public interface ThirdTypeDefinitionSearchRepository extends ElasticsearchRepository<ThirdTypeDefinition, Long> {
}
