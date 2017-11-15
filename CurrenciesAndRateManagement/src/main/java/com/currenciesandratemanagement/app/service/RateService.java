package com.currenciesandratemanagement.app.service;

import com.currenciesandratemanagement.app.domain.Rate;
import com.currenciesandratemanagement.app.repository.RateRepository;
import com.currenciesandratemanagement.app.repository.search.RateSearchRepository;
import com.currenciesandratemanagement.app.service.dto.RateDTO;
import com.currenciesandratemanagement.app.service.mapper.RateMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Rate.
 */
@Service
@Transactional
public class RateService {

    private final Logger log = LoggerFactory.getLogger(RateService.class);

    private final RateRepository rateRepository;

    private final RateMapper rateMapper;

    private final RateSearchRepository rateSearchRepository;

    public RateService(RateRepository rateRepository, RateMapper rateMapper, RateSearchRepository rateSearchRepository) {
        this.rateRepository = rateRepository;
        this.rateMapper = rateMapper;
        this.rateSearchRepository = rateSearchRepository;
    }

    /**
     * Save a rate.
     *
     * @param rateDTO the entity to save
     * @return the persisted entity
     */
    public RateDTO save(RateDTO rateDTO) {
        log.debug("Request to save Rate : {}", rateDTO);
        Rate rate = rateMapper.toEntity(rateDTO);
        rate = rateRepository.save(rate);
        RateDTO result = rateMapper.toDto(rate);
        rateSearchRepository.save(rate);
        return result;
    }

    /**
     *  Get all the rates.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RateDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Rates");
        return rateRepository.findAll(pageable)
            .map(rateMapper::toDto);
    }

    /**
     *  Get one rate by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public RateDTO findOne(Long id) {
        log.debug("Request to get Rate : {}", id);
        Rate rate = rateRepository.findOne(id);
        return rateMapper.toDto(rate);
    }

    /**
     *  Delete the  rate by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Rate : {}", id);
        rateRepository.delete(id);
        rateSearchRepository.delete(id);
    }

    /**
     * Search for the rate corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<RateDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Rates for query {}", query);
        Page<Rate> result = rateSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(rateMapper::toDto);
    }
}
