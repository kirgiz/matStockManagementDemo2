package com.materialstockmanagement.app.service;

import com.materialstockmanagement.app.domain.MaterialTypeDefinition;
import com.materialstockmanagement.app.repository.MaterialTypeDefinitionRepository;
import com.materialstockmanagement.app.repository.search.MaterialTypeDefinitionSearchRepository;
import com.materialstockmanagement.app.service.dto.MaterialTypeDefinitionDTO;
import com.materialstockmanagement.app.service.mapper.MaterialTypeDefinitionMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing MaterialTypeDefinition.
 */
@Service
@Transactional
public class MaterialTypeDefinitionService {

    private final Logger log = LoggerFactory.getLogger(MaterialTypeDefinitionService.class);

    private final MaterialTypeDefinitionRepository materialTypeDefinitionRepository;

    private final MaterialTypeDefinitionMapper materialTypeDefinitionMapper;

    private final MaterialTypeDefinitionSearchRepository materialTypeDefinitionSearchRepository;

    public MaterialTypeDefinitionService(MaterialTypeDefinitionRepository materialTypeDefinitionRepository, MaterialTypeDefinitionMapper materialTypeDefinitionMapper, MaterialTypeDefinitionSearchRepository materialTypeDefinitionSearchRepository) {
        this.materialTypeDefinitionRepository = materialTypeDefinitionRepository;
        this.materialTypeDefinitionMapper = materialTypeDefinitionMapper;
        this.materialTypeDefinitionSearchRepository = materialTypeDefinitionSearchRepository;
    }

    /**
     * Save a materialTypeDefinition.
     *
     * @param materialTypeDefinitionDTO the entity to save
     * @return the persisted entity
     */
    public MaterialTypeDefinitionDTO save(MaterialTypeDefinitionDTO materialTypeDefinitionDTO) {
        log.debug("Request to save MaterialTypeDefinition : {}", materialTypeDefinitionDTO);
        MaterialTypeDefinition materialTypeDefinition = materialTypeDefinitionMapper.toEntity(materialTypeDefinitionDTO);
        materialTypeDefinition = materialTypeDefinitionRepository.save(materialTypeDefinition);
        MaterialTypeDefinitionDTO result = materialTypeDefinitionMapper.toDto(materialTypeDefinition);
        materialTypeDefinitionSearchRepository.save(materialTypeDefinition);
        return result;
    }

    /**
     *  Get all the materialTypeDefinitions.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MaterialTypeDefinitionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all MaterialTypeDefinitions");
        return materialTypeDefinitionRepository.findAll(pageable)
            .map(materialTypeDefinitionMapper::toDto);
    }

    /**
     *  Get one materialTypeDefinition by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public MaterialTypeDefinitionDTO findOne(Long id) {
        log.debug("Request to get MaterialTypeDefinition : {}", id);
        MaterialTypeDefinition materialTypeDefinition = materialTypeDefinitionRepository.findOne(id);
        return materialTypeDefinitionMapper.toDto(materialTypeDefinition);
    }

    /**
     *  Delete the  materialTypeDefinition by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete MaterialTypeDefinition : {}", id);
        materialTypeDefinitionRepository.delete(id);
        materialTypeDefinitionSearchRepository.delete(id);
    }

    /**
     * Search for the materialTypeDefinition corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<MaterialTypeDefinitionDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of MaterialTypeDefinitions for query {}", query);
        Page<MaterialTypeDefinition> result = materialTypeDefinitionSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(materialTypeDefinitionMapper::toDto);
    }
}
