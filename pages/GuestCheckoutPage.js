class GuestCheckoutPage {

    continueAsGuestButton='#membership-form-131';
    addressTitle='#order-nav > .row > :nth-child(1)';
    guestNameInput='#fullname'; 
    guestEmailInput='[name="email"]';
    citySelect='[name="city_code"]';
    townSelect='[name="town_code"]';
    districtSelect='[name="district_code"]';
    guestPhoneInput='[name="mobile_phone"]';
    fullAddressTextarea='[name="address"]';
    saveAddressButton='.col-12 > .btn';
    paymentPageHeader='#order-nav > .row > :nth-child(2)';
    errorMessage='.popover-item';


    verifyGuestPageLoaded() {
        cy.url().should('include', '/siparis-uye-giris', { timeout: 15000 });
        cy.get(this.continueAsGuestButton, { timeout: 10000 }).should('be.visible');
    }
    
    clickContinueAsGuestButton(){
        cy.get(this.continueAsGuestButton)
            .should('be.visible')
            .click();
    }

    verifyAddressPageLoaded() {
        cy.get(this.addressTitle).should('be.visible');
    }

    fillNewGuestAddress(name, email, city, town, district, fullAddress, phone) {
        cy.get(this.guestNameInput, { timeout: 10000 }).type(name);
        cy.get(this.guestEmailInput).type(email);
        cy.get(this.citySelect).select(city);
        cy.get(this.townSelect).select(town);
        cy.get(this.districtSelect, { timeout: 10000 }).select(district);
        cy.get(this.fullAddressTextarea).clear().type(fullAddress);
        cy.get(this.guestPhoneInput).type(phone);
    }

    clickSaveAddressButton() {
        cy.get(this.saveAddressButton)
            .should('be.visible')
            .click();
    }

    verifyErrorMessage() {
        cy.get(this.errorMessage)
            .should('be.visible')
            .and('contain', 'Lütfen bu alanı doldurunuz');
    }

}

export default new GuestCheckoutPage();





