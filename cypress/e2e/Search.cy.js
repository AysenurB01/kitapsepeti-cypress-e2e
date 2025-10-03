import LoginPage from '../../pages/LoginPage';
import SearchPage from '../../pages/SearchPage';

describe('US02 - Ürün Arama ve Listeleme Islemleri', () => {

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();;
    });

    beforeEach(() => {
        LoginPage.login('vawapi6457@artvara.com', '12345.Abc');
        LoginPage.verifyHomepageLoaded();
    });

    it('TC09 - Basarili Ürün Arama ve Sonuc Dogrulama', () => {

        const searchQuery = 'nutuk'
        SearchPage.search(searchQuery);
        SearchPage.verifySearchInputCleared();
        SearchPage.verifyFirstSearchResult(searchQuery);
    });

    it('TC10 - Bulunmayan Ürün Aramasi', () => {

        const searchQuery = 'asdfghj'
        SearchPage.search(searchQuery);
        SearchPage.verifyNoSearchResults(searchQuery);
    });

    it('TC11 - Ürün Karti Arayuz Dogrulamasi', () => {

        SearchPage.search('denizler altında yirmibin fersah');
        SearchPage.verifyProductCardUI();
    });


    it('TC12 - Ürün Siralama Fonksiyonu (Fiyat Azalan)', () => {

        SearchPage.search('saatleri ayarlama enstitüsü');
        SearchPage.sortByPriceHighToLow();
        SearchPage.verifyProductsSortedByPrice();
    });

    it('TC13 - Filtreleme Fonksiyonu', () => {

        SearchPage.search('kitap'); 
        SearchPage.clickCategoryFilter('Dünyanın En İyi Kitapları');   
        SearchPage.clickBrandOption('Doğan Kitap'); 
        SearchPage.clickModelOption(' Haruki Murakami');       
        SearchPage.clickApplyFilterButton();        
        SearchPage.verifyFilterApplied('brand=');
        SearchPage.verifyFilterApplied('model=');
    });
    
    it('TC14 - Ana Sayfa Kategori Navigasyonu', () => {

        const categoryName = 'Roman'
        SearchPage.navigateToCategory(categoryName);
        SearchPage.verifyCategoryPage(categoryName);
    });

    it('TC15 - Ürün Karti Üzerinde "Sepete Ekle" (hover) Butonu Dogrulamasi', () => {

        SearchPage.search('körlük');
        SearchPage.verifyAddToCartOnHover();
    });

    it('TC16 - Sayfa Kaydirma (Scroll) ile Ürün Sayfasi Yükleme', () => {

        SearchPage.search('vadideki zambak');
        SearchPage.getInitialProductCount().then((initialCount) => {
        SearchPage.scrollToBottomAndVerifyMoreProducts(initialCount);
        SearchPage.verifyUrlPageNumber();
        });
    });    

});


