import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Rate e2e test', () => {

    let navBarPage: NavBarPage;
    let rateDialogPage: RateDialogPage;
    let rateComponentsPage: RateComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Rates', () => {
        navBarPage.goToEntity('rate-currency-utility');
        rateComponentsPage = new RateComponentsPage();
        expect(rateComponentsPage.getTitle()).toMatch(/stockManagementApp.rate.home.title/);

    });

    it('should load create Rate dialog', () => {
        rateComponentsPage.clickOnCreateButton();
        rateDialogPage = new RateDialogPage();
        expect(rateDialogPage.getModalTitle()).toMatch(/stockManagementApp.rate.home.createOrEditLabel/);
        rateDialogPage.close();
    });

   /* it('should create and save Rates', () => {
        rateComponentsPage.clickOnCreateButton();
        rateDialogPage.setFactorInput('5');
        expect(rateDialogPage.getFactorInput()).toMatch('5');
        rateDialogPage.setSpotRateDateInput('2000-12-31');
        expect(rateDialogPage.getSpotRateDateInput()).toMatch('2000-12-31');
        rateDialogPage.setRateInput('5');
        expect(rateDialogPage.getRateInput()).toMatch('5');
        rateDialogPage.currencyFromSelectLastOption();
        rateDialogPage.currencyToSelectLastOption();
        rateDialogPage.save();
        expect(rateDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RateComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-rate-currency-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RateDialogPage {
    modalTitle = element(by.css('h4#myRateLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    factorInput = element(by.css('input#field_factor'));
    spotRateDateInput = element(by.css('input#field_spotRateDate'));
    rateInput = element(by.css('input#field_rate'));
    currencyFromSelect = element(by.css('select#field_currencyFrom'));
    currencyToSelect = element(by.css('select#field_currencyTo'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFactorInput = function (factor) {
        this.factorInput.sendKeys(factor);
    }

    getFactorInput = function () {
        return this.factorInput.getAttribute('value');
    }

    setSpotRateDateInput = function (spotRateDate) {
        this.spotRateDateInput.sendKeys(spotRateDate);
    }

    getSpotRateDateInput = function () {
        return this.spotRateDateInput.getAttribute('value');
    }

    setRateInput = function (rate) {
        this.rateInput.sendKeys(rate);
    }

    getRateInput = function () {
        return this.rateInput.getAttribute('value');
    }

    currencyFromSelectLastOption = function () {
        this.currencyFromSelect.all(by.tagName('option')).last().click();
    }

    currencyFromSelectOption = function (option) {
        this.currencyFromSelect.sendKeys(option);
    }

    getCurrencyFromSelect = function () {
        return this.currencyFromSelect;
    }

    getCurrencyFromSelectedOption = function () {
        return this.currencyFromSelect.element(by.css('option:checked')).getText();
    }

    currencyToSelectLastOption = function () {
        this.currencyToSelect.all(by.tagName('option')).last().click();
    }

    currencyToSelectOption = function (option) {
        this.currencyToSelect.sendKeys(option);
    }

    getCurrencyToSelect = function () {
        return this.currencyToSelect;
    }

    getCurrencyToSelectedOption = function () {
        return this.currencyToSelect.element(by.css('option:checked')).getText();
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
