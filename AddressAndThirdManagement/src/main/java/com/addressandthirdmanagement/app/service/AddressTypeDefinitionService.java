package com.addressandthirdmanagement.app.service;

import com.addressandthirdmanagement.app.domain.AddressTypeDefinition;
import com.addressandthirdmanagement.app.repository.AddressTypeDefinitionRepository;
import com.addressandthirdmanagement.app.repository.search.AddressTypeDefinitionSearchRepository;
import com.addressandthirdmanagement.app.service.dto.AddressTypeDefinitionDTO;
import com.addressandthirdmanagement.app.service.mapper.AddressTypeDefinitionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing AddressTypeDefinition.
 */
@Service
@Transactional
public class AddressTypeDefinitionService {

    private final Logger log = LoggerFactory.getLogger(AddressTypeDefinitionService.class);

    private final AddressTypeDefinitionRepository addressTypeDefinitionRepository;

    private final AddressTypeDefinitionMapper addressTypeDefinitionMapper;

    private final AddressTypeDefinitionSearchRepository addressTypeDefinitionSearchRepository;

    public AddressTypeDefinitionService(AddressTypeDefinitionRepository addressTypeDefinitionRepository, AddressTypeDefinitionMapper addressTypeDefinitionMapper, AddressTypeDefinitionSearchRepository addressTypeDefinitionSearchRepository) {
        this.addressTypeDefinitionRepository = addressTypeDefinitionRepository;
        this.addressTypeDefinitionMapper = addressTypeDefinitionMapper;
        this.addressTypeDefinitionSearchRepository = addressTypeDefinitionSearchRepository;
    }

    /**
     * Save a addressTypeDefinition.
     *
     * @param addressTypeDefinitionDTO the entity to save
     * @return the persisted entity
     */
    public AddressTypeDefinitionDTO save(AddressTypeDefinitionDTO addressTypeDefinitionDTO) {
        log.debug("Request to save AddressTypeDefinition : {}", addressTypeDefinitionDTO);
        AddressTypeDefinition addressTypeDefinition = addressTypeDefinitionMapper.toEntity(addressTypeDefinitionDTO);
        addressTypeDefinition = addressTypeDefinitionRepository.save(addressTypeDefinition);
        AddressTypeDefinitionDTO result = addressTypeDefinitionMapper.toDto(addressTypeDefinition);
        addressTypeDefinitionSearchRepository.save(addressTypeDefinition);
        return result;
    }

    /**
     *  Get all the addressTypeDefinitions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AddressTypeDefinitionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all AddressTypeDefinitions");
        return addressTypeDefinitionRepository.findAll(pageable)
            .map(addressTypeDefinitionMapper::toDto);
    }

    /**
     *  Get one addressTypeDefinition by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public AddressTypeDefinitionDTO findOne(Long id) {
        log.debug("Request to get AddressTypeDefinition : {}", id);
        AddressTypeDefinition addressTypeDefinition = addressTypeDefinitionRepository.findOne(id);
        return addressTypeDefinitionMapper.toDto(addressTypeDefinition);
    }

    /**
     *  Delete the  addressTypeDefinition by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete AddressTypeDefinition : {}", id);
        addressTypeDefinitionRepository.delete(id);
        addressTypeDefinitionSearchRepository.delete(id);
    }

    /**
     * Search for the addressTypeDefinition corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<AddressTypeDefinitionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of AddressTypeDefinitions for query {}", query);
        Page<AddressTypeDefinition> result = addressTypeDefinitionSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(addressTypeDefinitionMapper::toDto);
    }
}
