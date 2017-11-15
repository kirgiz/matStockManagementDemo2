package com.addressandthirdmanagement.app.web.rest;

import com.addressandthirdmanagement.app.AddressAndThirdManagementApp;

import com.addressandthirdmanagement.app.domain.ThirdTypeDefinition;
import com.addressandthirdmanagement.app.repository.ThirdTypeDefinitionRepository;
import com.addressandthirdmanagement.app.service.ThirdTypeDefinitionService;
import com.addressandthirdmanagement.app.repository.search.ThirdTypeDefinitionSearchRepository;
import com.addressandthirdmanagement.app.service.dto.ThirdTypeDefinitionDTO;
import com.addressandthirdmanagement.app.service.mapper.ThirdTypeDefinitionMapper;
import com.addressandthirdmanagement.app.web.rest.errors.ExceptionTranslator;

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
 * Test class for the ThirdTypeDefinitionResource REST controller.
 *
 * @see ThirdTypeDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AddressAndThirdManagementApp.class)
public class ThirdTypeDefinitionResourceIntTest {

    private static final String DEFAULT_CODE = "AAA";
    private static final String UPDATED_CODE = "BBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private ThirdTypeDefinitionRepository thirdTypeDefinitionRepository;

    @Autowired
    private ThirdTypeDefinitionMapper thirdTypeDefinitionMapper;

    @Autowired
    private ThirdTypeDefinitionService thirdTypeDefinitionService;

    @Autowired
    private ThirdTypeDefinitionSearchRepository thirdTypeDefinitionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restThirdTypeDefinitionMockMvc;

    private ThirdTypeDefinition thirdTypeDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ThirdTypeDefinitionResource thirdTypeDefinitionResource = new ThirdTypeDefinitionResource(thirdTypeDefinitionService);
        this.restThirdTypeDefinitionMockMvc = MockMvcBuilders.standaloneSetup(thirdTypeDefinitionResource)
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
    public static ThirdTypeDefinition createEntity(EntityManager em) {
        ThirdTypeDefinition thirdTypeDefinition = new ThirdTypeDefinition()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return thirdTypeDefinition;
    }

    @Before
    public void initTest() {
        thirdTypeDefinitionSearchRepository.deleteAll();
        thirdTypeDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createThirdTypeDefinition() throws Exception {
        int databaseSizeBeforeCreate = thirdTypeDefinitionRepository.findAll().size();

        // Create the ThirdTypeDefinition
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = thirdTypeDefinitionMapper.toDto(thirdTypeDefinition);
        restThirdTypeDefinitionMockMvc.perform(post("/api/third-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the ThirdTypeDefinition in the database
        List<ThirdTypeDefinition> thirdTypeDefinitionList = thirdTypeDefinitionRepository.findAll();
        assertThat(thirdTypeDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        ThirdTypeDefinition testThirdTypeDefinition = thirdTypeDefinitionList.get(thirdTypeDefinitionList.size() - 1);
        assertThat(testThirdTypeDefinition.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testThirdTypeDefinition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the ThirdTypeDefinition in Elasticsearch
        ThirdTypeDefinition thirdTypeDefinitionEs = thirdTypeDefinitionSearchRepository.findOne(testThirdTypeDefinition.getId());
        assertThat(thirdTypeDefinitionEs).isEqualToComparingFieldByField(testThirdTypeDefinition);
    }

    @Test
    @Transactional
    public void createThirdTypeDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = thirdTypeDefinitionRepository.findAll().size();

        // Create the ThirdTypeDefinition with an existing ID
        thirdTypeDefinition.setId(1L);
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = thirdTypeDefinitionMapper.toDto(thirdTypeDefinition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restThirdTypeDefinitionMockMvc.perform(post("/api/third-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdTypeDefinitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ThirdTypeDefinition in the database
        List<ThirdTypeDefinition> thirdTypeDefinitionList = thirdTypeDefinitionRepository.findAll();
        assertThat(thirdTypeDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllThirdTypeDefinitions() throws Exception {
        // Initialize the database
        thirdTypeDefinitionRepository.saveAndFlush(thirdTypeDefinition);

        // Get all the thirdTypeDefinitionList
        restThirdTypeDefinitionMockMvc.perform(get("/api/third-type-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thirdTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getThirdTypeDefinition() throws Exception {
        // Initialize the database
        thirdTypeDefinitionRepository.saveAndFlush(thirdTypeDefinition);

        // Get the thirdTypeDefinition
        restThirdTypeDefinitionMockMvc.perform(get("/api/third-type-definitions/{id}", thirdTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(thirdTypeDefinition.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingThirdTypeDefinition() throws Exception {
        // Get the thirdTypeDefinition
        restThirdTypeDefinitionMockMvc.perform(get("/api/third-type-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateThirdTypeDefinition() throws Exception {
        // Initialize the database
        thirdTypeDefinitionRepository.saveAndFlush(thirdTypeDefinition);
        thirdTypeDefinitionSearchRepository.save(thirdTypeDefinition);
        int databaseSizeBeforeUpdate = thirdTypeDefinitionRepository.findAll().size();

        // Update the thirdTypeDefinition
        ThirdTypeDefinition updatedThirdTypeDefinition = thirdTypeDefinitionRepository.findOne(thirdTypeDefinition.getId());
        updatedThirdTypeDefinition
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = thirdTypeDefinitionMapper.toDto(updatedThirdTypeDefinition);

        restThirdTypeDefinitionMockMvc.perform(put("/api/third-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdTypeDefinitionDTO)))
            .andExpect(status().isOk());

        // Validate the ThirdTypeDefinition in the database
        List<ThirdTypeDefinition> thirdTypeDefinitionList = thirdTypeDefinitionRepository.findAll();
        assertThat(thirdTypeDefinitionList).hasSize(databaseSizeBeforeUpdate);
        ThirdTypeDefinition testThirdTypeDefinition = thirdTypeDefinitionList.get(thirdTypeDefinitionList.size() - 1);
        assertThat(testThirdTypeDefinition.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testThirdTypeDefinition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the ThirdTypeDefinition in Elasticsearch
        ThirdTypeDefinition thirdTypeDefinitionEs = thirdTypeDefinitionSearchRepository.findOne(testThirdTypeDefinition.getId());
        assertThat(thirdTypeDefinitionEs).isEqualToComparingFieldByField(testThirdTypeDefinition);
    }

    @Test
    @Transactional
    public void updateNonExistingThirdTypeDefinition() throws Exception {
        int databaseSizeBeforeUpdate = thirdTypeDefinitionRepository.findAll().size();

        // Create the ThirdTypeDefinition
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO = thirdTypeDefinitionMapper.toDto(thirdTypeDefinition);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restThirdTypeDefinitionMockMvc.perform(put("/api/third-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(thirdTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the ThirdTypeDefinition in the database
        List<ThirdTypeDefinition> thirdTypeDefinitionList = thirdTypeDefinitionRepository.findAll();
        assertThat(thirdTypeDefinitionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteThirdTypeDefinition() throws Exception {
        // Initialize the database
        thirdTypeDefinitionRepository.saveAndFlush(thirdTypeDefinition);
        thirdTypeDefinitionSearchRepository.save(thirdTypeDefinition);
        int databaseSizeBeforeDelete = thirdTypeDefinitionRepository.findAll().size();

        // Get the thirdTypeDefinition
        restThirdTypeDefinitionMockMvc.perform(delete("/api/third-type-definitions/{id}", thirdTypeDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean thirdTypeDefinitionExistsInEs = thirdTypeDefinitionSearchRepository.exists(thirdTypeDefinition.getId());
        assertThat(thirdTypeDefinitionExistsInEs).isFalse();

        // Validate the database is empty
        List<ThirdTypeDefinition> thirdTypeDefinitionList = thirdTypeDefinitionRepository.findAll();
        assertThat(thirdTypeDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchThirdTypeDefinition() throws Exception {
        // Initialize the database
        thirdTypeDefinitionRepository.saveAndFlush(thirdTypeDefinition);
        thirdTypeDefinitionSearchRepository.save(thirdTypeDefinition);

        // Search the thirdTypeDefinition
        restThirdTypeDefinitionMockMvc.perform(get("/api/_search/third-type-definitions?query=id:" + thirdTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(thirdTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThirdTypeDefinition.class);
        ThirdTypeDefinition thirdTypeDefinition1 = new ThirdTypeDefinition();
        thirdTypeDefinition1.setId(1L);
        ThirdTypeDefinition thirdTypeDefinition2 = new ThirdTypeDefinition();
        thirdTypeDefinition2.setId(thirdTypeDefinition1.getId());
        assertThat(thirdTypeDefinition1).isEqualTo(thirdTypeDefinition2);
        thirdTypeDefinition2.setId(2L);
        assertThat(thirdTypeDefinition1).isNotEqualTo(thirdTypeDefinition2);
        thirdTypeDefinition1.setId(null);
        assertThat(thirdTypeDefinition1).isNotEqualTo(thirdTypeDefinition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ThirdTypeDefinitionDTO.class);
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO1 = new ThirdTypeDefinitionDTO();
        thirdTypeDefinitionDTO1.setId(1L);
        ThirdTypeDefinitionDTO thirdTypeDefinitionDTO2 = new ThirdTypeDefinitionDTO();
        assertThat(thirdTypeDefinitionDTO1).isNotEqualTo(thirdTypeDefinitionDTO2);
        thirdTypeDefinitionDTO2.setId(thirdTypeDefinitionDTO1.getId());
        assertThat(thirdTypeDefinitionDTO1).isEqualTo(thirdTypeDefinitionDTO2);
        thirdTypeDefinitionDTO2.setId(2L);
        assertThat(thirdTypeDefinitionDTO1).isNotEqualTo(thirdTypeDefinitionDTO2);
        thirdTypeDefinitionDTO1.setId(null);
        assertThat(thirdTypeDefinitionDTO1).isNotEqualTo(thirdTypeDefinitionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(thirdTypeDefinitionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(thirdTypeDefinitionMapper.fromId(null)).isNull();
    }
}
