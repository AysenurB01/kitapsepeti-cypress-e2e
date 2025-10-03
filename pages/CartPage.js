class CartPage {

    cartModal='.drawer-wrapper.closable-active.active > .drawer-header';  // Genel sağ sepet modal kapsayıcı seçicisi
    productRow='.drawer-body > #cart-1001-default'; // Modal içindeki ürün satırı seçicisi
    productName='.cp-title';
    productQuantityInput='#qtyHeaderCart348650'; 
    productCartTotal='.fw-black > .text-right';
    productTotalPrice='.fw-bold > .text-right';
    productShippingFee='.col-12 > :nth-child(2) > .text-right';
    goToCartButton='#go-cart-btn';

    cartPageHeader='.col-12 > .block-title';   // Sepet Sayfası Başlığı seçicisi
    cartProductRow='.col-md-9 > .bg-white > .w-100';
    cartProductName='.cart-item-title';
    cartProductPrice='.d-flex > .price-sell';
    cartProductShippingFee=':nth-child(2) > .pl-0'; 
    cartProductQuantityInput='input[id^="qty"]'; 
    grandTotalElement='.fw-bold > .pl-0';  // Sepet sayfasındaki Genel Toplam seçicisi
    cartIconCount='.cart-soft-count';   // Sağ üst sepet ikonu üzerindeki sayı seçicisi

    increaseButton='[id^="qty-plus"]';   // + butonu seçicisi  
    cartProductTotalPrice='.col-12 > .row > .col-4 > .price-sell';  //Sepet toplam fiyatı seçicisi
    decreaseButton='[id^="qty-minus"]'; 

    removeIcon='[id^="delete-product"] .ti-trash-o'; // Silme ikonu seçicisi
    removeConfirmModal='.t-popconfirm-inner';  // Silme onay modalı seçicisi
    confirmRemoveButton='.t-popconfirm-cancel-btn';
    emptyCartButton='#clear-cart-btn-129'; 
    emptyCartMessage='.fw-light'; 
    continueShoppingButton='#cart-back-btn';


    /** Sepet Modalını Doğrulama */
    verifyCartModalLoaded() {
        cy.get(this.cartModal).should('be.visible')
    }

    /** Sepet Modalındaki Ürün Bilgilerini Doğrulama */
    verifyCartModalProductDetails(productName, piece) {
        cy.get(this.productRow).should('contain', productName);
        cy.get(this.productRow).find(this.productName)
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.equal(productName);
            });
        cy.get(this.productRow).find(this.productQuantityInput)
            .should('have.value', piece.toString());
    }

    /** Sepet Modalındaki Fiyatları Doğrulama */
    verifyModalProductPrices(cartTotal, shippingFee, grandTotal) {
        cy.get(this.productRow).find(this.productCartTotal)
            .invoke('text')
            .then(text => {
                expect(this.cleanPrice(text)).to.equal(cartTotal);
            });

        cy.get(this.productRow)
            .find(this.productQuantityInput)
            .invoke('val') 
            .then(quantity => {
                expect(parseInt(quantity)).to.be.greaterThan(0);
            });

        cy.get(this.productRow).find(this.productTotalPrice)
            .invoke('text')
            .then(text => {
                expect(this.cleanPrice(text)).to.equal(grandTotal);
            });

        cy.get(this.productRow).find(this.productShippingFee)
            .invoke('text')
            .then(text => {
                expect(this.cleanPrice(text)).to.equal(shippingFee);
            });
    }

    /** Fiyat metnini temizleyip ondalıklı sayıya çeviren yardımcı metot */
    cleanPrice(priceText) {
        return parseFloat(priceText.replace(' TL', '').replace(',', '.').trim());
    }

    /** Sepete Git butonuna tıkla */
    clickGoToCartButton() {
        cy.get(this.goToCartButton, { timeout: 10000 }).should('be.visible').click();
    }

    /** Sepet Sayfasının yüklendiğini doğrulama */
    verifyCartPageLoaded() {
        cy.get(this.cartPageHeader, { timeout: 10000 }).should('be.visible')
        .should('contain', 'Sepetim');
    }

    /** Sepet Sayfasındaki Ürün Detaylarını Doğrula */
    verifyCartPageDetails(productName, cartTotal) {
        cy.get(this.cartProductRow).should('contain', productName);
        cy.get(this.cartProductRow).find(this.cartProductName)
            .invoke('text')
            .then(text => {
                expect(text.trim()).to.equal(productName);
            });
            
        cy.get(this.cartProductRow)
            .find(this.cartProductQuantityInput)
            .invoke('val') 
            .then(quantity => {
                expect(parseInt(quantity)).to.be.greaterThan(0);
            });

        cy.get(this.cartProductRow).find(this.cartProductPrice)
            .invoke('text')
            .then(text => {
                const cleanedPrice = this.cleanPrice(text);
                expect(cleanedPrice).to.equal(cartTotal);
            });
    }

    /** Fiyat metnini temizleyip ondalıklı sayıya çeviren yardımcı metot */
    parsePrice(priceText) {
        if (typeof priceText !== 'string') return null;
        // TL, binlik ayraçları (.), boşlukları siler, ondalık ayracı (,) nokta yapar.
        return parseFloat(priceText.trim().replace(' TL', '').replace(/\./g, '').replace(',', '.'));
    }

    /** Miktarı Artır */
    increaseProductQuantity(productName) {
        cy.get(this.cartProductRow)
            .contains(productName)
            .parents(this.cartProductRow)
            .find(this.increaseButton)
            .click();
    }
    
    /** Miktar Inputunu getir */
    getQuantityInput() {
        return cy.get(this.cartProductRow).first().find(this.cartProductQuantityInput, { timeout: 10000 });
    }
    
    /** Ürün Toplam Fiyatını getir  */
    getProductTotalPrice() {
        return cy.get(this.cartProductRow).first().find(this.cartProductPrice);
    }

    /** Tekil ürün fiyatını (Sepet Sayfasından) okumak için elementi getirir */
    getProductUnitPrice() {
        return cy.get(this.cartProductRow)
            .first()
            .find(this.cartProductPrice); 
    }

    /** Kargo ücretini (Sepet Sayfasından) okumak için elementi getirir */
    getShippingFee() {
        return cy.get(this.cartProductShippingFee); 
    }
    
    /** Genel Toplamı getir */
    getGrandTotal() {
        return cy.get(this.grandTotalElement);
    }

    /** Ürün Miktarını doğrula */
    verifyProductQuantity(productName, expectedNewQuantity) {
        cy.get(this.cartProductRow)
            .contains(productName)
            .parents(this.cartProductRow)
            .find(this.cartProductQuantityInput, { timeout: 15000 })
            .should('have.value', expectedNewQuantity.toString());
    }

    /** Ürün Toplam Fiyatını doğrula */
    verifyProductTotalPrice(productName, expectedNewProductTotal) {
    
        const expectedPriceString = expectedNewProductTotal.toFixed(2)
                    .replace('.', '_TEMP_') 
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') 
                    .replace('_TEMP_', ','); 
        
        // Fiyat elementinin, beklenen fiyata güncellenmesini bekle.
        cy.get(this.cartProductRow)
            .contains(productName)
            .parents(this.cartProductRow) 
            .find(this.cartProductTotalPrice, { timeout: 15000 })
            .should('be.visible')
            .should('contain', expectedPriceString)
            .invoke('text') 
            .then(priceText => {
                let cleanText = priceText.trim()
                    .replace(/\./g, '') // Binlik ayraçları sil
                    .replace(',', '.') // Virgülü ondalık noktaya çevir
                    .replace(/[^0-9.]/g, ''); // Sayı ve nokta dışındaki her şeyi temizle

                const actualPrice = parseFloat(cleanText);
                const expectedPrice = expectedNewProductTotal;
                
                expect(actualPrice).to.be.closeTo(expectedPrice, 0.01); 
            });
    }

    /** Genel Toplamı doğrula */
    verifyGrandTotal(expectedNewGrandTotal) {

    // Bu kod, binlik ayracı (nokta) ve ondalık ayracı (virgül) ekler.
        const expectedGrandTotalString = expectedNewGrandTotal.toFixed(2)
                    .replace('.', '_TEMP_') 
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') 
                    .replace('_TEMP_', ','); 
                                                            
        cy.get(this.grandTotalElement, { timeout: 15000 })
            .should('be.visible')
            .should('contain', expectedGrandTotalString) 
            .invoke('text') 
            .then(grandTotalText => {
                // Fiyat metnini temizleyerek sayıya çevir
                let cleanText = grandTotalText.trim()
                    .replace(/\./g, '') 
                    .replace(',', '.') 
                    .replace(/[^0-9.]/g, ''); 

                const actualGrandTotal = parseFloat(cleanText);
                const expectedGrandTotal = expectedNewGrandTotal;
                
                expect(actualGrandTotal).to.be.closeTo(expectedGrandTotal, 0.01);
        });
}

    /** Miktarı Azalt */
    decreaseProductQuantity(productName) {
        cy.get(this.cartProductRow)
            .contains(productName) 
            .parents(this.cartProductRow) 
            .find(this.decreaseButton)
            .click();
    }

    /** Ürünün Miktar Inputunu getir */
    getQuantityInputOfProduct(productName) {
        return cy.get(this.cartProductRow)
            .contains(productName)
            .parents(this.cartProductRow)
            .find(this.cartProductQuantityInput);
    }
    
    /** Ürünün Toplam Fiyatını getir */
    getProductTotalPriceOfProduct(productName) {
        return cy.get(this.cartProductRow)
            .contains(productName)
            .parents(this.cartProductRow)
            .find(this.cartProductTotalPrice);
    }

    /** Ürün silme ikonuna tıkla */
    clickRemoveProductIcon(productName) {
        cy.get(this.cartProductRow)
            .contains(productName) 
            .parents(this.cartProductRow) 
            .find(this.removeIcon)
            .click();
    }
    
    /** Silme modalını onayla */
    confirmRemovalInModal() {
        cy.get(this.removeConfirmModal).should('be.visible');
        cy.get(this.confirmRemoveButton).click();
        cy.wait(1500); 
    }   

    /** Sepet boş mesajını doğrula */
    verifyEmptyCartMessage() {
        cy.get(this.emptyCartMessage)
            .should('be.visible')
            .and('contain', 'Sepetinizde Ürün Bulunmamaktadır');
    }

    /** Sepet ikonu sayısını getir */
    getCartIconCount() {
        return cy.get(this.cartIconCount);
    }

    /** Sepeti boşalt butonuna tıkla */
    clickEmptyCartButton() {
        cy.get(this.emptyCartButton, { timeout: 10000 }).should('be.visible').click();
    }

    verifyEmptyCartMessage() {
        cy.get(this.emptyCartMessage, { timeout: 5000 })
            .should('be.visible')
            .and('contain', 'Sepetinizde Ürün Bulunmamaktadır');
    }

    /** Alışverişe devam butonunun görünürlüğünü doğrula */
    verifyContinueShoppingButtonVisible() {
        cy.get(this.continueShoppingButton, { timeout: 5000 }).should('be.visible');
        cy.get(this.continueShoppingButton).should('contain', 'Alışverişe Devam Et'); 
    }
    
}

export default new CartPage();


