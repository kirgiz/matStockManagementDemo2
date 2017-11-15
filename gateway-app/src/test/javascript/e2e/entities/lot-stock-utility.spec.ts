import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Lot e2e test', () => {

    let navBarPage: NavBarPage;
    let lotDialogPage: LotDialogPage;
    let lotComponentsPage: LotComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Lots', () => {
        navBarPage.goToEntity('lot-stock-utility');
        lotComponentsPage = new LotComponentsPage();
        expect(lotComponentsPage.getTitle()).toMatch(/stockManagementApp.lot.home.title/);

    });

    it('should load create Lot dialog', () => {
        lotComponentsPage.clickOnCreateButton();
        lotDialogPage = new LotDialogPage();
        expect(lotDialogPage.getModalTitle()).toMatch(/stockManagementApp.lot.home.createOrEditLabel/);
        lotDialogPage.close();
    });

    it('should create and save Lots', () => {
        lotComponentsPage.clickOnCreateButton();
        lotDialogPage.setCodeInput('code');
        expect(lotDialogPage.getCodeInput()).toMatch('code');
        lotDialogPage.setDescriptionInput('description');
        expect(lotDialogPage.getDescriptionInput()).toMatch('description');
        lotDialogPage.setExternalReferenceInput('externalReference');
        expect(lotDialogPage.getExternalReferenceInput()).toMatch('externalReference');
        lotDialogPage.setOriginalCurrencyIdInput('5');
        expect(lotDialogPage.getOriginalCurrencyIdInput()).toMatch('5');
        lotDialogPage.setSellCurrencyIdInput('5');
        expect(lotDialogPage.getSellCurrencyIdInput()).toMatch('5');
        lotDialogPage.setQuantityInput('5');
        expect(lotDialogPage.getQuantityInput()).toMatch('5');
        lotDialogPage.setUnitPriceInput('5');
        expect(lotDialogPage.getUnitPriceInput()).toMatch('5');
        lotDialogPage.setAdditionalInformationInput('additionalInformation');
        expect(lotDialogPage.getAdditionalInformationInput()).toMatch('additionalInformation');
        lotDialogPage.setCreationDateInput('2000-12-31');
        expect(lotDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        lotDialogPage.save();
        expect(lotDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LotComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-lot-stock-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LotDialogPage {
    modalTitle = element(by.css('h4#myLotLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));
    externalReferenceInput = element(by.css('input#field_externalReference'));
    originalCurrencyIdInput = element(by.css('input#field_originalCurrencyId'));
    sellCurrencyIdInput = element(by.css('input#field_sellCurrencyId'));
    quantityInput = element(by.css('input#field_quantity'));
    unitPriceInput = element(by.css('input#field_unitPrice'));
    additionalInformationInput = element(by.css('textarea#field_additionalInformation'));
    creationDateInput = element(by.css('input#field_creationDate'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setCodeInput = function (code) {
        this.codeInput.sendKeys(code);
    }

    getCodeInput = function () {
        return this.codeInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setExternalReferenceInput = function (externalReference) {
        this.externalReferenceInput.sendKeys(externalReference);
    }

    getExternalReferenceInput = function () {
        return this.externalReferenceInput.getAttribute('value');
    }

    setOriginalCurrencyIdInput = function (originalCurrencyId) {
        this.originalCurrencyIdInput.sendKeys(originalCurrencyId);
    }

    getOriginalCurrencyIdInput = function () {
        return this.originalCurrencyIdInput.getAttribute('value');
    }

    setSellCurrencyIdInput = function (sellCurrencyId) {
        this.sellCurrencyIdInput.sendKeys(sellCurrencyId);
    }

    getSellCurrencyIdInput = function () {
        return this.sellCurrencyIdInput.getAttribute('value');
    }

    setQuantityInput = function (quantity) {
        this.quantityInput.sendKeys(quantity);
    }

    getQuantityInput = function () {
        return this.quantityInput.getAttribute('value');
    }

    setUnitPriceInput = function (unitPrice) {
        this.unitPriceInput.sendKeys(unitPrice);
    }

    getUnitPriceInput = function () {
        return this.unitPriceInput.getAttribute('value');
    }

    setAdditionalInformationInput = function (additionalInformation) {
        this.additionalInformationInput.sendKeys(additionalInformation);
    }

    getAdditionalInformationInput = function () {
        return this.additionalInformationInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
