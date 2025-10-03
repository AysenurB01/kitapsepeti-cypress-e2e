class LoginPage{
 
    url="https://www.kitapsepeti.com/";
    acceptCookiesButton='.cc-nb-okagree';  
    accountIcon='#header-account > .custom-user';
    emailInput='#header-email';
    passwordInput='#header-password';
    loginButton='#login-btn-322';

    bestsellersHeader='.position-relative > .block-title';
    loginModal='.drawer-wrapper.closable-active.active > .drawer-header';
    errorMessageText = 'Giriş bilgileriniz hatalı';

    forgotPasswordLink='.flex-wrap > .text-gray';
    remindPasswordEmailInput='#email-292';
    remindPasswordButton='#forgot-password-btn-292';
    remindPasswordButtonText='Şifremi Hatırlat';
    excessiveLoginAttemptMessage='Çok fazla istek talebinde bulundunuz. Lütfen 30 dakika sonra tekrar deneyin.';
    excessiveLoginAttemptLocator='.popover-item';  // Çoklu hatalı giriş uyarısı seçicisi  

  navigateUrl(){
    cy.visit(this.url);
  }

  clickAcceptCookiesButton() {
    cy.get(this.acceptCookiesButton).click();
  }

  clickAccountIcon() {
    cy.get(this.accountIcon).should('be.visible').click();
  }

  enterEmail(email) {
    cy.get(this.emailInput).type(email);
  }

  enterPassword(password) {
    cy.get(this.passwordInput).type(password);
  }

  clickLoginButton() {
    cy.get(this.loginButton).click();
  }

  verifyLoginPopupElementsVisible() {
    cy.get(this.emailInput).should('be.visible');
    cy.get(this.passwordInput).should('be.visible');
    cy.get(this.loginButton).should('be.visible');
    cy.get(this.forgotPasswordLink).should('be.visible');
  }

  login(email, password) {
    this.navigateUrl();
    this.clickAcceptCookiesButton();
    this.clickAccountIcon();
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickLoginButton();
  }

  verifyHomepageLoaded() {
    cy.get(this.bestsellersHeader).should('be.visible');
    
  }

  verifyLoginErrorMessage() {
    cy.contains(this.errorMessageText, { timeout: 10000 }).should('exist');
    cy.contains(this.errorMessageText, { timeout: 10000 }).should('not.exist');
  }

  clickForgotPasswordLink() {
    this.navigateUrl();
    this.clickAcceptCookiesButton();
    this.clickAccountIcon();
    cy.get(this.forgotPasswordLink)
      .should('be.visible')
      .click();
  }

  verifyForgotPasswordPageLoaded() {
    cy.get(this.remindPasswordEmailInput).should('be.visible');
    cy.get(this.remindPasswordButton)
      .should('be.visible')
      .and('contain', this.remindPasswordButtonText);
  }

  /** Çoklu hatalı giriş sonrası çıkan güvenlik mesajını doğrula */
  verifyExcessiveLoginAttemptMessage() {
    cy.get(this.excessiveLoginAttemptLocator, { timeout: 10000 })
      .should('be.visible')
      .and('contain', this.excessiveLoginAttemptMessage);
  }

}

export default new LoginPage();



