package com.materialstockmanagement.app.web.rest;

import com.materialstockmanagement.app.MaterialStockManagementApp;

import com.materialstockmanagement.app.domain.MaterialTypeDefinition;
import com.materialstockmanagement.app.repository.MaterialTypeDefinitionRepository;
import com.materialstockmanagement.app.service.MaterialTypeDefinitionService;
import com.materialstockmanagement.app.repository.search.MaterialTypeDefinitionSearchRepository;
import com.materialstockmanagement.app.service.dto.MaterialTypeDefinitionDTO;
import com.materialstockmanagement.app.service.mapper.MaterialTypeDefinitionMapper;
import com.materialstockmanagement.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the MaterialTypeDefinitionResource REST controller.
 *
 * @see MaterialTypeDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MaterialStockManagementApp.class)
public class MaterialTypeDefinitionResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private MaterialTypeDefinitionRepository materialTypeDefinitionRepository;

    @Autowired
    private MaterialTypeDefinitionMapper materialTypeDefinitionMapper;

    @Autowired
    private MaterialTypeDefinitionService materialTypeDefinitionService;

    @Autowired
    private MaterialTypeDefinitionSearchRepository materialTypeDefinitionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMaterialTypeDefinitionMockMvc;

    private MaterialTypeDefinition materialTypeDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MaterialTypeDefinitionResource materialTypeDefinitionResource = new MaterialTypeDefinitionResource(materialTypeDefinitionService);
        this.restMaterialTypeDefinitionMockMvc = MockMvcBuilders.standaloneSetup(materialTypeDefinitionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static MaterialTypeDefinition createEntity(EntityManager em) {
        MaterialTypeDefinition materialTypeDefinition = new MaterialTypeDefinition()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return materialTypeDefinition;
    }

    @Before
    public void initTest() {
        materialTypeDefinitionSearchRepository.deleteAll();
        materialTypeDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createMaterialTypeDefinition() throws Exception {
        int databaseSizeBeforeCreate = materialTypeDefinitionRepository.findAll().size();

        // Create the MaterialTypeDefinition
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO = materialTypeDefinitionMapper.toDto(materialTypeDefinition);
        restMaterialTypeDefinitionMockMvc.perform(post("/api/material-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the MaterialTypeDefinition in the database
        List<MaterialTypeDefinition> materialTypeDefinitionList = materialTypeDefinitionRepository.findAll();
        assertThat(materialTypeDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        MaterialTypeDefinition testMaterialTypeDefinition = materialTypeDefinitionList.get(materialTypeDefinitionList.size() - 1);
        assertThat(testMaterialTypeDefinition.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testMaterialTypeDefinition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the MaterialTypeDefinition in Elasticsearch
        MaterialTypeDefinition materialTypeDefinitionEs = materialTypeDefinitionSearchRepository.findOne(testMaterialTypeDefinition.getId());
        assertThat(materialTypeDefinitionEs).isEqualToComparingFieldByField(testMaterialTypeDefinition);
    }

    @Test
    @Transactional
    public void createMaterialTypeDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = materialTypeDefinitionRepository.findAll().size();

        // Create the MaterialTypeDefinition with an existing ID
        materialTypeDefinition.setId(1L);
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO = materialTypeDefinitionMapper.toDto(materialTypeDefinition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMaterialTypeDefinitionMockMvc.perform(post("/api/material-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialTypeDefinitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MaterialTypeDefinition in the database
        List<MaterialTypeDefinition> materialTypeDefinitionList = materialTypeDefinitionRepository.findAll();
        assertThat(materialTypeDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMaterialTypeDefinitions() throws Exception {
        // Initialize the database
        materialTypeDefinitionRepository.saveAndFlush(materialTypeDefinition);

        // Get all the materialTypeDefinitionList
        restMaterialTypeDefinitionMockMvc.perform(get("/api/material-type-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materialTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getMaterialTypeDefinition() throws Exception {
        // Initialize the database
        materialTypeDefinitionRepository.saveAndFlush(materialTypeDefinition);

        // Get the materialTypeDefinition
        restMaterialTypeDefinitionMockMvc.perform(get("/api/material-type-definitions/{id}", materialTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(materialTypeDefinition.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMaterialTypeDefinition() throws Exception {
        // Get the materialTypeDefinition
        restMaterialTypeDefinitionMockMvc.perform(get("/api/material-type-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMaterialTypeDefinition() throws Exception {
        // Initialize the database
        materialTypeDefinitionRepository.saveAndFlush(materialTypeDefinition);
        materialTypeDefinitionSearchRepository.save(materialTypeDefinition);
        int databaseSizeBeforeUpdate = materialTypeDefinitionRepository.findAll().size();

        // Update the materialTypeDefinition
        MaterialTypeDefinition updatedMaterialTypeDefinition = materialTypeDefinitionRepository.findOne(materialTypeDefinition.getId());
        updatedMaterialTypeDefinition
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO = materialTypeDefinitionMapper.toDto(updatedMaterialTypeDefinition);

        restMaterialTypeDefinitionMockMvc.perform(put("/api/material-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialTypeDefinitionDTO)))
            .andExpect(status().isOk());

        // Validate the MaterialTypeDefinition in the database
        List<MaterialTypeDefinition> materialTypeDefinitionList = materialTypeDefinitionRepository.findAll();
        assertThat(materialTypeDefinitionList).hasSize(databaseSizeBeforeUpdate);
        MaterialTypeDefinition testMaterialTypeDefinition = materialTypeDefinitionList.get(materialTypeDefinitionList.size() - 1);
        assertThat(testMaterialTypeDefinition.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testMaterialTypeDefinition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the MaterialTypeDefinition in Elasticsearch
        MaterialTypeDefinition materialTypeDefinitionEs = materialTypeDefinitionSearchRepository.findOne(testMaterialTypeDefinition.getId());
        assertThat(materialTypeDefinitionEs).isEqualToComparingFieldByField(testMaterialTypeDefinition);
    }

    @Test
    @Transactional
    public void updateNonExistingMaterialTypeDefinition() throws Exception {
        int databaseSizeBeforeUpdate = materialTypeDefinitionRepository.findAll().size();

        // Create the MaterialTypeDefinition
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO = materialTypeDefinitionMapper.toDto(materialTypeDefinition);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMaterialTypeDefinitionMockMvc.perform(put("/api/material-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(materialTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the MaterialTypeDefinition in the database
        List<MaterialTypeDefinition> materialTypeDefinitionList = materialTypeDefinitionRepository.findAll();
        assertThat(materialTypeDefinitionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteMaterialTypeDefinition() throws Exception {
        // Initialize the database
        materialTypeDefinitionRepository.saveAndFlush(materialTypeDefinition);
        materialTypeDefinitionSearchRepository.save(materialTypeDefinition);
        int databaseSizeBeforeDelete = materialTypeDefinitionRepository.findAll().size();

        // Get the materialTypeDefinition
        restMaterialTypeDefinitionMockMvc.perform(delete("/api/material-type-definitions/{id}", materialTypeDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean materialTypeDefinitionExistsInEs = materialTypeDefinitionSearchRepository.exists(materialTypeDefinition.getId());
        assertThat(materialTypeDefinitionExistsInEs).isFalse();

        // Validate the database is empty
        List<MaterialTypeDefinition> materialTypeDefinitionList = materialTypeDefinitionRepository.findAll();
        assertThat(materialTypeDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchMaterialTypeDefinition() throws Exception {
        // Initialize the database
        materialTypeDefinitionRepository.saveAndFlush(materialTypeDefinition);
        materialTypeDefinitionSearchRepository.save(materialTypeDefinition);

        // Search the materialTypeDefinition
        restMaterialTypeDefinitionMockMvc.perform(get("/api/_search/material-type-definitions?query=id:" + materialTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(materialTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialTypeDefinition.class);
        MaterialTypeDefinition materialTypeDefinition1 = new MaterialTypeDefinition();
        materialTypeDefinition1.setId(1L);
        MaterialTypeDefinition materialTypeDefinition2 = new MaterialTypeDefinition();
        materialTypeDefinition2.setId(materialTypeDefinition1.getId());
        assertThat(materialTypeDefinition1).isEqualTo(materialTypeDefinition2);
        materialTypeDefinition2.setId(2L);
        assertThat(materialTypeDefinition1).isNotEqualTo(materialTypeDefinition2);
        materialTypeDefinition1.setId(null);
        assertThat(materialTypeDefinition1).isNotEqualTo(materialTypeDefinition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MaterialTypeDefinitionDTO.class);
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO1 = new MaterialTypeDefinitionDTO();
        materialTypeDefinitionDTO1.setId(1L);
        MaterialTypeDefinitionDTO materialTypeDefinitionDTO2 = new MaterialTypeDefinitionDTO();
        assertThat(materialTypeDefinitionDTO1).isNotEqualTo(materialTypeDefinitionDTO2);
        materialTypeDefinitionDTO2.setId(materialTypeDefinitionDTO1.getId());
        assertThat(materialTypeDefinitionDTO1).isEqualTo(materialTypeDefinitionDTO2);
        materialTypeDefinitionDTO2.setId(2L);
        assertThat(materialTypeDefinitionDTO1).isNotEqualTo(materialTypeDefinitionDTO2);
        materialTypeDefinitionDTO1.setId(null);
        assertThat(materialTypeDefinitionDTO1).isNotEqualTo(materialTypeDefinitionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(materialTypeDefinitionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(materialTypeDefinitionMapper.fromId(null)).isNull();
    }
}
