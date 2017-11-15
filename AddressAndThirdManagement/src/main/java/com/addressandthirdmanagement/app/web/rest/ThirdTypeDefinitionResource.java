package com.addressandthirdmanagement.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.addressandthirdmanagement.app.service.ThirdTypeDefinitionService;
import com.addressandthirdmanagement.app.web.rest.util.HeaderUtil;
import com.addressandthirdmanagement.app.web.rest.util.PaginationUtil;
import com.addressandthirdmanagement.app.service.dto.ThirdTypeDefinitionDTO;
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
 * REST controller for managing ThirdTypeDefinition.
 */
@RestController
@RequestMapping("/api")
public class ThirdTypeDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(ThirdTypeDefinitionResource.class);

    private static final String ENTITY_NAME = "thirdTypeDefinition";

    private final ThirdTypeDefinitionService thirdTypeDefinitionService;

    public ThirdTypeDefinitionResource(ThirdTypeDefinitionService thirdTypeDefinitionService) {
        this.thirdTypeDefinitionService = thirdTypeDefinitionService;
    }

    /**
     * POST  /third-type-definitions : Create a new thirdTypeDefinition.
     *
     * @param thirdTypeDefinitionDTO the thirdTypeDefinitionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new thirdTypeDefinitionDTO, or with status 400 (Bad Request) if the thirdTypeDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/third-type-definitions")
    @Timed
    public ResponseEntity<ThirdTypeDefinitionDTO> createThirdTypeDefinition(@Valid @RequestBody ThirdTypeDefinitionDTO thirdTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to save ThirdTypeDefinition : {}", thirdTypeDefinitionDTO);
        if (thirdTypeDefinitionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new thirdTypeDefinition cannot already have an ID")).body(null);
        }
        ThirdTypeDefinitionDTO result = thirdTypeDefinitionService.save(thirdTypeDefinitionDTO);
        return ResponseEntity.created(new URI("/api/third-type-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /third-type-definitions : Updates an existing thirdTypeDefinition.
     *
     * @param thirdTypeDefinitionDTO the thirdTypeDefinitionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated thirdTypeDefinitionDTO,
     * or with status 400 (Bad Request) if the thirdTypeDefinitionDTO is not valid,
     * or with status 500 (Internal Server Error) if the thirdTypeDefinitionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/third-type-definitions")
    @Timed
    public ResponseEntity<ThirdTypeDefinitionDTO> updateThirdTypeDefinition(@Valid @RequestBody ThirdTypeDefinitionDTO thirdTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to update ThirdTypeDefinition : {}", thirdTypeDefinitionDTO);
        if (thirdTypeDefinitionDTO.getId() == null) {
            return createThirdTypeDefinition(thirdTypeDefinitionDTO);
        }
        ThirdTypeDefinitionDTO result = thirdTypeDefinitionService.save(thirdTypeDefinitionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, thirdTypeDefinitionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /third-type-definitions : get all the thirdTypeDefinitions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of thirdTypeDefinitions in body
     */
    @GetMapping("/third-type-definitions")
    @Timed
    public ResponseEntity<List<ThirdTypeDefinitionDTO>> getAllThirdTypeDefinitions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of ThirdTypeDefinitions");
        Page<ThirdTypeDefinitionDTO> page = thirdTypeDefinitionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/third-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /third-type-definitions/:id : get the "id" thirdTypeDefinition.
     *
     * @param id the id of the thirdTypeDefinitionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the thirdTypeDefinitionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/third-type-definitions/{id}")
    @Timed
    public ResponseEntity<ThirdTypeDefinitionDTO> getThirdTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to get ThirdTypeDefinition : {}", id);
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = thirdTypeDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(thirdTypeDefinitionDTO));
    }

    /**
     * DELETE  /third-type-definitions/:id : delete the "id" thirdTypeDefinition.
     *
     * @param id the id of the thirdTypeDefinitionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/third-type-definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteThirdTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to delete ThirdTypeDefinition : {}", id);
        thirdTypeDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/third-type-definitions?query=:query : search for the thirdTypeDefinition corresponding
     * to the query.
     *
     * @param query the query of the thirdTypeDefinition search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/third-type-definitions")
    @Timed
    public ResponseEntity<List<ThirdTypeDefinitionDTO>> searchThirdTypeDefinitions(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of ThirdTypeDefinitions for query {}", query);
        Page<ThirdTypeDefinitionDTO> page = thirdTypeDefinitionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/third-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
