package com.addressandthirdmanagement.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.addressandthirdmanagement.app.service.AddressTypeDefinitionService;
import com.addressandthirdmanagement.app.web.rest.util.HeaderUtil;
import com.addressandthirdmanagement.app.web.rest.util.PaginationUtil;
import com.addressandthirdmanagement.app.service.dto.AddressTypeDefinitionDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing AddressTypeDefinition.
 */
@RestController
@RequestMapping("/api")
public class AddressTypeDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(AddressTypeDefinitionResource.class);

    private static final String ENTITY_NAME = "addressTypeDefinition";

    private final AddressTypeDefinitionService addressTypeDefinitionService;

    public AddressTypeDefinitionResource(AddressTypeDefinitionService addressTypeDefinitionService) {
        this.addressTypeDefinitionService = addressTypeDefinitionService;
    }

    /**
     * POST  /address-type-definitions : Create a new addressTypeDefinition.
     *
     * @param addressTypeDefinitionDTO the addressTypeDefinitionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressTypeDefinitionDTO, or with status 400 (Bad Request) if the addressTypeDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-type-definitions")
    @Timed
    public ResponseEntity<AddressTypeDefinitionDTO> createAddressTypeDefinition(@Valid @RequestBody AddressTypeDefinitionDTO addressTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to save AddressTypeDefinition : {}", addressTypeDefinitionDTO);
        if (addressTypeDefinitionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new addressTypeDefinition cannot already have an ID")).body(null);
        }
        AddressTypeDefinitionDTO result = addressTypeDefinitionService.save(addressTypeDefinitionDTO);
        return ResponseEntity.created(new URI("/api/address-type-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-type-definitions : Updates an existing addressTypeDefinition.
     *
     * @param addressTypeDefinitionDTO the addressTypeDefinitionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressTypeDefinitionDTO,
     * or with status 400 (Bad Request) if the addressTypeDefinitionDTO is not valid,
     * or with status 500 (Internal Server Error) if the addressTypeDefinitionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-type-definitions")
    @Timed
    public ResponseEntity<AddressTypeDefinitionDTO> updateAddressTypeDefinition(@Valid @RequestBody AddressTypeDefinitionDTO addressTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to update AddressTypeDefinition : {}", addressTypeDefinitionDTO);
        if (addressTypeDefinitionDTO.getId() == null) {
            return createAddressTypeDefinition(addressTypeDefinitionDTO);
        }
        AddressTypeDefinitionDTO result = addressTypeDefinitionService.save(addressTypeDefinitionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressTypeDefinitionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-type-definitions : get all the addressTypeDefinitions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of addressTypeDefinitions in body
     */
    @GetMapping("/address-type-definitions")
    @Timed
    public ResponseEntity<List<AddressTypeDefinitionDTO>> getAllAddressTypeDefinitions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of AddressTypeDefinitions");
        Page<AddressTypeDefinitionDTO> page = addressTypeDefinitionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/address-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /address-type-definitions/:id : get the "id" addressTypeDefinition.
     *
     * @param id the id of the addressTypeDefinitionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressTypeDefinitionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/address-type-definitions/{id}")
    @Timed
    public ResponseEntity<AddressTypeDefinitionDTO> getAddressTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to get AddressTypeDefinition : {}", id);
        AddressTypeDefinitionDTO addressTypeDefinitionDTO = addressTypeDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(addressTypeDefinitionDTO));
    }

    /**
     * DELETE  /address-type-definitions/:id : delete the "id" addressTypeDefinition.
     *
     * @param id the id of the addressTypeDefinitionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-type-definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteAddressTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to delete AddressTypeDefinition : {}", id);
        addressTypeDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/address-type-definitions?query=:query : search for the addressTypeDefinition corresponding
     * to the query.
     *
     * @param query the query of the addressTypeDefinition search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/address-type-definitions")
    @Timed
    public ResponseEntity<List<AddressTypeDefinitionDTO>> searchAddressTypeDefinitions(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of AddressTypeDefinitions for query {}", query);
        Page<AddressTypeDefinitionDTO> page = addressTypeDefinitionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/address-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
