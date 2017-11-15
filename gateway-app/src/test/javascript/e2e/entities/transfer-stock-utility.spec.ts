import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Transfer e2e test', () => {

    let navBarPage: NavBarPage;
    let transferDialogPage: TransferDialogPage;
    let transferComponentsPage: TransferComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Transfers', () => {
        navBarPage.goToEntity('transfer-stock-utility');
        transferComponentsPage = new TransferComponentsPage();
        expect(transferComponentsPage.getTitle()).toMatch(/stockManagementApp.transfer.home.title/);

    });

    it('should load create Transfer dialog', () => {
        transferComponentsPage.clickOnCreateButton();
        transferDialogPage = new TransferDialogPage();
        expect(transferDialogPage.getModalTitle()).toMatch(/stockManagementApp.transfer.home.createOrEditLabel/);
        transferDialogPage.close();
    });

    it('should create and save Transfers', () => {
        transferComponentsPage.clickOnCreateButton();
        transferDialogPage.setCodeInput('code');
        expect(transferDialogPage.getCodeInput()).toMatch('code');
        transferDialogPage.setDescriptionInput('description');
        expect(transferDialogPage.getDescriptionInput()).toMatch('description');
        transferDialogPage.setWarehouseFromIdInput('5');
        expect(transferDialogPage.getWarehouseFromIdInput()).toMatch('5');
        transferDialogPage.setWarehouseToIdInput('5');
        expect(transferDialogPage.getWarehouseToIdInput()).toMatch('5');
        transferDialogPage.setCreationDateInput('2000-12-31');
        expect(transferDialogPage.getCreationDateInput()).toMatch('2000-12-31');
        transferDialogPage.setValidationDateInput('2000-12-31');
        expect(transferDialogPage.getValidationDateInput()).toMatch('2000-12-31');
        transferDialogPage.setUserIdInput('5');
        expect(transferDialogPage.getUserIdInput()).toMatch('5');
        // transferDialogPage.itemTransferedSelectLastOption();
        transferDialogPage.save();
        expect(transferDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TransferComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-transfer-stock-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TransferDialogPage {
    modalTitle = element(by.css('h4#myTransferLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));
    warehouseFromIdInput = element(by.css('input#field_warehouseFromId'));
    warehouseToIdInput = element(by.css('input#field_warehouseToId'));
    creationDateInput = element(by.css('input#field_creationDate'));
    validationDateInput = element(by.css('input#field_validationDate'));
    userIdInput = element(by.css('input#field_userId'));
    itemTransferedSelect = element(by.css('select#field_itemTransfered'));

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

    setWarehouseFromIdInput = function (warehouseFromId) {
        this.warehouseFromIdInput.sendKeys(warehouseFromId);
    }

    getWarehouseFromIdInput = function () {
        return this.warehouseFromIdInput.getAttribute('value');
    }

    setWarehouseToIdInput = function (warehouseToId) {
        this.warehouseToIdInput.sendKeys(warehouseToId);
    }

    getWarehouseToIdInput = function () {
        return this.warehouseToIdInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    setValidationDateInput = function (validationDate) {
        this.validationDateInput.sendKeys(validationDate);
    }

    getValidationDateInput = function () {
        return this.validationDateInput.getAttribute('value');
    }

    setUserIdInput = function (userId) {
        this.userIdInput.sendKeys(userId);
    }

    getUserIdInput = function () {
        return this.userIdInput.getAttribute('value');
    }

    itemTransferedSelectLastOption = function () {
        this.itemTransferedSelect.all(by.tagName('option')).last().click();
    }

    itemTransferedSelectOption = function (option) {
        this.itemTransferedSelect.sendKeys(option);
    }

    getItemTransferedSelect = function () {
        return this.itemTransferedSelect;
    }

    getItemTransferedSelectedOption = function () {
        return this.itemTransferedSelect.element(by.css('option:checked')).getText();
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
