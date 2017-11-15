package com.addressandthirdmanagement.app.web.rest;

import com.addressandthirdmanagement.app.AddressAndThirdManagementApp;

import com.addressandthirdmanagement.app.domain.AddressTypeDefinition;
import com.addressandthirdmanagement.app.repository.AddressTypeDefinitionRepository;
import com.addressandthirdmanagement.app.service.AddressTypeDefinitionService;
import com.addressandthirdmanagement.app.repository.search.AddressTypeDefinitionSearchRepository;
import com.addressandthirdmanagement.app.service.dto.AddressTypeDefinitionDTO;
import com.addressandthirdmanagement.app.service.mapper.AddressTypeDefinitionMapper;
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
 * Test class for the AddressTypeDefinitionResource REST controller.
 *
 * @see AddressTypeDefinitionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AddressAndThirdManagementApp.class)
public class AddressTypeDefinitionResourceIntTest {

    private static final String DEFAULT_CODE = "AAA";
    private static final String UPDATED_CODE = "BBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private AddressTypeDefinitionRepository addressTypeDefinitionRepository;

    @Autowired
    private AddressTypeDefinitionMapper addressTypeDefinitionMapper;

    @Autowired
    private AddressTypeDefinitionService addressTypeDefinitionService;

    @Autowired
    private AddressTypeDefinitionSearchRepository addressTypeDefinitionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAddressTypeDefinitionMockMvc;

    private AddressTypeDefinition addressTypeDefinition;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressTypeDefinitionResource addressTypeDefinitionResource = new AddressTypeDefinitionResource(addressTypeDefinitionService);
        this.restAddressTypeDefinitionMockMvc = MockMvcBuilders.standaloneSetup(addressTypeDefinitionResource)
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
    public static AddressTypeDefinition createEntity(EntityManager em) {
        AddressTypeDefinition addressTypeDefinition = new AddressTypeDefinition()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION);
        return addressTypeDefinition;
    }

    @Before
    public void initTest() {
        addressTypeDefinitionSearchRepository.deleteAll();
        addressTypeDefinition = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddressTypeDefinition() throws Exception {
        int databaseSizeBeforeCreate = addressTypeDefinitionRepository.findAll().size();

        // Create the AddressTypeDefinition
        AddressTypeDefinitionDTO addressTypeDefinitionDTO = addressTypeDefinitionMapper.toDto(addressTypeDefinition);
        restAddressTypeDefinitionMockMvc.perform(post("/api/address-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the AddressTypeDefinition in the database
        List<AddressTypeDefinition> addressTypeDefinitionList = addressTypeDefinitionRepository.findAll();
        assertThat(addressTypeDefinitionList).hasSize(databaseSizeBeforeCreate + 1);
        AddressTypeDefinition testAddressTypeDefinition = addressTypeDefinitionList.get(addressTypeDefinitionList.size() - 1);
        assertThat(testAddressTypeDefinition.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testAddressTypeDefinition.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the AddressTypeDefinition in Elasticsearch
        AddressTypeDefinition addressTypeDefinitionEs = addressTypeDefinitionSearchRepository.findOne(testAddressTypeDefinition.getId());
        assertThat(addressTypeDefinitionEs).isEqualToComparingFieldByField(testAddressTypeDefinition);
    }

    @Test
    @Transactional
    public void createAddressTypeDefinitionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressTypeDefinitionRepository.findAll().size();

        // Create the AddressTypeDefinition with an existing ID
        addressTypeDefinition.setId(1L);
        AddressTypeDefinitionDTO addressTypeDefinitionDTO = addressTypeDefinitionMapper.toDto(addressTypeDefinition);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressTypeDefinitionMockMvc.perform(post("/api/address-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressTypeDefinitionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AddressTypeDefinition in the database
        List<AddressTypeDefinition> addressTypeDefinitionList = addressTypeDefinitionRepository.findAll();
        assertThat(addressTypeDefinitionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAddressTypeDefinitions() throws Exception {
        // Initialize the database
        addressTypeDefinitionRepository.saveAndFlush(addressTypeDefinition);

        // Get all the addressTypeDefinitionList
        restAddressTypeDefinitionMockMvc.perform(get("/api/address-type-definitions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void getAddressTypeDefinition() throws Exception {
        // Initialize the database
        addressTypeDefinitionRepository.saveAndFlush(addressTypeDefinition);

        // Get the addressTypeDefinition
        restAddressTypeDefinitionMockMvc.perform(get("/api/address-type-definitions/{id}", addressTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressTypeDefinition.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAddressTypeDefinition() throws Exception {
        // Get the addressTypeDefinition
        restAddressTypeDefinitionMockMvc.perform(get("/api/address-type-definitions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddressTypeDefinition() throws Exception {
        // Initialize the database
        addressTypeDefinitionRepository.saveAndFlush(addressTypeDefinition);
        addressTypeDefinitionSearchRepository.save(addressTypeDefinition);
        int databaseSizeBeforeUpdate = addressTypeDefinitionRepository.findAll().size();

        // Update the addressTypeDefinition
        AddressTypeDefinition updatedAddressTypeDefinition = addressTypeDefinitionRepository.findOne(addressTypeDefinition.getId());
        updatedAddressTypeDefinition
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION);
        AddressTypeDefinitionDTO addressTypeDefinitionDTO = addressTypeDefinitionMapper.toDto(updatedAddressTypeDefinition);

        restAddressTypeDefinitionMockMvc.perform(put("/api/address-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressTypeDefinitionDTO)))
            .andExpect(status().isOk());

        // Validate the AddressTypeDefinition in the database
        List<AddressTypeDefinition> addressTypeDefinitionList = addressTypeDefinitionRepository.findAll();
        assertThat(addressTypeDefinitionList).hasSize(databaseSizeBeforeUpdate);
        AddressTypeDefinition testAddressTypeDefinition = addressTypeDefinitionList.get(addressTypeDefinitionList.size() - 1);
        assertThat(testAddressTypeDefinition.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testAddressTypeDefinition.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the AddressTypeDefinition in Elasticsearch
        AddressTypeDefinition addressTypeDefinitionEs = addressTypeDefinitionSearchRepository.findOne(testAddressTypeDefinition.getId());
        assertThat(addressTypeDefinitionEs).isEqualToComparingFieldByField(testAddressTypeDefinition);
    }

    @Test
    @Transactional
    public void updateNonExistingAddressTypeDefinition() throws Exception {
        int databaseSizeBeforeUpdate = addressTypeDefinitionRepository.findAll().size();

        // Create the AddressTypeDefinition
        AddressTypeDefinitionDTO addressTypeDefinitionDTO = addressTypeDefinitionMapper.toDto(addressTypeDefinition);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAddressTypeDefinitionMockMvc.perform(put("/api/address-type-definitions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressTypeDefinitionDTO)))
            .andExpect(status().isCreated());

        // Validate the AddressTypeDefinition in the database
        List<AddressTypeDefinition> addressTypeDefinitionList = addressTypeDefinitionRepository.findAll();
        assertThat(addressTypeDefinitionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAddressTypeDefinition() throws Exception {
        // Initialize the database
        addressTypeDefinitionRepository.saveAndFlush(addressTypeDefinition);
        addressTypeDefinitionSearchRepository.save(addressTypeDefinition);
        int databaseSizeBeforeDelete = addressTypeDefinitionRepository.findAll().size();

        // Get the addressTypeDefinition
        restAddressTypeDefinitionMockMvc.perform(delete("/api/address-type-definitions/{id}", addressTypeDefinition.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean addressTypeDefinitionExistsInEs = addressTypeDefinitionSearchRepository.exists(addressTypeDefinition.getId());
        assertThat(addressTypeDefinitionExistsInEs).isFalse();

        // Validate the database is empty
        List<AddressTypeDefinition> addressTypeDefinitionList = addressTypeDefinitionRepository.findAll();
        assertThat(addressTypeDefinitionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchAddressTypeDefinition() throws Exception {
        // Initialize the database
        addressTypeDefinitionRepository.saveAndFlush(addressTypeDefinition);
        addressTypeDefinitionSearchRepository.save(addressTypeDefinition);

        // Search the addressTypeDefinition
        restAddressTypeDefinitionMockMvc.perform(get("/api/_search/address-type-definitions?query=id:" + addressTypeDefinition.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressTypeDefinition.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressTypeDefinition.class);
        AddressTypeDefinition addressTypeDefinition1 = new AddressTypeDefinition();
        addressTypeDefinition1.setId(1L);
        AddressTypeDefinition addressTypeDefinition2 = new AddressTypeDefinition();
        addressTypeDefinition2.setId(addressTypeDefinition1.getId());
        assertThat(addressTypeDefinition1).isEqualTo(addressTypeDefinition2);
        addressTypeDefinition2.setId(2L);
        assertThat(addressTypeDefinition1).isNotEqualTo(addressTypeDefinition2);
        addressTypeDefinition1.setId(null);
        assertThat(addressTypeDefinition1).isNotEqualTo(addressTypeDefinition2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressTypeDefinitionDTO.class);
        AddressTypeDefinitionDTO addressTypeDefinitionDTO1 = new AddressTypeDefinitionDTO();
        addressTypeDefinitionDTO1.setId(1L);
        AddressTypeDefinitionDTO addressTypeDefinitionDTO2 = new AddressTypeDefinitionDTO();
        assertThat(addressTypeDefinitionDTO1).isNotEqualTo(addressTypeDefinitionDTO2);
        addressTypeDefinitionDTO2.setId(addressTypeDefinitionDTO1.getId());
        assertThat(addressTypeDefinitionDTO1).isEqualTo(addressTypeDefinitionDTO2);
        addressTypeDefinitionDTO2.setId(2L);
        assertThat(addressTypeDefinitionDTO1).isNotEqualTo(addressTypeDefinitionDTO2);
        addressTypeDefinitionDTO1.setId(null);
        assertThat(addressTypeDefinitionDTO1).isNotEqualTo(addressTypeDefinitionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(addressTypeDefinitionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(addressTypeDefinitionMapper.fromId(null)).isNull();
    }
}
