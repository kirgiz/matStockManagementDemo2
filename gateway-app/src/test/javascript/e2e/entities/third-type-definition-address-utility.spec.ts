import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('ThirdTypeDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let thirdTypeDefinitionDialogPage: ThirdTypeDefinitionDialogPage;
    let thirdTypeDefinitionComponentsPage: ThirdTypeDefinitionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ThirdTypeDefinitions', () => {
        navBarPage.goToEntity('third-type-definition-address-utility');
        thirdTypeDefinitionComponentsPage = new ThirdTypeDefinitionComponentsPage();
        expect(thirdTypeDefinitionComponentsPage.getTitle()).toMatch(/stockManagementApp.thirdTypeDefinition.home.title/);

    });

    it('should load create ThirdTypeDefinition dialog', () => {
        thirdTypeDefinitionComponentsPage.clickOnCreateButton();
        thirdTypeDefinitionDialogPage = new ThirdTypeDefinitionDialogPage();
        expect(thirdTypeDefinitionDialogPage.getModalTitle()).toMatch(/stockManagementApp.thirdTypeDefinition.home.createOrEditLabel/);
        thirdTypeDefinitionDialogPage.close();
    });

    it('should create and save ThirdTypeDefinitions', () => {
        thirdTypeDefinitionComponentsPage.clickOnCreateButton();
        thirdTypeDefinitionDialogPage.setCodeInput('code');
        expect(thirdTypeDefinitionDialogPage.getCodeInput()).toMatch('code');
        thirdTypeDefinitionDialogPage.setDescriptionInput('description');
        expect(thirdTypeDefinitionDialogPage.getDescriptionInput()).toMatch('description');
        thirdTypeDefinitionDialogPage.save();
        expect(thirdTypeDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ThirdTypeDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-third-type-definition-address-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ThirdTypeDefinitionDialogPage {
    modalTitle = element(by.css('h4#myThirdTypeDefinitionLabel'));
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
