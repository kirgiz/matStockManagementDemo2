import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Address e2e test', () => {

    let navBarPage: NavBarPage;
    let addressDialogPage: AddressDialogPage;
    let addressComponentsPage: AddressComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Addresses', () => {
        navBarPage.goToEntity('address-address-utility');
        addressComponentsPage = new AddressComponentsPage();
        expect(addressComponentsPage.getTitle()).toMatch(/stockManagementApp.address.home.title/);

    });

    it('should load create Address dialog', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage = new AddressDialogPage();
        expect(addressDialogPage.getModalTitle()).toMatch(/stockManagementApp.address.home.createOrEditLabel/);
        addressDialogPage.close();
    });

   /* it('should create and save Addresses', () => {
        addressComponentsPage.clickOnCreateButton();
        addressDialogPage.setDescriptionInput('description');
        expect(addressDialogPage.getDescriptionInput()).toMatch('description');
        addressDialogPage.setAddressLine1Input('addressLine1');
        expect(addressDialogPage.getAddressLine1Input()).toMatch('addressLine1');
        addressDialogPage.setAddressLine2Input('addressLine2');
        expect(addressDialogPage.getAddressLine2Input()).toMatch('addressLine2');
        addressDialogPage.setAddressLine3Input('addressLine3');
        expect(addressDialogPage.getAddressLine3Input()).toMatch('addressLine3');
        addressDialogPage.setCityInput('city');
        expect(addressDialogPage.getCityInput()).toMatch('city');
        addressDialogPage.setZipCodeInput('zipCode');
        expect(addressDialogPage.getZipCodeInput()).toMatch('zipCode');
        addressDialogPage.setTypeInput('type');
        expect(addressDialogPage.getTypeInput()).toMatch('type');
        addressDialogPage.addressTypeDefinitionSelectLastOption();
        addressDialogPage.countrySelectLastOption();
        addressDialogPage.thirdSelectLastOption();
        addressDialogPage.save();
        expect(addressDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-address-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressDialogPage {
    modalTitle = element(by.css('h4#myAddressLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    descriptionInput = element(by.css('input#field_description'));
    addressLine1Input = element(by.css('input#field_addressLine1'));
    addressLine2Input = element(by.css('input#field_addressLine2'));
    addressLine3Input = element(by.css('input#field_addressLine3'));
    cityInput = element(by.css('input#field_city'));
    zipCodeInput = element(by.css('input#field_zipCode'));
    typeInput = element(by.css('input#field_type'));
    addressTypeDefinitionSelect = element(by.css('select#field_addressTypeDefinition'));
    countrySelect = element(by.css('select#field_country'));
    thirdSelect = element(by.css('select#field_third'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
    }

    setAddressLine1Input = function (addressLine1) {
        this.addressLine1Input.sendKeys(addressLine1);
    }

    getAddressLine1Input = function () {
        return this.addressLine1Input.getAttribute('value');
    }

    setAddressLine2Input = function (addressLine2) {
        this.addressLine2Input.sendKeys(addressLine2);
    }

    getAddressLine2Input = function () {
        return this.addressLine2Input.getAttribute('value');
    }

    setAddressLine3Input = function (addressLine3) {
        this.addressLine3Input.sendKeys(addressLine3);
    }

    getAddressLine3Input = function () {
        return this.addressLine3Input.getAttribute('value');
    }

    setCityInput = function (city) {
        this.cityInput.sendKeys(city);
    }

    getCityInput = function () {
        return this.cityInput.getAttribute('value');
    }

    setZipCodeInput = function (zipCode) {
        this.zipCodeInput.sendKeys(zipCode);
    }

    getZipCodeInput = function () {
        return this.zipCodeInput.getAttribute('value');
    }

    setTypeInput = function (type) {
        this.typeInput.sendKeys(type);
    }

    getTypeInput = function () {
        return this.typeInput.getAttribute('value');
    }

    addressTypeDefinitionSelectLastOption = function () {
        this.addressTypeDefinitionSelect.all(by.tagName('option')).last().click();
    }

    addressTypeDefinitionSelectOption = function (option) {
        this.addressTypeDefinitionSelect.sendKeys(option);
    }

    getAddressTypeDefinitionSelect = function () {
        return this.addressTypeDefinitionSelect;
    }

    getAddressTypeDefinitionSelectedOption = function () {
        return this.addressTypeDefinitionSelect.element(by.css('option:checked')).getText();
    }

    countrySelectLastOption = function () {
        this.countrySelect.all(by.tagName('option')).last().click();
    }

    countrySelectOption = function (option) {
        this.countrySelect.sendKeys(option);
    }

    getCountrySelect = function () {
        return this.countrySelect;
    }

    getCountrySelectedOption = function () {
        return this.countrySelect.element(by.css('option:checked')).getText();
    }

    thirdSelectLastOption = function () {
        this.thirdSelect.all(by.tagName('option')).last().click();
    }

    thirdSelectOption = function (option) {
        this.thirdSelect.sendKeys(option);
    }

    getThirdSelect = function () {
        return this.thirdSelect;
    }

    getThirdSelectedOption = function () {
        return this.thirdSelect.element(by.css('option:checked')).getText();
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
