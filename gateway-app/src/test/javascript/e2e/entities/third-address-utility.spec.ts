import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('Third e2e test', () => {

    let navBarPage: NavBarPage;
    let thirdDialogPage: ThirdDialogPage;
    let thirdComponentsPage: ThirdComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Thirds', () => {
        navBarPage.goToEntity('third-address-utility');
        thirdComponentsPage = new ThirdComponentsPage();
        expect(thirdComponentsPage.getTitle()).toMatch(/stockManagementApp.third.home.title/);

    });

    it('should load create Third dialog', () => {
        thirdComponentsPage.clickOnCreateButton();
        thirdDialogPage = new ThirdDialogPage();
        expect(thirdDialogPage.getModalTitle()).toMatch(/stockManagementApp.third.home.createOrEditLabel/);
        thirdDialogPage.close();
    });

   /* it('should create and save Thirds', () => {
        thirdComponentsPage.clickOnCreateButton();
        thirdDialogPage.setCodeInput('code');
        expect(thirdDialogPage.getCodeInput()).toMatch('code');
        thirdDialogPage.setDescriptionInput('description');
        expect(thirdDialogPage.getDescriptionInput()).toMatch('description');
        thirdDialogPage.thirdTypeDefinitionSelectLastOption();
        thirdDialogPage.save();
        expect(thirdDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); */

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ThirdComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-third-address-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ThirdDialogPage {
    modalTitle = element(by.css('h4#myThirdLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));
    thirdTypeDefinitionSelect = element(by.css('select#field_thirdTypeDefinition'));

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

    thirdTypeDefinitionSelectLastOption = function () {
        this.thirdTypeDefinitionSelect.all(by.tagName('option')).last().click();
    }

    thirdTypeDefinitionSelectOption = function (option) {
        this.thirdTypeDefinitionSelect.sendKeys(option);
    }

    getThirdTypeDefinitionSelect = function () {
        return this.thirdTypeDefinitionSelect;
    }

    getThirdTypeDefinitionSelectedOption = function () {
        return this.thirdTypeDefinitionSelect.element(by.css('option:checked')).getText();
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
