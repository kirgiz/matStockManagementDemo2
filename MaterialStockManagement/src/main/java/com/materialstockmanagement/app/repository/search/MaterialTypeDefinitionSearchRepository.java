package com.materialstockmanagement.app.repository.search;

import com.materialstockmanagement.app.domain.MaterialTypeDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the MaterialTypeDefinition entity.
 */
public interface MaterialTypeDefinitionSearchRepository extends ElasticsearchRepository<MaterialTypeDefinition, Long> {
}
