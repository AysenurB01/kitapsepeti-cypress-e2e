import LoginPage from '../../pages/LoginPage';

describe('US01 - Kullanici Giris Islemleri', () => {

  it('TC01 - Giris Sayfasi Arayuz Dogrulamasi', () => {

    LoginPage.navigateUrl();
    LoginPage.clickAcceptCookiesButton();
    LoginPage.clickAccountIcon();
    LoginPage.verifyLoginPopupElementsVisible();
  });

  it('TC02 - Basarili Kayitli Kullanici Girisi', () => {

    LoginPage.login('vawapi6457@artvara.com', '12345.Abc');
    LoginPage.verifyHomepageLoaded();
  });

  it('TC03 - Yanlis Sifre ile Giris', () => {

    LoginPage.login('vawapi6457@artvara.com', 'asdf');
    LoginPage.verifyLoginErrorMessage();
  });  

  it('TC04 - Kayitli Olmayan E-posta ile Giris', () => {

    LoginPage.login('haleko9210@anysilo.com', '12345.Abc');
    LoginPage.verifyLoginErrorMessage();
  });

  it('TC05 - Gecersiz E-posta Formati ile Giris', () => {

    LoginPage.login('vawapi6457artvara.com', '12345.Abc');
    LoginPage.verifyLoginErrorMessage();
  });

  it('TC06 - Bos Alanlar ile Giris', () => {

    LoginPage.navigateUrl();
    LoginPage.clickAcceptCookiesButton();
    LoginPage.clickAccountIcon();
    LoginPage.clickLoginButton();
    LoginPage.verifyLoginErrorMessage();
  });

  it('TC07 - Sifremi Unuttum Akisi', () => {

    LoginPage.clickForgotPasswordLink();
    LoginPage.verifyForgotPasswordPageLoaded();
  });

   it('TC08 - Tekrarlanan Hatali Giris', () => {

    LoginPage.navigateUrl();
    LoginPage.clickAcceptCookiesButton();
    LoginPage.clickAccountIcon();
    for (let i = 0; i < 11; i++) {
        LoginPage.enterEmail('vawapi6457@artvara.com');
        LoginPage.enterPassword('asdf');
        LoginPage.clickLoginButton();
    }
    LoginPage.verifyExcessiveLoginAttemptMessage();
  });

});


