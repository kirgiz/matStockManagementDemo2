package com.materialstockmanagement.app.service;

import com.materialstockmanagement.app.domain.Transfer;
import com.materialstockmanagement.app.repository.TransferRepository;
import com.materialstockmanagement.app.repository.search.TransferSearchRepository;
import com.materialstockmanagement.app.service.dto.TransferDTO;
import com.materialstockmanagement.app.service.mapper.TransferMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Transfer.
 */
@Service
@Transactional
public class TransferService {

    private final Logger log = LoggerFactory.getLogger(TransferService.class);

    private final TransferRepository transferRepository;

    private final TransferMapper transferMapper;

    private final TransferSearchRepository transferSearchRepository;

    public TransferService(TransferRepository transferRepository, TransferMapper transferMapper, TransferSearchRepository transferSearchRepository) {
        this.transferRepository = transferRepository;
        this.transferMapper = transferMapper;
        this.transferSearchRepository = transferSearchRepository;
    }

    /**
     * Save a transfer.
     *
     * @param transferDTO the entity to save
     * @return the persisted entity
     */
    public TransferDTO save(TransferDTO transferDTO) {
        log.debug("Request to save Transfer : {}", transferDTO);
        Transfer transfer = transferMapper.toEntity(transferDTO);
        transfer = transferRepository.save(transfer);
        TransferDTO result = transferMapper.toDto(transfer);
        transferSearchRepository.save(transfer);
        return result;
    }

    /**
     *  Get all the transfers.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TransferDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Transfers");
        return transferRepository.findAll(pageable)
            .map(transferMapper::toDto);
    }

    /**
     *  Get one transfer by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true)
    public TransferDTO findOne(Long id) {
        log.debug("Request to get Transfer : {}", id);
        Transfer transfer = transferRepository.findOneWithEagerRelationships(id);
        return transferMapper.toDto(transfer);
    }

    /**
     *  Delete the  transfer by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Transfer : {}", id);
        transferRepository.delete(id);
        transferSearchRepository.delete(id);
    }

    /**
     * Search for the transfer corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<TransferDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Transfers for query {}", query);
        Page<Transfer> result = transferSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(transferMapper::toDto);
    }
}
