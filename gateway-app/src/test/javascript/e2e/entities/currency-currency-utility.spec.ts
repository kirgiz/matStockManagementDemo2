import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Currency e2e test', () => {

    let navBarPage: NavBarPage;
    let currencyDialogPage: CurrencyDialogPage;
    let currencyComponentsPage: CurrencyComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Currencies', () => {
        navBarPage.goToEntity('currency-currency-utility');
        currencyComponentsPage = new CurrencyComponentsPage();
        expect(currencyComponentsPage.getTitle()).toMatch(/stockManagementApp.currency.home.title/);

    });

    it('should load create Currency dialog', () => {
        currencyComponentsPage.clickOnCreateButton();
        currencyDialogPage = new CurrencyDialogPage();
        expect(currencyDialogPage.getModalTitle()).toMatch(/stockManagementApp.currency.home.createOrEditLabel/);
        currencyDialogPage.close();
    });

    it('should create and save Currencies', () => {
        currencyComponentsPage.clickOnCreateButton();
        currencyDialogPage.setIsoCodeInput('isoCode');
        expect(currencyDialogPage.getIsoCodeInput()).toMatch('isoCode');
        currencyDialogPage.setDescriptionInput('description');
        expect(currencyDialogPage.getDescriptionInput()).toMatch('description');
        currencyDialogPage.save();
        expect(currencyDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CurrencyComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-currency-currency-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CurrencyDialogPage {
    modalTitle = element(by.css('h4#myCurrencyLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    isoCodeInput = element(by.css('input#field_isoCode'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setIsoCodeInput = function (isoCode) {
        this.isoCodeInput.sendKeys(isoCode);
    }

    getIsoCodeInput = function () {
        return this.isoCodeInput.getAttribute('value');
    }

    setDescriptionInput = function (description) {
        this.descriptionInput.sendKeys(description);
    }

    getDescriptionInput = function () {
        return this.descriptionInput.getAttribute('value');
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
