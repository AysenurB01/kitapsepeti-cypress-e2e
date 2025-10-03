class PaymentFlowPage {

    BuyButton='#cart-buy-btn';
    addressPageHeader='#order-nav > .row > :nth-child(1)';
    continueToPaymentButton='.col-7 > .btn';   // Adres sayfasındaki "Ödeme Adımına Geç" butonu
    paymentPageHeader='#order-nav > .row > :nth-child(2)';
    tyzicoOption='#iyz-tab-payWithIyzico';   // İyzico ödeme sekmesi 
    cardPaymentOption='#iyz-tab-credit-card';  // Kartla ödeme sekmesi

    cardInformationInput='.css-5lmu8w-CardInputGroupContainer'; // Kart inputlarının genel kapsayıcısı (görünürlük kontrolü için)
    cardNameInput='#ccname'; 
    cardNumberInput='#ccnumber';
    cardExpiryInput='#ccexp';
    cardCVCInput='#cccvc';
    paymentSubmitButton='#iyz-payment-button';  // Öde butonu
    paymentSubmitButtonText='#iyz-payment-button > span';  // Ödeme butonunun üzerindeki metin
    errorMessage='.css-1gwypqx-BaseTextBlock-BaseTextStyle';  // Eksik bilgi girildiğinde çıkan hata mesajı


    /** Satın Al butonuna tıklar. */
    clickBuyButton() {
        cy.get(this.BuyButton)
            .should('be.visible')
            .click();
    }
    
    /** Adres Bilgileri sayfasının URL ve başlık üzerinden yüklendiğini doğrular. */
    verifyAddressPageLoaded() {
        cy.url().should('include', '/order/');
        cy.get(this.addressPageHeader, { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Adres Bilgileri'); 
    }

     /** Adres sayfasındaki "Ödeme Adımına Geç" butonuna tıklar. */
    clickContinueToPaymentButton() {
        cy.get(this.continueToPaymentButton, { timeout: 20000 })
        .should('be.visible')
        .click();
    }

    /** Ödeme Bilgileri sayfasının URL ve başlık üzerinden yüklendiğini doğrular. */
    verifyPaymentPageLoaded() {
        cy.url({ timeout: 10000 }).should('include', '/order/payment');
        cy.get(this.paymentPageHeader, { timeout: 10000 })
            .should('be.visible')
            .and('contain', 'Ödeme Bilgileri'); 
    }
    
    /** Ödeme seçeneklerinin (İyzico ve Kart) görünür olduğunu doğrular. */
    verifyPaymentOptionsVisible() {
        cy.get(this.tyzicoOption, { timeout: 15000 }).should('be.visible');
        cy.get(this.cardPaymentOption, { timeout: 15000 }).should('be.visible');
    }

    /** Kartla Ödeme sekmesine tıklar. */
    selectCreditCardPayment() {
        cy.get(this.cardPaymentOption, { timeout: 20000 }).click();
    }

    /** Kart bilgisi giriş alanlarının göründüğünü doğrular. */
    verifyCardInformationInputVisible() {
        cy.get(this.cardInformationInput, { timeout: 10000 })
            .should('be.visible')
    }

    /** Kredi kartı formunu doldurur. */
    fillCreditCardForm(name, number, expiry, cvv) {
        cy.get(this.cardNameInput).should('be.visible').type(name);
        cy.get(this.cardNumberInput).should('be.visible').type(number);
        cy.get(this.cardExpiryInput).should('be.visible').type(expiry);
        cy.get(this.cardCVCInput).should('be.visible').type(cvv);
    }

    /** Ödeme butonunun aktif (disabled değil) olduğunu doğrular. */
    verifyPaymentButtonIsActive() {
        cy.get(this.paymentSubmitButton, { timeout: 10000 })
            .should('be.visible')
            .and('not.be.disabled') // Butonun aktif (tıklanabilir) olduğunu doğrular.
            .should('have.css', 'background-color', 'rgb(30, 100, 255)') //  Mavi rengi doğrular
            .find(this.paymentSubmitButtonText)
            .should('not.be.empty'); // Buton metninin var olduğunu kontrol eder.
    }

    /** Ödeme butonunun pasif (disabled) olduğunu doğrular. */
    verifyPaymentButtonIsInactive() {
        cy.get(this.paymentSubmitButton, { timeout: 5000 })
            .should('be.visible')
            .and('not.have.class', 'background-color', 'rgb(74, 144, 226)') //Mavi rengin görünmediğini doğrular
            .find(this.paymentSubmitButtonText)
            .should('not.be.empty');
    }

    /** Kart alanlarının boş olduğunu doğrular. */
    verifyCardFieldsEmpty() {
        cy.get(this.cardNameInput).should('have.value', '');
        cy.get(this.cardNumberInput).should('have.value', '');
        cy.get(this.cardExpiryInput).should('have.value', '');
        cy.get(this.cardCVCInput).should('have.value', '');
    }

    /** Eksik kart bilgileri ile öde butonuna tıklanır. */
    clickPaymentSubmitButton() {
        cy.get(this.paymentSubmitButton).click();
    }

    /** Eksik kart bilgisi girildiğinde çıkan hata mesajını doğrular. */
    verifyErrorMessage(){
        cy.get(this.errorMessage, { timeout: 5000 })
            .should('be.visible')
            .and('contain', 'Lütfen tüm alanları doldurunuz');  
    }

}

export default new PaymentFlowPage();


