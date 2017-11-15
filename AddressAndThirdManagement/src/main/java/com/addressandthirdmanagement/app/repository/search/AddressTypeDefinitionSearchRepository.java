package com.addressandthirdmanagement.app.repository.search;

import com.addressandthirdmanagement.app.domain.AddressTypeDefinition;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the AddressTypeDefinition entity.
 */
public interface AddressTypeDefinitionSearchRepository extends ElasticsearchRepository<AddressTypeDefinition, Long> {
}
