package com.addressandthirdmanagement.app.service;

import com.addressandthirdmanagement.app.domain.ThirdTypeDefinition;
import com.addressandthirdmanagement.app.repository.ThirdTypeDefinitionRepository;
import com.addressandthirdmanagement.app.repository.search.ThirdTypeDefinitionSearchRepository;
import com.addressandthirdmanagement.app.service.dto.ThirdTypeDefinitionDTO;
import com.addressandthirdmanagement.app.service.mapper.ThirdTypeDefinitionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing ThirdTypeDefinition.
 */
@Service
@Transactional
public class ThirdTypeDefinitionService {

    private final Logger log = LoggerFactory.getLogger(ThirdTypeDefinitionService.class);

    private final ThirdTypeDefinitionRepository thirdTypeDefinitionRepository;

    private final ThirdTypeDefinitionMapper thirdTypeDefinitionMapper;

    private final ThirdTypeDefinitionSearchRepository thirdTypeDefinitionSearchRepository;

    public ThirdTypeDefinitionService(ThirdTypeDefinitionRepository thirdTypeDefinitionRepository, ThirdTypeDefinitionMapper thirdTypeDefinitionMapper, ThirdTypeDefinitionSearchRepository thirdTypeDefinitionSearchRepository) {
        this.thirdTypeDefinitionRepository = thirdTypeDefinitionRepository;
        this.thirdTypeDefinitionMapper = thirdTypeDefinitionMapper;
        this.thirdTypeDefinitionSearchRepository = thirdTypeDefinitionSearchRepository;
    }

    /**
     * Save a thirdTypeDefinition.
     *
     * @param thirdTypeDefinitionDTO the entity to save
     * @return the persisted entity
     */
    public ThirdTypeDefinitionDTO save(ThirdTypeDefinitionDTO thirdTypeDefinitionDTO) {
        log.debug("Request to save ThirdTypeDefinition : {}", thirdTypeDefinitionDTO);
        ThirdTypeDefinition thirdTypeDefinition = thirdTypeDefinitionMapper.toEntity(thirdTypeDefinitionDTO);
        thirdTypeDefinition = thirdTypeDefinitionRepository.save(thirdTypeDefinition);
        ThirdTypeDefinitionDTO result = thirdTypeDefinitionMapper.toDto(thirdTypeDefinition);
        thirdTypeDefinitionSearchRepository.save(thirdTypeDefinition);
        return result;
    }

    /**
     *  Get all the thirdTypeDefinitions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ThirdTypeDefinitionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ThirdTypeDefinitions");
        return thirdTypeDefinitionRepository.findAll(pageable)
            .map(thirdTypeDefinitionMapper::toDto);
    }

    /**
     *  Get one thirdTypeDefinition by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public ThirdTypeDefinitionDTO findOne(Long id) {
        log.debug("Request to get ThirdTypeDefinition : {}", id);
        ThirdTypeDefinition thirdTypeDefinition = thirdTypeDefinitionRepository.findOne(id);
        return thirdTypeDefinitionMapper.toDto(thirdTypeDefinition);
    }

    /**
     *  Delete the  thirdTypeDefinition by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ThirdTypeDefinition : {}", id);
        thirdTypeDefinitionRepository.delete(id);
        thirdTypeDefinitionSearchRepository.delete(id);
    }

    /**
     * Search for the thirdTypeDefinition corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ThirdTypeDefinitionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of ThirdTypeDefinitions for query {}", query);
        Page<ThirdTypeDefinition> result = thirdTypeDefinitionSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(thirdTypeDefinitionMapper::toDto);
    }
}
