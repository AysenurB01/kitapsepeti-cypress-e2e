import LoginPage from '../../pages/LoginPage';
import SearchPage from '../../pages/SearchPage'; 
import ProductDetailPage from '../../pages/ProductDetailPage'; 
import CartPage from '../../pages/CartPage'; 
import PaymentFlowPage from '../../pages/PaymentFlowPage';

describe('US05 - Ödeme ve Sipariş Onayi', () => {

    const productName = 'Ölü Canlar'; 
    const fakeCard = {
        name: 'TEST USER',
        number: '4111111111111111',
        expiry: '1226',
        cvc: '123'
    };

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    
    beforeEach(() => {

        LoginPage.login('vawapi6457@artvara.com', '12345.Abc');
        LoginPage.verifyHomepageLoaded();
        SearchPage.search(productName); 
        SearchPage.clickProductCard();        
        ProductDetailPage.clickAddToCartButton();
        ProductDetailPage.verifySuccessfulAddToCartMessage();
        ProductDetailPage.clickGoToCartButton();
        CartPage.verifyCartPageLoaded();
    });

    it('TC29 - Ürün Detay Sayfasindan Adres Bilgisi Sayfasina Yönlendirme', () => {

        PaymentFlowPage.clickBuyButton();
        PaymentFlowPage.verifyAddressPageLoaded();
    });
    
    it('TC30 - Ödeme Sayfasina Gecis', () => {

        PaymentFlowPage.clickBuyButton(); 
        PaymentFlowPage.verifyAddressPageLoaded(); 
        PaymentFlowPage.clickContinueToPaymentButton();
        PaymentFlowPage.verifyPaymentPageLoaded();
        PaymentFlowPage.verifyPaymentOptionsVisible();
        
    });

    it('TC31 - Kredi Karti Ödeme Tipi Secimi ve Taksit Seceneklerinin Kontrolü', () => {

        PaymentFlowPage.clickBuyButton(); 
        PaymentFlowPage.verifyAddressPageLoaded(); 
        PaymentFlowPage.clickContinueToPaymentButton();
        PaymentFlowPage.verifyPaymentPageLoaded();
        PaymentFlowPage.selectCreditCardPayment();
        PaymentFlowPage.verifyCardInformationInputVisible();
        PaymentFlowPage.fillCreditCardForm(
            fakeCard.name,
            fakeCard.number,
            fakeCard.expiry,
            fakeCard.cvc
        );

        PaymentFlowPage.verifyPaymentButtonIsActive();
    });

    it('TC32 - Eksik Kart Bilgileriyle Butonun Pasif Kalmasi ve Hata Kontrolü', () => {

        PaymentFlowPage.clickBuyButton(); 
        PaymentFlowPage.verifyAddressPageLoaded(); 
        PaymentFlowPage.clickContinueToPaymentButton();
        PaymentFlowPage.verifyPaymentPageLoaded();
        PaymentFlowPage.selectCreditCardPayment(); 
        PaymentFlowPage.verifyPaymentButtonIsInactive();
        PaymentFlowPage.clickPaymentSubmitButton();
        PaymentFlowPage.verifyErrorMessage();
    });
        
});


