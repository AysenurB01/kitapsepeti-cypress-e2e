import LoginPage from '../../pages/LoginPage';
import SearchPage from '../../pages/SearchPage';
import ProductDetailPage from '../../pages/ProductDetailPage';
import PaymentFlowPage from '../../pages/PaymentFlowPage'; 
import GuestCheckoutPage from '../../pages/GuestCheckoutPage'; 

describe('US06 - Misafir Olarak Satin Alma Akisi', () => {

    const productName = 'Kısa Dünya Tarihi'; 
    const guestInfo = {
        email: `testuser${Cypress._.random(0, 1e6)}@test.com`,
        phone: '555-555-44-45',
        name: 'Misafir Kullanici',
        city: 'Ankara', 
        town: 'Çankaya',
        district: 'BAHÇELİEVLER MAH',
        fullAddress: 'Bahçelievler Mah. Test Sk. No: 12/A'
    };
    
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();;
    });
    
    beforeEach(() => {

        LoginPage.navigateUrl();
        LoginPage.clickAcceptCookiesButton();
        SearchPage.search(productName); 
        SearchPage.clickAddToCartOnHover();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        SearchPage.clickBuyButton();
        GuestCheckoutPage.verifyGuestPageLoaded();
        GuestCheckoutPage.clickContinueAsGuestButton(); 
        GuestCheckoutPage.verifyAddressPageLoaded();
    });

    it('TC33 - Misafir Olarak Basarili Ödeme Adimina Gecme', () => {

        GuestCheckoutPage.fillNewGuestAddress(
            guestInfo.name,
            guestInfo.email,
            guestInfo.city, 
            guestInfo.town, 
            guestInfo.district, 
            guestInfo.fullAddress,
            guestInfo.phone,
        );
        GuestCheckoutPage.clickSaveAddressButton();
        PaymentFlowPage.verifyPaymentPageLoaded();
    });
    
    it('TC34 - Boş Adres Alani ile Misafir Olarak Devam Etme', () => {

        GuestCheckoutPage.fillNewGuestAddress(
            guestInfo.name,
            guestInfo.email,
            guestInfo.city, 
            guestInfo.town, 
            guestInfo.district, 
            ' ',
            guestInfo.phone,
        );
        GuestCheckoutPage.clickSaveAddressButton();
        GuestCheckoutPage.verifyErrorMessage();
    });
    
});



