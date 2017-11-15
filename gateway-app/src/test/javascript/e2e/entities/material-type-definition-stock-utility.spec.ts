import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('MaterialTypeDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let materialTypeDefinitionDialogPage: MaterialTypeDefinitionDialogPage;
    let materialTypeDefinitionComponentsPage: MaterialTypeDefinitionComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load MaterialTypeDefinitions', () => {
        navBarPage.goToEntity('material-type-definition-stock-utility');
        materialTypeDefinitionComponentsPage = new MaterialTypeDefinitionComponentsPage();
        expect(materialTypeDefinitionComponentsPage.getTitle()).toMatch(/stockManagementApp.materialTypeDefinition.home.title/);

    });

    it('should load create MaterialTypeDefinition dialog', () => {
        materialTypeDefinitionComponentsPage.clickOnCreateButton();
        materialTypeDefinitionDialogPage = new MaterialTypeDefinitionDialogPage();
        expect(materialTypeDefinitionDialogPage.getModalTitle()).toMatch(/stockManagementApp.materialTypeDefinition.home.createOrEditLabel/);
        materialTypeDefinitionDialogPage.close();
    });

    it('should create and save MaterialTypeDefinitions', () => {
        materialTypeDefinitionComponentsPage.clickOnCreateButton();
        materialTypeDefinitionDialogPage.setCodeInput('code');
        expect(materialTypeDefinitionDialogPage.getCodeInput()).toMatch('code');
        materialTypeDefinitionDialogPage.setDescriptionInput('description');
        expect(materialTypeDefinitionDialogPage.getDescriptionInput()).toMatch('description');
        materialTypeDefinitionDialogPage.save();
        expect(materialTypeDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class MaterialTypeDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-material-type-definition-stock-utility div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class MaterialTypeDefinitionDialogPage {
    modalTitle = element(by.css('h4#myMaterialTypeDefinitionLabel'));
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
