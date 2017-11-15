import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('AddressTypeDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let addressTypeDefinitionDialogPage: AddressTypeDefinitionDialogPage;
    let addressTypeDefinitionComponentsPage: AddressTypeDefinitionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load AddressTypeDefinitions', () => {
        navBarPage.goToEntity('address-type-definition-address-utility');
        addressTypeDefinitionComponentsPage = new AddressTypeDefinitionComponentsPage();
        expect(addressTypeDefinitionComponentsPage.getTitle()).toMatch(/stockManagementApp.addressTypeDefinition.home.title/);

    });

    it('should load create AddressTypeDefinition dialog', () => {
        addressTypeDefinitionComponentsPage.clickOnCreateButton();
        addressTypeDefinitionDialogPage = new AddressTypeDefinitionDialogPage();
        expect(addressTypeDefinitionDialogPage.getModalTitle()).toMatch(/stockManagementApp.addressTypeDefinition.home.createOrEditLabel/);
        addressTypeDefinitionDialogPage.close();
    });

    it('should create and save AddressTypeDefinitions', () => {
        addressTypeDefinitionComponentsPage.clickOnCreateButton();
        addressTypeDefinitionDialogPage.setCodeInput('code');
        expect(addressTypeDefinitionDialogPage.getCodeInput()).toMatch('code');
        addressTypeDefinitionDialogPage.setDescriptionInput('description');
        expect(addressTypeDefinitionDialogPage.getDescriptionInput()).toMatch('description');
        addressTypeDefinitionDialogPage.save();
        expect(addressTypeDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AddressTypeDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-address-type-definition-address-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AddressTypeDefinitionDialogPage {
    modalTitle = element(by.css('h4#myAddressTypeDefinitionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    codeInput = element(by.css('input#field_code'));
    descriptionInput = element(by.css('input#field_description'));

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
