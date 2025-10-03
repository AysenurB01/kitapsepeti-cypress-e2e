class SearchPage {

    searchInput='[name="q"]';  // Anasayfadaki ürün arama alanı seçicisi
    searchIcon='#search';
    searchButton='#live-search-btn'; 
    
    productTitle='.col-6 > .bg-white > .product-detail-card > .text-center'; // Ürün başlığı seçicisi
    productDetailCards='.col-6 > .bg-white > .product-detail-card';  // Anasayfadaki ürün kartlarının detay kısmı seçicisi
    productCard='.col-6 > .bg-white';   // Anasayfadaki ürün kartları seçicisi
    productImage='.col-6 > .bg-white > .position-relative > .image-animate-zoom > .image-inner';
    productName='.col-6 > .bg-white > .product-detail-card > .text-center';
    productAuthor='.col-6 > .bg-white > .product-detail-card > .d-flex >.model-title';
    productPublisher='.col-6 > .bg-white > .product-detail-card > .d-flex >.brand-title';
    productPrice='.col-6 > .bg-white > .product-detail-card > .product-bottom-line > .product-price-wrapper >.current-price > .product-price';

    sortingDropdown='[name="sort"]';
    productPriceList='.col-6 > .bg-white > .product-detail-card > .product-bottom-line > .product-price-wrapper >.current-price > .product-price';  // Fiyat sıralaması için tüm fiyat listesi seçicisi

    categoryOption='.category-general > .w-100 > .filter-list';                               
    brandOption = '.px-1 > :nth-child(2) > .w-100';
    modelOption = '.px-1 > :nth-child(3) > .w-100';
    applyFilterButton='.position-sticky > .btn-secondary';
    productListContainer='#catalog362'; //Ürün listesinin ana kapsayıcısı

    pageTitle='.col-12.py-1.d-none.d-md-block.category-name.text-center';   // Kategori sayfasının başlığı
    addToCartButton='.add-to-cart-btn';    // Sepete Ekle butonu (Hover sonrası görünür)
    buyButton='#cart-popup-continue-shopping';  // Sepet pop-up'ındaki Satın Al butonu


    clickSearchIcon() {
        cy.get(this.searchIcon).click();
    }

    typeSearchQuery(query) {
        cy.get(this.searchInput, { timeout: 10000 })
            .should('be.visible')
            .and('be.enabled')
            .type(query);
    }

    clickSearchButton() {
        cy.get(this.searchButton).click();
        cy.url().should('include', 'arama?q=');
    }
    
    search(query) {
        cy.wait(1000);
        this.clickSearchIcon();
        this.typeSearchQuery(query);
        this.clickSearchButton();
    }

    /** Arama input alanının içeriğinin temizlendiğini doğrular. */
    verifySearchInputCleared() {
        cy.get(this.searchInput).should('have.value', '');
    }
  
    /** Ürün başlığını alır ve arama sorgusunu içerip içermediğini doğrular. */
    verifyFirstSearchResult(query) {
        cy.get(this.productTitle, { timeout: 10000 })
            .first()
            .invoke('text')
            .then((text) => {
                expect(text.toLowerCase()).to.include(query.toLowerCase());
            });
    }

    /** Arama sonucunda hiç ürün kartı olmadığını doğrular. */
    verifyNoSearchResults() {
        cy.get(this.productDetailCards).should('have.length', 0);
    }

    /** Ürün kartındaki tüm görsel elementlerin görünür olduğunu doğrular. */
    verifyProductCardUI() {
        cy.get(this.productCard).each(() => {
            cy.get(this.productImage).should('be.visible');
            cy.get(this.productName).should('be.visible');
            cy.get(this.productAuthor).should('be.visible');
            cy.get(this.productPublisher).should('be.visible');
            cy.get(this.productPrice).should('be.visible');
        });
    }

    /** Sıralama dropdown'ından 'Fiyat Azalan' seçeneğini seçer. */
    sortByPriceHighToLow() {
        cy.get(this.sortingDropdown).select('Fiyat Azalan');
    }

    /** Ürün fiyatlarının azalan sırada listelendiğini doğrular. */
    verifyProductsSortedByPrice() {
        let prices = [];
        cy.get(this.productPriceList).each(($el) => {
            // Fiyat metnini temizler (₺, TL, virgül vb. kaldırır) ve sayıya çevirir.
            const priceText = $el.text().replace(',', '.').replace('₺', '').replace('TL', '').trim();
            const price = parseFloat(priceText);
            prices.push(price);
        })
        .then(() => {
            cy.log('Alınan Fiyatlar:', prices);
            // Bir önceki fiyatın, bir sonraki fiyattan büyük veya eşit olduğunu kontrol eder.
            for (let i = 0; i < prices.length - 1; i++) {
                expect(prices[i]).to.be.at.least(prices[i + 1]);
            }
        }); 
    }

    /** Belirtilen kategori filtresine tıklar. */
    clickCategoryFilter(categoryName) {
        cy.get(this.categoryOption, { timeout: 10000 })
          .contains(categoryName)
          .should('be.visible')
          .click();
    }

    /** Belirtilen marka filtresine tıklar. */
    clickBrandOption(brandName) {
        cy.get(this.brandOption, { timeout: 10000 })
          .contains(brandName)
          .scrollIntoView()
          .should('be.visible')
          .click({ force: true });
    }

    /** Belirtilen model filtresine tıklar. */
    clickModelOption(modelName) {
        cy.get(this.modelOption, { timeout: 10000 })
          .contains(modelName)
          .scrollIntoView()
          .click({ force: true });
    }

    /** Filtreleri Uygula butonuna tıklar. */
    clickApplyFilterButton() {
        cy.get(this.applyFilterButton, { timeout: 10000 })
            .should('be.visible')
            .click();
    }
    
    /** URL'nin beklenen filtre parametresini içerdiğini doğrular. */
    verifyFilterApplied(expectedUrlPart) {
        cy.url({ timeout: 10000 }).should('include', expectedUrlPart);
    }

    /** Ana sayfadaki kategori linkine tıklar. */
    navigateToCategory(categoryName) {
        cy.wait(1000);
        cy.contains(categoryName).click({ force: true });
    }

    /** Kategori sayfasının doğru yüklendiğini (URL ve Başlık kontrolü) doğrular. */
    verifyCategoryPage(categoryName) {
        cy.url({ timeout: 10000 }).should('not.include', 'login');
         cy.get(this.pageTitle, { timeout: 10000 })
          .should('be.visible')
          .invoke('text')
          .then((text) => {
            // Başlık metninin kategori adını içerdiğini doğrular (Türkçe karakter ve case-insensitive).
            const normalizedText = text.trim().toLowerCase().replace(/i/g, 'i');
            const normalizedCategoryName = categoryName.toLowerCase().replace(/i/g, 'i');
            expect(normalizedText).to.include(normalizedCategoryName);
          });         
    }

    /** Fare imlecini ürün kartının üzerine getirerek "Sepete Ekle" butonunun görünür olduğunu doğrular. */
    verifyAddToCartOnHover() {
        cy.get(this.productCard)
            .first()
            .realHover();

        cy.get(this.productCard)
            .first()
            .find(this.addToCartButton)
            .should('be.visible');
    }

    /** Fare imlecini ürün kartının üzerine getirir ve Sepete Ekle butonuna tıklar. */
    clickAddToCartOnHover() {
        cy.get(this.productCard)
            .first()
            .realHover(); 

        cy.get(this.productCard)
            .first()
            .find(this.addToCartButton, { timeout: 10000 })
            .should('be.visible')
            .click({force: true});
    }
    
    /** Sayfadaki mevcut ürün kartı sayısını döndürür. */
    getInitialProductCount() {
        return cy.get(this.productCard).its('length');
    }

     /**
     * Sayfayı önce en sona, sonra son yüklenmiş ürüne kaydırır ve daha fazla ürünün yüklendiğini doğrular.
     * Bu işlem, URL'ye 'ps=' parametresini eklenmesini tetikler.
     */
    scrollToBottomAndVerifyMoreProducts(initialCount) {
        // Pencereyi aşağıdan 100 piksel yukarıya kaydır
        cy.window().scrollTo('bottom');
        cy.wait(8000); 
        cy.get(this.productCard, { timeout: 15000 }) 
            .should('have.length.gt', initialCount)
            .then(() => {
                cy.get(this.productCard)
                    .last()
                    .scrollIntoView({ duration: 500 });
                cy.wait(1000);
            });
    }
    
    /** URL'nin 'ps=' sayfa numarası parametresini içerdiğini doğrular. */
    verifyUrlPageNumber() {
        cy.url({ timeout: 10000 }).should('include', 'ps=');
    }
     
    /** İlk ürün kartına tıklar. */
    clickProductCard() {
        cy.get(this.productCard, { timeout: 10000 })
            .first()
            .should('be.visible')
            .click();
    }

    /** Sepet pop-up'ındaki Satın Al butonuna tıklar. */
    clickBuyButton() {
        cy.get(this.buyButton, { timeout: 10000 })
            .should('be.visible')
            .click();
    }

}

export default new SearchPage();


