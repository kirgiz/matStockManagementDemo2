import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Material e2e test', () => {

    let navBarPage: NavBarPage;
    let materialDialogPage: MaterialDialogPage;
    let materialComponentsPage: MaterialComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Materials', () => {
        navBarPage.goToEntity('material-stock-utility');
        materialComponentsPage = new MaterialComponentsPage();
        expect(materialComponentsPage.getTitle()).toMatch(/stockManagementApp.material.home.title/);

    });

    it('should load create Material dialog', () => {
        materialComponentsPage.clickOnCreateButton();
        materialDialogPage = new MaterialDialogPage();
        expect(materialDialogPage.getModalTitle()).toMatch(/stockManagementApp.material.home.createOrEditLabel/);
        materialDialogPage.close();
    });

   /* it('should create and save Materials', () => {
        materialComponentsPage.clickOnCreateButton();
        materialDialogPage.setCodeInput('code');
        expect(materialDialogPage.getCodeInput()).toMatch('code');
        materialDialogPage.setDescriptionInput('description');
        expect(materialDialogPage.getDescriptionInput()).toMatch('description');
        materialDialogPage.setWarehouseIdInput('5');
        expect(materialDialogPage.getWarehouseIdInput()).toMatch('5');
        materialDialogPage.setCreationDateInput('2000-12-31');
        expect(materialDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        materialDialogPage.lotSelectLastOption();
        materialDialogPage.materialTypeDefinitionSelectLastOption();
        materialDialogPage.save();
        expect(materialDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MaterialComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-material-stock-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MaterialDialogPage {
    modalTitle = element(by.css('h4#myMaterialLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));
    warehouseIdInput = element(by.css('input#field_warehouseId'));
    creationDateInput = element(by.css('input#field_creationDate'));
    lotSelect = element(by.css('select#field_lot'));
    materialTypeDefinitionSelect = element(by.css('select#field_materialTypeDefinition'));

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

    setWarehouseIdInput = function (warehouseId) {
        this.warehouseIdInput.sendKeys(warehouseId);
    }

    getWarehouseIdInput = function () {
        return this.warehouseIdInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    lotSelectLastOption = function () {
        this.lotSelect.all(by.tagName('option')).last().click();
    }

    lotSelectOption = function (option) {
        this.lotSelect.sendKeys(option);
    }

    getLotSelect = function () {
        return this.lotSelect;
    }

    getLotSelectedOption = function () {
        return this.lotSelect.element(by.css('option:checked')).getText();
    }

    materialTypeDefinitionSelectLastOption = function () {
        this.materialTypeDefinitionSelect.all(by.tagName('option')).last().click();
    }

    materialTypeDefinitionSelectOption = function (option) {
        this.materialTypeDefinitionSelect.sendKeys(option);
    }

    getMaterialTypeDefinitionSelect = function () {
        return this.materialTypeDefinitionSelect;
    }

    getMaterialTypeDefinitionSelectedOption = function () {
        return this.materialTypeDefinitionSelect.element(by.css('option:checked')).getText();
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
