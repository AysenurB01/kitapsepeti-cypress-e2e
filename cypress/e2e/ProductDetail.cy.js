import LoginPage from "../../pages/LoginPage";
import SearchPage from "../../pages/SearchPage";
import ProductDetailPage from "../../pages/ProductDetailPage";

describe('US03 - Ürün Detay Sayfasi Görüntüleme ve Sepete Ekleme', () => {

    const productName = 'Sefiller';
    const productAuthor = 'Victor Hugo';
    const productPublisher = 'Pogo Çocuk';
    
    beforeEach(() => {
        LoginPage.login('vawapi6457@artvara.com', '12345.Abc');
        LoginPage.verifyHomepageLoaded(); 
        SearchPage.search(productName);
        SearchPage.clickProductCard();

        // **DİNAMİK FİYAT OKUMA VE ALIAS KAYDI**
        ProductDetailPage.getProductPriceElement().invoke('text').then(priceText => {
            cy.wrap(priceText).as('dynamicPrice');
        });
    });

    it('TC17 - Ürüne Tiklayip Detay Sayfasina Yönlendirildiğinin Dogrulamasi (Kart üzerindeki Sepete Ekle butonunun islevselligi)', () => {

        ProductDetailPage.verifyProductDetailPage(productName);
    });

    it('TC18 - Temel Ürün Bilgileri Arayüz Dogrulamasi', () => {

        cy.get('@dynamicPrice').then(dynamicPrice => {
            ProductDetailPage.verifyProductBasicInfo(productName, productAuthor, productPublisher, dynamicPrice); 
        });
    });

    it('TC19 - "Ürün Hakkinda Bilgiler" Bölümü Dogrulamasi', () => {

        ProductDetailPage.verifyProductDetailedInfo();
    });

    it('TC20 - Sepete Ekle Butonunun Islevselligini dogrulamasi', () => {

        ProductDetailPage.getCurrentCartCount().then((initialCount) => {
            const expectedCount = initialCount + 1;

        ProductDetailPage.clickAddToCartButton();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.closeAddToCartModal();
        ProductDetailPage.verifyCartIconCount(expectedCount);
        });
    });

});


