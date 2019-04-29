const billingCommands = {

  pause(time) {
    this.api.pause(time);
    return this;
  },

  validateContactEls() {
    return this.waitForElementVisible('@contactTab', 'Billing Page is visible')
      .verify.visible('@firstNameInput', 'First name input is visible')
      .verify.visible('@lastNameInput', 'last name input is visible')
      .verify.visible('@phoneNumInput', 'Phone Number input is visible')
      .verify.visible('@emailInput', 'Email input is visible');
  },

  fillInContactForm(firstName, lastName, phoneNum, email) {
    return this.clearValue('@firstNameInput')
      .setValue('@firstNameInput', firstName)
      .clearValue('@lastNameInput')
      .setValue('@lastNameInput', lastName)
      .clearValue('@phoneNumInput')
      .setValue('@phoneNumInput', phoneNum)
      .clearValue('@emailInput')
      .setValue('@emailInput', email)
      .click('@saveBillingContactButton');
  },

  validatePaymentEls() {
    return this.waitForElementPresent('@paymentTab', 'Payment tab is visible')
      .click('@paymentTab')
      .waitForElementVisible('@changePaymentButton', 'Payment tab elements are visible')
      .click('@changePaymentButton')
      .waitForElementVisible('@paymentFirstNameInput', 'first name input is visible')
      .verify.visible('@paymentLastNameInput', 'last name input is visible')
      .verify.visible('@paymentBillingAddInput', 'Billing address input is visible')
      .verify.visible('@paymentCityInput', 'City input is visible')
      .verify.visible('@paymentStateInput', 'State input is visible')
      .verify.visible('@paymentZipInput', 'ZIP code input is visible')
      .verify.visible('@savePaymentButton', 'Save Payment Button is visible');
  },

  validateCCEls() {
    return this.click('@creditCardRadio')
      .waitForElementVisible('@creditCardNumInput', 'Credit card input is visible')
      .verify.visible('@expMonth', 'Expiration month is visible')
      .verify.visible('@expYear', 'Expiration year is visible')
      .verify.visible('@cvvInput', 'CVV input is visible');
  },

  validateBankAcctEls() {
    return this.click('@bankAcctRadio')
      .waitForElementVisible('@bankNameInput', 'Bank name input is visible')
      .verify.visible('@bankAcctNumInput', 'Bank account number is visible')
      .verify.visible('@routingNumInput', 'Routing number input is visible');
  },

  fillInPaymentMethod(firstName, lastName, billingAdd, city, state, zip) {
    return this.waitForElementVisible('@paymentFirstNameInput', 'First name input is visible')
      .clearValue('@paymentFirstNameInput')
      .setValue('@paymentFirstNameInput', firstName)
      .clearValue('@paymentLastNameInput')
      .setValue('@paymentLastNameInput', lastName)
      .clearValue('@paymentBillingAddInput')
      .setValue('@paymentBillingAddInput', billingAdd)
      .clearValue('@paymentCityInput')
      .setValue('@paymentCityInput', city)
      .clearValue('@paymentStateInput')
      .setValue('@paymentStateInput', state)
      .clearValue('@paymentZipInput')
      .setValue('@paymentZipInput', zip);
  },

  fillInCreditCardForm() {
    return this.waitForElementVisible('@creditCardRadio', 'Payment radios are visible')
      .click('@creditCardRadio')
      .waitForElementVisible('@creditCardNumInput', 'credit card inputs visible')
      .clearValue('@creditCardNumInput')
      .setValue('@creditCardNumInput', 4111111111111111)
      .setValue('@expMonth', 'December')
      .setValue('@expYear', 2020)
      .setValue('@cvvInput', 123);
  },

  fillInBankAcctForm() {
    return this.waitForElementVisible('@creditCardRadio', 'Payment radios are visible')
      .click('@bankAcctRadio')
      .waitForElementVisible('@bankNameInput', 'Bank account inputs visible')
      .clearValue('@bankNameInput')
      .setValue('@bankNameInput', 'Best Bank')
      .setValue('@bankAcctNumInput', 111111111121);
    // .setValue('@routingNumInput', 021000089)
  },

  savePaymentMethod() {
    return this.waitForElementVisible('@savePaymentButton', 'Save payment button is visible')
      .click('@savePaymentButton');
  },

  changePaymentMethod() {
    return this.waitForElementVisible('@changePaymentButton', 'change payment button is visible')
      .click('@changePaymentButton');
  },

  validateHistoryEls() {
    return this.click('@historyTab')
      .waitForElementVisible('@pdfFileButton', 'PDF view button is visible')
      .click('@pdfFileButton')
      .waitForElementVisible('@closePDFButton', 'PDF file is visible')
      .click('@closePDFButton');
  },

};

module.exports = {
  commands: [billingCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/billing`;
  },
  elements: {

    contactTab: {
      selector: '//DIV[@class=\'nav-tabs__item__link\'][text()=\'Contact\']',
      locateStrategy: 'xpath',
    },

    paymentTab: {
      selector: '//DIV[@class=\'nav-tabs__item__link\'][text()=\'Payment\']',
      locateStrategy: 'xpath',
    },

    historyTab: {
      selector: '//DIV[@class=\'nav-tabs__item__link\'][text()=\'History\']',
      locateStrategy: 'xpath',
    },

    /* ------------------CONTACT TAB INPUT------------------------*/

    firstNameInput: {
      selector: '//INPUT[@id=\'contactFirstName\']',
      locateStrategy: 'xpath',
    },

    lastNameInput: {
      selector: '//INPUT[@id=\'contactLastName\']',
      locateStrategy: 'xpath',
    },

    phoneNumInput: {
      selector: '//INPUT[@id=\'contactPhone\']',
      locateStrategy: 'xpath',
    },

    emailInput: {
      selector: '//INPUT[@id=\'contactEmail\']',
      locateStrategy: 'xpath',
    },

    saveBillingContactButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Save Billing Contact\']',
      locateStrategy: 'xpath',
    },

    /* ------------------PAYMENT TAB INPUTS------------------------*/

    paymentTypeListed: {
      selector: '(//LI[@class=\'\'])[1]',
      locateStrategy: 'xpath',
    },

    changePaymentButton: {
      selector: '(//SPAN[@class=\'button__text-wrapper\'])[6]',
      locateStrategy: 'xpath',
    },

    creditCardRadio: {
      selector: '//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[1]/div/label',
      locateStrategy: 'xpath',
    },

    bankAcctRadio: {
      selector: '//*[@id="app"]/div/div[2]/div[2]/div/div[2]/div[2]/div/div/div[1]/div/div[2]/div/label',
      locateStrategy: 'xpath',
    },

    savePaymentButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Save Payment Method\']',
      locateStrategy: 'xpath',
    },

    paymentFirstNameInput: {
      selector: '//INPUT[@id=\'firstName\']',
      locateStrategy: 'xpath',
    },

    paymentLastNameInput: {
      selector: '//INPUT[@id=\'lastName\']',
      locateStrategy: 'xpath',
    },

    paymentBillingAddInput: {
      selector: '//INPUT[@id=\'street1\']',
      locateStrategy: 'xpath',
    },

    paymentCityInput: {
      selector: '//INPUT[@id=\'city\']',
      locateStrategy: 'xpath',
    },

    paymentStateInput: {
      selector: '//INPUT[@id=\'state\']',
      locateStrategy: 'xpath',
    },

    paymentZipInput: {
      selector: '//INPUT[@id=\'zip\']',
      locateStrategy: 'xpath',
    },

    /* -----------------CREDIT CARD INPUTS-------------------------*/

    creditCardNumInput: {
      selector: '//INPUT[@id=\'ccNumber\']',
      locateStrategy: 'xpath',
    },

    expMonth: {
      selector: '//SELECT[@id=\'ccExpMonth\']',
      locateStrategy: 'xpath',
    },

    expYear: {
      selector: '//SELECT[@id=\'ccExpYear\']',
      locateStrategy: 'xpath',
    },

    cvvInput: {
      selector: '//INPUT[@id=\'cardVerificationValue\']',
      locateStrategy: 'xpath',
    },

    /* -----------------BANK ACCT INPUTS-------------------------*/

    bankNameInput: {
      selector: '//INPUT[@id=\'bankName\']',
      locateStrategy: 'xpath',
    },

    bankAcctNumInput: {
      selector: '//INPUT[@id=\'bankAccNum\']',
      locateStrategy: 'xpath',
    },

    routingNumInput: {
      selector: '//INPUT[@id=\'bankRouteNum\']',
      locateStrategy: 'xpath',
    },

    /* -----------------HISTORY TAB ELEMENTS-------------------------*/

    pdfFileButton: {
      selector: '//BUTTON[@class=\'button--reset u-text-primary\'][text()=\'PDF\']',
      locateStrategy: 'xpath',
    },

    closePDFButton: {
      selector: '/html/body/div[4]/div/div[1]/div/button',
      locateStrategy: 'xpath',
    },
  },
};
