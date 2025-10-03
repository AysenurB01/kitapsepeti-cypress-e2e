import LoginPage from "../../pages/LoginPage";
import SearchPage from "../../pages/SearchPage";
import ProductDetailPage from "../../pages/ProductDetailPage";
import CartPage from "../../pages/CartPage";

describe('US04 - Sepet Yönetimi ve Kontrolü', () => {

    const productName = 'Sevdalinka';
    const piece = '1' // sabit değer (ilerleyen testlerde +,- butonlarla adet değişiyor)

    /**Kargo ücretini dinamik belirler (Örn: 1000 TL üzeri ücretsiz) */
    const getExpectedShippingFee = (productTotal, shippingFee) => {
        const FREE_SHIPPING_LIMIT = 1000.00; 
        return productTotal >= FREE_SHIPPING_LIMIT ? 0.00 : shippingFee;
    };

    // **DİNAMİK FİYAT OKUMA FONKSİYONU.**
    const setDynamicPrices = () => {
        SearchPage.clickAddToCartOnHover(); 
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();

        /** Fiyatları Sayfadan Oku ve Alias olarak kaydet */
        CartPage.getProductUnitPrice().invoke('text').then(text => {
            const unitPrice = CartPage.parsePrice(text);
            cy.wrap(unitPrice).as('cartTotal'); 
        });
        
        CartPage.getShippingFee().invoke('text').then(text => {
            const fee = CartPage.parsePrice(text);
            cy.wrap(fee).as('shippingFee'); 
        });

        /** İlk Genel Toplamı da hesaplayıp kaydedilir (doğrulama için) */
        cy.get('@cartTotal').then(cartTotal => {
            cy.get('@shippingFee').then(shippingFee => {
                const initialGrandTotal = cartTotal + shippingFee;
                cy.wrap(initialGrandTotal).as('grandTotal');
            });
        });
    };

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    beforeEach(() => {
        LoginPage.login('vawapi6457@artvara.com', '12345.Abc');
        LoginPage.verifyHomepageLoaded();
        SearchPage.search(productName); 
    });

    it('TC21 - Sepet Ikonu Islevselligi ve Ürün Bilgilerinin Dogrulamasi', () => {
        
        setDynamicPrices(); 
        LoginPage.navigateUrl();
        ProductDetailPage.clickCartIcon();
        CartPage.verifyCartModalLoaded();
        // Alias'ları Kullanarak Doğrula
        cy.get('@cartTotal').then(cartTotal => {
            cy.get('@shippingFee').then(shippingFee => {
                const grandTotal = cartTotal + shippingFee;

            CartPage.verifyCartModalProductDetails(productName, piece); 
            CartPage.verifyModalProductPrices(cartTotal, shippingFee, grandTotal);
            });
        });
    });

    it('TC22 - Sepet-Sag Modal Kismindan Sepet Sayfasina Gecme', () => {

        SearchPage.clickProductCard();        
        ProductDetailPage.clickAddToCartButton();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.closeAddToCartModal();
        ProductDetailPage.clickCartIcon();
        CartPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();
    });

    it('TC23 - Ana sayfadan Sepet Sayfasina Gecme', () => {
        
        SearchPage.clickAddToCartOnHover();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();
    });

    it('TC24 - Ürün Detay Sayfasindan Sepet Sayfasina Giderek Ürün Bilgilerini Dogrulamasi', () => {
        setDynamicPrices(); 
        cy.get('@cartTotal').then(cartTotal => {
            CartPage.verifyCartPageDetails(productName, cartTotal);
        });
    });

    it('TC25 - Ürün Adedi Artirildiginda Fiyatlarin Güncellenmesi', () => {
        setDynamicPrices();
        cy.get('@cartTotal').then(cartTotal => {
            cy.get('@shippingFee').then(shippingFee => {

        let initialQuantity;

        // Mevcut değerleri alır
        CartPage.getQuantityInput().invoke('val').then(val => {
            initialQuantity = parseInt(val);
        }).then(() => {
            
             // Miktarı Artır
            CartPage.increaseProductQuantity(productName);
            
            const expectedNewQuantity = initialQuantity + 1;
            const expectedNewProductTotal = expectedNewQuantity * cartTotal;
            const expectedNewShippingFee = getExpectedShippingFee(expectedNewProductTotal, shippingFee);
            const expectedNewGrandTotal = expectedNewProductTotal + expectedNewShippingFee;

            CartPage.verifyProductQuantity(productName, expectedNewQuantity);
            CartPage.verifyProductTotalPrice(productName, expectedNewProductTotal);
            CartPage.verifyGrandTotal(expectedNewGrandTotal);
           });
        });
      });
    });

    it('TC26 - Ürün Adedi Azaltildiginda Fiyatlarin Güncellenmesi', () => {
        setDynamicPrices();
        cy.get('@cartTotal').then(cartTotal => {
            cy.get('@shippingFee').then(shippingFee => {

            let initialQuantity;
        
            // Mevcut değerleri alır
            CartPage.getQuantityInput().invoke('val').then(val => {
                initialQuantity = parseInt(val);
            }).then(() => {

            // Miktarı Azaltır 
            CartPage.decreaseProductQuantity(productName);
 
            const expectedNewQuantity = initialQuantity - 1;
            const expectedNewProductTotal = expectedNewQuantity * cartTotal;
            const expectedNewShippingFee = getExpectedShippingFee(expectedNewProductTotal, shippingFee);
            const expectedNewGrandTotal = expectedNewProductTotal + expectedNewShippingFee;
            
            CartPage.verifyProductQuantity(productName, expectedNewQuantity); 
            CartPage.verifyProductTotalPrice(productName, expectedNewProductTotal); 
            CartPage.verifyGrandTotal(expectedNewGrandTotal); 
            });
        });
      });
    });


    it('TC27 - (Çöp İkonu ile) Sepetten Tek Ürün Silme ve Güncelleme', () => {

        SearchPage.clickAddToCartOnHover();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();

        CartPage.clickRemoveProductIcon(productName);
        CartPage.confirmRemovalInModal(); 
        CartPage.verifyEmptyCartMessage(); 
    });

    it('TC28 - Sepeti Tamamen Bosaltma', () => {

        SearchPage.clickAddToCartOnHover();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();

        CartPage.clickEmptyCartButton();
        CartPage.getCartIconCount();
        CartPage.verifyEmptyCartMessage();
        CartPage.verifyContinueShoppingButtonVisible();
    });
    
});




