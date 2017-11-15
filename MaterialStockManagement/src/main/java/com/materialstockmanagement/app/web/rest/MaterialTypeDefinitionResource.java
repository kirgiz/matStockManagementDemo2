package com.materialstockmanagement.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.materialstockmanagement.app.service.MaterialTypeDefinitionService;
import com.materialstockmanagement.app.web.rest.util.HeaderUtil;
import com.materialstockmanagement.app.web.rest.util.PaginationUtil;
import com.materialstockmanagement.app.service.dto.MaterialTypeDefinitionDTO;
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
 * REST controller for managing MaterialTypeDefinition.
 */
@RestController
@RequestMapping("/api")
public class MaterialTypeDefinitionResource {

    private final Logger log = LoggerFactory.getLogger(MaterialTypeDefinitionResource.class);

    private static final String ENTITY_NAME = "materialTypeDefinition";

    private final MaterialTypeDefinitionService materialTypeDefinitionService;

    public MaterialTypeDefinitionResource(MaterialTypeDefinitionService materialTypeDefinitionService) {
        this.materialTypeDefinitionService = materialTypeDefinitionService;
    }

    /**
     * POST  /material-type-definitions : Create a new materialTypeDefinition.
     *
     * @param materialTypeDefinitionDTO the materialTypeDefinitionDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new materialTypeDefinitionDTO, or with status 400 (Bad Request) if the materialTypeDefinition has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/material-type-definitions")
    @Timed
    public ResponseEntity<MaterialTypeDefinitionDTO> createMaterialTypeDefinition(@Valid @RequestBody MaterialTypeDefinitionDTO materialTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to save MaterialTypeDefinition : {}", materialTypeDefinitionDTO);
        if (materialTypeDefinitionDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new materialTypeDefinition cannot already have an ID")).body(null);
        }
        MaterialTypeDefinitionDTO result = materialTypeDefinitionService.save(materialTypeDefinitionDTO);
        return ResponseEntity.created(new URI("/api/material-type-definitions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /material-type-definitions : Updates an existing materialTypeDefinition.
     *
     * @param materialTypeDefinitionDTO the materialTypeDefinitionDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated materialTypeDefinitionDTO,
     * or with status 400 (Bad Request) if the materialTypeDefinitionDTO is not valid,
     * or with status 500 (Internal Server Error) if the materialTypeDefinitionDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/material-type-definitions")
    @Timed
    public ResponseEntity<MaterialTypeDefinitionDTO> updateMaterialTypeDefinition(@Valid @RequestBody MaterialTypeDefinitionDTO materialTypeDefinitionDTO) throws URISyntaxException {
        log.debug("REST request to update MaterialTypeDefinition : {}", materialTypeDefinitionDTO);
        if (materialTypeDefinitionDTO.getId() == null) {
            return createMaterialTypeDefinition(materialTypeDefinitionDTO);
        }
        MaterialTypeDefinitionDTO result = materialTypeDefinitionService.save(materialTypeDefinitionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, materialTypeDefinitionDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /material-type-definitions : get all the materialTypeDefinitions.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of materialTypeDefinitions in body
     */
    @GetMapping("/material-type-definitions")
    @Timed
    public ResponseEntity<List<MaterialTypeDefinitionDTO>> getAllMaterialTypeDefinitions(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of MaterialTypeDefinitions");
        Page<MaterialTypeDefinitionDTO> page = materialTypeDefinitionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/material-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /material-type-definitions/:id : get the "id" materialTypeDefinition.
     *
     * @param id the id of the materialTypeDefinitionDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the materialTypeDefinitionDTO, or with status 404 (Not Found)
     */
    @GetMapping("/material-type-definitions/{id}")
    @Timed
    public ResponseEntity<MaterialTypeDefinitionDTO> getMaterialTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to get MaterialTypeDefinition : {}", id);
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO = materialTypeDefinitionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(materialTypeDefinitionDTO));
    }

    /**
     * DELETE  /material-type-definitions/:id : delete the "id" materialTypeDefinition.
     *
     * @param id the id of the materialTypeDefinitionDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/material-type-definitions/{id}")
    @Timed
    public ResponseEntity<Void> deleteMaterialTypeDefinition(@PathVariable Long id) {
        log.debug("REST request to delete MaterialTypeDefinition : {}", id);
        materialTypeDefinitionService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/material-type-definitions?query=:query : search for the materialTypeDefinition corresponding
     * to the query.
     *
     * @param query the query of the materialTypeDefinition search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/material-type-definitions")
    @Timed
    public ResponseEntity<List<MaterialTypeDefinitionDTO>> searchMaterialTypeDefinitions(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of MaterialTypeDefinitions for query {}", query);
        Page<MaterialTypeDefinitionDTO> page = materialTypeDefinitionService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/material-type-definitions");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
