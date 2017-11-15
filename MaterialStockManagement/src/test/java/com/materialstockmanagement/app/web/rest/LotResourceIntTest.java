package com.materialstockmanagement.app.web.rest;

import com.materialstockmanagement.app.MaterialStockManagementApp;

import com.materialstockmanagement.app.domain.Lot;
import com.materialstockmanagement.app.repository.LotRepository;
import com.materialstockmanagement.app.service.LotService;
import com.materialstockmanagement.app.repository.search.LotSearchRepository;
import com.materialstockmanagement.app.service.dto.LotDTO;
import com.materialstockmanagement.app.service.mapper.LotMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the LotResource REST controller.
 *
 * @see LotResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MaterialStockManagementApp.class)
public class LotResourceIntTest {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_EXTERNAL_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_EXTERNAL_REFERENCE = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORIGINAL_CURRENCY_ID = 1;
    private static final Integer UPDATED_ORIGINAL_CURRENCY_ID = 2;

    private static final Integer DEFAULT_SELL_CURRENCY_ID = 1;
    private static final Integer UPDATED_SELL_CURRENCY_ID = 2;

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final Double DEFAULT_UNIT_PRICE = 1D;
    private static final Double UPDATED_UNIT_PRICE = 2D;

    private static final String DEFAULT_ADDITIONAL_INFORMATION = "AAAAAAAAAA";
    private static final String UPDATED_ADDITIONAL_INFORMATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private LotRepository lotRepository;

    @Autowired
    private LotMapper lotMapper;

    @Autowired
    private LotService lotService;

    @Autowired
    private LotSearchRepository lotSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restLotMockMvc;

    private Lot lot;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final LotResource lotResource = new LotResource(lotService);
        this.restLotMockMvc = MockMvcBuilders.standaloneSetup(lotResource)
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
    public static Lot createEntity(EntityManager em) {
        Lot lot = new Lot()
            .code(DEFAULT_CODE)
            .description(DEFAULT_DESCRIPTION)
            .externalReference(DEFAULT_EXTERNAL_REFERENCE)
            .originalCurrencyId(DEFAULT_ORIGINAL_CURRENCY_ID)
            .sellCurrencyId(DEFAULT_SELL_CURRENCY_ID)
            .quantity(DEFAULT_QUANTITY)
            .unitPrice(DEFAULT_UNIT_PRICE)
            .additionalInformation(DEFAULT_ADDITIONAL_INFORMATION)
            .creationDate(DEFAULT_CREATION_DATE);
        return lot;
    }

    @Before
    public void initTest() {
        lotSearchRepository.deleteAll();
        lot = createEntity(em);
    }

    @Test
    @Transactional
    public void createLot() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot
        LotDTO lotDTO = lotMapper.toDto(lot);
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isCreated());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate + 1);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testLot.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testLot.getExternalReference()).isEqualTo(DEFAULT_EXTERNAL_REFERENCE);
        assertThat(testLot.getOriginalCurrencyId()).isEqualTo(DEFAULT_ORIGINAL_CURRENCY_ID);
        assertThat(testLot.getSellCurrencyId()).isEqualTo(DEFAULT_SELL_CURRENCY_ID);
        assertThat(testLot.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
        assertThat(testLot.getUnitPrice()).isEqualTo(DEFAULT_UNIT_PRICE);
        assertThat(testLot.getAdditionalInformation()).isEqualTo(DEFAULT_ADDITIONAL_INFORMATION);
        assertThat(testLot.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);

        // Validate the Lot in Elasticsearch
        Lot lotEs = lotSearchRepository.findOne(testLot.getId());
        assertThat(lotEs).isEqualToComparingFieldByField(testLot);
    }

    @Test
    @Transactional
    public void createLotWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = lotRepository.findAll().size();

        // Create the Lot with an existing ID
        lot.setId(1L);
        LotDTO lotDTO = lotMapper.toDto(lot);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLotMockMvc.perform(post("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllLots() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get all the lotList
        restLotMockMvc.perform(get("/api/lots?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].externalReference").value(hasItem(DEFAULT_EXTERNAL_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].originalCurrencyId").value(hasItem(DEFAULT_ORIGINAL_CURRENCY_ID)))
            .andExpect(jsonPath("$.[*].sellCurrencyId").value(hasItem(DEFAULT_SELL_CURRENCY_ID)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].additionalInformation").value(hasItem(DEFAULT_ADDITIONAL_INFORMATION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void getLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);

        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", lot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(lot.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.externalReference").value(DEFAULT_EXTERNAL_REFERENCE.toString()))
            .andExpect(jsonPath("$.originalCurrencyId").value(DEFAULT_ORIGINAL_CURRENCY_ID))
            .andExpect(jsonPath("$.sellCurrencyId").value(DEFAULT_SELL_CURRENCY_ID))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY))
            .andExpect(jsonPath("$.unitPrice").value(DEFAULT_UNIT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.additionalInformation").value(DEFAULT_ADDITIONAL_INFORMATION.toString()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingLot() throws Exception {
        // Get the lot
        restLotMockMvc.perform(get("/api/lots/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);
        lotSearchRepository.save(lot);
        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Update the lot
        Lot updatedLot = lotRepository.findOne(lot.getId());
        updatedLot
            .code(UPDATED_CODE)
            .description(UPDATED_DESCRIPTION)
            .externalReference(UPDATED_EXTERNAL_REFERENCE)
            .originalCurrencyId(UPDATED_ORIGINAL_CURRENCY_ID)
            .sellCurrencyId(UPDATED_SELL_CURRENCY_ID)
            .quantity(UPDATED_QUANTITY)
            .unitPrice(UPDATED_UNIT_PRICE)
            .additionalInformation(UPDATED_ADDITIONAL_INFORMATION)
            .creationDate(UPDATED_CREATION_DATE);
        LotDTO lotDTO = lotMapper.toDto(updatedLot);

        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isOk());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate);
        Lot testLot = lotList.get(lotList.size() - 1);
        assertThat(testLot.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testLot.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testLot.getExternalReference()).isEqualTo(UPDATED_EXTERNAL_REFERENCE);
        assertThat(testLot.getOriginalCurrencyId()).isEqualTo(UPDATED_ORIGINAL_CURRENCY_ID);
        assertThat(testLot.getSellCurrencyId()).isEqualTo(UPDATED_SELL_CURRENCY_ID);
        assertThat(testLot.getQuantity()).isEqualTo(UPDATED_QUANTITY);
        assertThat(testLot.getUnitPrice()).isEqualTo(UPDATED_UNIT_PRICE);
        assertThat(testLot.getAdditionalInformation()).isEqualTo(UPDATED_ADDITIONAL_INFORMATION);
        assertThat(testLot.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);

        // Validate the Lot in Elasticsearch
        Lot lotEs = lotSearchRepository.findOne(testLot.getId());
        assertThat(lotEs).isEqualToComparingFieldByField(testLot);
    }

    @Test
    @Transactional
    public void updateNonExistingLot() throws Exception {
        int databaseSizeBeforeUpdate = lotRepository.findAll().size();

        // Create the Lot
        LotDTO lotDTO = lotMapper.toDto(lot);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restLotMockMvc.perform(put("/api/lots")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(lotDTO)))
            .andExpect(status().isCreated());

        // Validate the Lot in the database
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);
        lotSearchRepository.save(lot);
        int databaseSizeBeforeDelete = lotRepository.findAll().size();

        // Get the lot
        restLotMockMvc.perform(delete("/api/lots/{id}", lot.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean lotExistsInEs = lotSearchRepository.exists(lot.getId());
        assertThat(lotExistsInEs).isFalse();

        // Validate the database is empty
        List<Lot> lotList = lotRepository.findAll();
        assertThat(lotList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchLot() throws Exception {
        // Initialize the database
        lotRepository.saveAndFlush(lot);
        lotSearchRepository.save(lot);

        // Search the lot
        restLotMockMvc.perform(get("/api/_search/lots?query=id:" + lot.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(lot.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].externalReference").value(hasItem(DEFAULT_EXTERNAL_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].originalCurrencyId").value(hasItem(DEFAULT_ORIGINAL_CURRENCY_ID)))
            .andExpect(jsonPath("$.[*].sellCurrencyId").value(hasItem(DEFAULT_SELL_CURRENCY_ID)))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)))
            .andExpect(jsonPath("$.[*].unitPrice").value(hasItem(DEFAULT_UNIT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].additionalInformation").value(hasItem(DEFAULT_ADDITIONAL_INFORMATION.toString())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Lot.class);
        Lot lot1 = new Lot();
        lot1.setId(1L);
        Lot lot2 = new Lot();
        lot2.setId(lot1.getId());
        assertThat(lot1).isEqualTo(lot2);
        lot2.setId(2L);
        assertThat(lot1).isNotEqualTo(lot2);
        lot1.setId(null);
        assertThat(lot1).isNotEqualTo(lot2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(LotDTO.class);
        LotDTO lotDTO1 = new LotDTO();
        lotDTO1.setId(1L);
        LotDTO lotDTO2 = new LotDTO();
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
        lotDTO2.setId(lotDTO1.getId());
        assertThat(lotDTO1).isEqualTo(lotDTO2);
        lotDTO2.setId(2L);
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
        lotDTO1.setId(null);
        assertThat(lotDTO1).isNotEqualTo(lotDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(lotMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(lotMapper.fromId(null)).isNull();
    }
}
