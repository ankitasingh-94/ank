import logger from 'rhinotilities/lib/loggers/logger';

const { colors, noteText, messageAlertText } = require('../constants');

let text = '';

const billingCommands = {

  elementText(ele, message) {
    return this.getText(ele, (tpObj) => {
      text = tpObj.value;
      logger.info(text, message);
    });
  },

  getOfferedMember(memberCount) {
    this.getText('@offeredMembers', (result) => {
      global[memberCount] = result;
      logger.info(`${memberCount} members are offered in this plan`);
    });
  },

  validateUrlChange() {
    return this.waitForElementNotPresent('@billingPage', 6000, false, null, 'Billing page opened successfully')
      .verify.urlContains('billing') // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000);
  },

  validateSectionsForStandardPlan() {
    return this.waitForElementVisible('@billingPage', 'Billing Page is available')
      .verify.visible('@planDetailsSection', 'Billing Detail Section is visible')
      .verify.visible('@contactDetailSection', 'Contact Detail Section is visible')
      .verify.visible('@paymentMethodSection', 'Payment Method Section is visible')
      .verify.visible('@historySection', 'History Section is visible');
  },

  verifyPlanName(PlanName) {
    return this.waitForElementVisible(PlanName, `${PlanName} is visible`);
  },

  validateProductOffered(productName, offeredProduct) {
    return this.waitForElementVisible(productName, `${productName} is visible`)
      .waitForElementVisible(offeredProduct, `${offeredProduct} is visible`);
  },

  validateCurrentUsage(productName, qtyUsed) {
    return this.verify.visible(productName, `${productName} component is visible`)
      .waitForElementVisible(qtyUsed, `${qtyUsed} is visible`);
  },

  validateSection(sectionName) {
    return this.waitForElementVisible(sectionName, `${sectionName} is visible`);
  },

  validateColors(element, property) {
    this.verify.visible(element, 'Element is visible');

    return this.getCssProperty(element, property, (res) => {
      const currentColor = colors.filter(val => val.code === res.value);
      if (Array.isArray(currentColor) && currentColor.length > 0) {
        logger.info(`${res.value} : ${currentColor[0].color} in Color!`);
      }
    });
  },

  validateMessageUpdateAlert() {
    return this.verify.visible('@messageUpdateAlert', 'The Alert for message count is visible')
      .expect.element('@messageUpdateAlert').text.to.contain(messageAlertText);
  },

  validateEstimatedBillSection() {
    return this.waitForElementVisible('@estimatedBillSection', 'Estimated Bill Section header is visible')
      .verify.visible('@nextBillDate', 'Next Bill Date is visible')
      .verify.visible('@viewPDFEstimatedBill', 'Link Text to view pdf is visible')
      .click('@viewPDFEstimatedBill')
      .pause(2000)
      .waitForElementPresent('@pdfInvoice', 25000, false, null, 'Projected invoice PDF is opened')
      .click('@closePDFButton')
      .waitForElementNotPresent('@pdfInvoice', 5000, false, null, 'Projected invoice PDF is closed')
      .pause(1000);
  },

  validateEstimatedBillNote() {
    return this.verify.visible('@noteEstimatedBill', 'Note for Estimated Bill is visible')
      .expect.element('@noteEstimatedBill').text.to.deep.equal(noteText);
  },

  verifyContactInformation() {
    return this.verify.visible('@availableContactDetails', 'Billing Contact Info is visible')
      .elementText('@availableContactDetails', 'Billing Contact Details');
  },

  verifyBillingContactModalElements() {
    return this.waitForElementVisible('@updateContactModalHeader', 'Modal is opened and visible')
      .verify.visible('@contactFirstNameInput', 'FirstName input field is visible')
      .verify.visible('@contactLastNameInput', 'LastName input field is visible')
      .verify.visible('@phoneNumberInput', 'Phone number input field is visible')
      .verify.visible('@emailAddrInput', 'emailAddress field is available')
      .verify.visible('@billingLine1Input', 'Billing Line 1 input field is available')
      .verify.visible('@billingLine2Input', 'Billing Line 2 input field is available')
      .verify.visible('@cityInput', 'City Input field is visible')
      .verify.visible('@stateInput', 'state select type drop down is visible')
      .verify.visible('@contactZipInput', 'Zip Input field is visible')
      .verify.visible('@cancelUpdateBillingContactButton', 'Cancel Button is visible')
      .verify.visible('@contactSaveButton', 'The save billing contact button is visible');
  },

  updateBillingContact() {
    return this.updateDetails('@contactFirstNameInput', 'Edited_FN')
      .updateDetails('@contactLastNameInput', 'Edited_LN')
      .updateDetails('@phoneNumberInput', '9876543211')
      .updateDetails('@emailAddrInput', 'test@email.com')
      .updateDetails('@billingLine1Input', 'Billing Line1')
      .updateDetails('@billingLine2Input', 'Billing Line2')
      .updateDetails('@cityInput', 'Billing City')
      .updateDetails('@stateInput', 'Florida')
      .updateDetails('@contactZipInput', '13245')
      .click('@contactSaveButton')
      .waitForElementVisible('@billingContactUpdateSuccessMessage', 40000, 'Update Modal is hidden, Success message displayed')
      .waitForElementVisible('@editedContactDetails', 'Edited Details exist, Edit successful');
  },

  validateAvailableDetails(element) {
    return this.waitForElementVisible(element, 'Details are visible')
      .elementText(element, 'are the available Details');
  },

  validateUpdateLink(element) {
    return this.verify.visible(element, 'Link to Update Details is visible');
  },

  openUpdateModal(element1, element2) {
    return this.waitForElementVisible(element1, 'Link to Update Details is visible')
      .click(element1)
      .pause(1000)
      .waitForElementVisible(element2, 'Update Modal is Opened');
  },

  updateDetails(element, newValue) {
    return this.verify.visible(element, `${element} is visible`)
      .clearValue(element)
      .setValue(element, newValue);
  },

  changePaymentMethod(element) {
    return this.waitForElementVisible(element, 'Radio button to select payment method is visible')
      .click(element);
  },

  validateUpdateModalCC() {
    return this.verify.visible('@paymentFirstNameInput', 'First Name field is visible')
      .verify.visible('@paymentLastNameInput', 'Last Name field is visible')
      .verify.visible('@creditCardInput', 'Credit Card field is visible')
      .verify.visible('@expirationMonthSelect', 'Expiration Month field is visible')
      .verify.visible('@expirationYearSelect', 'Expiration Year field is visible ')
      .verify.visible('@cvvInput', 'CVV field is visible')
      .verify.visible('@creditCardZipInput', 'Zip Code field is visible')
      .click('@cancelPaymentUpdateButton')
      .waitForElementVisible('@changePaymentMethodButton', 'Update Modal Closed');
  },

  validateUpdateModalBankAccount() {
    return this.verify.visible('@paymentFirstNameInput', 'First Name field is visible')
      .verify.visible('@paymentLastNameInput', 'Last Name field is visible')
      .verify.visible('@bankNameInput', 'Bank Name field is visible')
      .verify.visible('@bankAccountNumberInput', 'Account Number field is visible')
      .verify.visible('@bankRoutingNumberInput', 'Routing Number field is visible ')
      .verify.visible('@bankAccountTypeSelect', 'Account Type field is visible')
      .click('@cancelPaymentUpdateButton');
  },

  updatePaymentToBank() {
    return this.updateDetails('@bankNameInput', 'Test_Bank')
      .updateDetails('@paymentFirstNameInput', 'Heena')
      .updateDetails('@paymentLastNameInput', 'Choudhary')
      .updateDetails('@bankAccountNumberInput', '12345678989')
      .updateDetails('@bankRoutingNumberInput', '123456789')
      .updateDetails('@bankAccountTypeSelect', 'Saving')
      .click('@savePaymentMethodButton')
      .waitForElementVisible('@updatePaymentSuccessMessage', 40000, 'Update Modal is hidden, Success message available')
      .waitForElementVisible('@bankName', 'Bank Name exists, Edit successful');
  },

  validateAccountTypeOptions() {
    this.verify.visible('@bankAccountTypeSelect', 'Account Type field is visible');
    this.getAttribute('@bankAccountTypeSelect', 'option', (result) => {
      logger.info(result);
    });
  },

  validateBillingHistory() {
    return this.verify.visible('@historyTable', 'History is available')
      .elementText('@historyTable', ' Is the History table data');
  },

  validatePDFOpen() {
    return this.verify.visible('@pdfButton', 'PDF Link Text is available')
      .pause(1000)
      .click('@pdfButton')
      .pause(1000)
      .waitForElementVisible('@pdfInvoice', 40000, 'Invoice Modal is open');
  },

  historySection() {
    const self = this;
    return this.getText('body', (bodyText) => {
      if (bodyText.value.includes('No billing history for this organization.')) {
        logger.info('No History Available');
        return self;
      }
      return self.validateBillingHistory()
        .validatePDFOpen();
    });
  },
};

module.exports = {
  commands: [billingCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/billing`;
  },
  elements: {

    //* ********------ Page Title -----*********//
    billingPage: {
      selector: '//DIV[@class = \'app-page__header__title\'][text()=\'Billing & Plan\']',
      locateStrategy: 'xpath',
    },

    //* ********------- Sections ------*********//
    planDetailsSection: {
      selector: '//DIV[@class = \'box__title\'][text()=\'Plan Details\']',
      locateStrategy: 'xpath',
    },

    contactDetailSection: {
      selector: '//DIV[@class=\'box__title\'][text()=\'Contact Details\']',
      locateStrategy: 'xpath',
    },

    paymentMethodSection: {
      selector: '//DIV[@class=\'box__title\'][text()=\'Payment Method\']',
      locateStrategy: 'xpath',
    },

    historySection: {
      selector: '//DIV[@class=\'box__title\'][text()=\'History\']',
      locateStrategy: 'xpath',
    },

    //* ********------ Current Plan Section -----*********//
    planName: {
      selector: '//H4[@id=\'billing__planName\']',
      locateStrategy: 'xpath',
    },

    planAmount: {
      selector: '//SMALL[@class = \'u-text-small u-font-weight-normal\'][contains(text(),\'a month\')]',
      locateStrategy: 'xpath',
    },

    // ------Products from Legacy Plans------//
    textMessageProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Messages\')]',
      locateStrategy: 'xpath',
    },

    offeredMessages: {
      selector: '//*[contains(@id,\'billing__messages__planCount\')]',
      locateStrategy: 'xpath',
    },

    membersProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Members\')]',
      locateStrategy: 'xpath',
    },

    offeredMembers: {
      selector: '//*[contains(@id,\'billing__members__planCount\')]',
      locateStrategy: 'xpath',
    },

    textChannelProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Business Line\')]',
      locateStrategy: 'xpath',
    },

    offeredTextChannels: {
      selector: '//*[contains(@id,\'billing__businessline__planCount\')]',
      locateStrategy: 'xpath',
    },

    integrationsProduct: {
      selector: '//DIV[text()=\'Integration\']',
      locateStrategy: 'xpath',
    },

    integrationsStatus: {
      selector: '//*[@id = \'billing__integrationCount\']',
      locateStrategy: 'xpath',
    },

    // ------Products from New Plans introduced with 3.2.0------//
    offeredLocations: {
      selector: '//*[contains(@id,\'billing__locations__planCount\')]',
      locateStrategy: 'xpath',
    },

    locationsProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Locations\')]',
      locateStrategy: 'xpath',
    },

    offeredProviders: {
      selector: '//*[contains(@id,\'billing__providers__planCount\')]',
      locateStrategy: 'xpath',
    },

    ProvidersProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Providers\')]',
      locateStrategy: 'xpath',
    },

    offeredPhoneLines: {
      selector: '//*[contains(@id,\'billing__additionalphonelines__planCount\')]',
      locateStrategy: 'xpath',
    },

    PhoneLinesProduct: {
      selector: '//DIV[@class =\'u-text-small\'][contains(text(),\'Phone Lines\')]',
      locateStrategy: 'xpath',
    },

    // ------ Current Usage Section -----//
    currentUsageSection: {
      selector: '//H4[contains(text(),\'Current Usage\')]',
      locateStrategy: 'xpath',
    },

    textMessageUsage: {
      selector: '//DIV[@class =\'u-text-center u-text-small u-text-muted\'][contains(text(),\'Messages\')]',
      locateStrategy: 'xpath',
    },

    usedTextMessage: {
      selector: '//*[contains(@title ,\'Messages count\')]',
      locateStrategy: 'xpath',
    },

    messageAnimator: {
      selector: '//*[contains(@style,\'stroke-dashoffset\')]',
      locateStrategy: 'xpath',
    },

    membersUsage: {
      selector: '//DIV[@class =\'u-text-center u-text-small u-text-muted\'][contains(text(),\'Members\')]',
      locateStrategy: 'xpath',
    },

    usedMembers: {
      selector: '//*[contains(@title,\'Members count\')]',
      locateStrategy: 'xpath',
    },

    textChannelUsage: {
      selector: '//DIV[@class =\'u-text-center u-text-small u-text-muted\'][contains(text(),\'Business Line\')]',
      locateStrategy: 'xpath',
    },

    usedTextChannels: {
      selector: '//*[contains(@title,\'Business Line count\')]',
      locateStrategy: 'xpath',
    },

    messageUpdateAlert: {
      selector: '//DIV[text()=\'Message count reflects usage as of 11:00 PM EST on \']',
      locateStrategy: 'xpath',
    },

    // ------ Estimated Bill Section -----//
    estimatedBillSection: {
      selector: '//H4[contains(text(),\'Estimated Bill\')]',
      locateStrategy: 'xpath',
    },

    nextBillDate: {
      selector: '//SMALL[contains(text(),\'next bill\')]',
      locateStrategy: 'xpath',
    },

    viewPDFEstimatedBill: {
      selector: '//SPAN[(text() = \'View PDF\')]',
      locateStrategy: 'xpath',
    },

    closePDFButton: {
      selector: '//BUTTON[@title = \'Close\']//*[@class=\'icon\']',
      locateStrategy: 'xpath',
    },

    noteEstimatedBill: {
      selector: '//*[contains(text(),\'Note\')]',
      locateStrategy: 'xpath',
    },

    // ---------------------- Billing Contact Section //----------------------//
    updateContactModalHeader: {
      selector: '//H3[contains(text(), \'Billing Contact Details\')]',
      locateStrategy: 'xpath',
    },

    availableContactDetails: {
      selector: '//P[@id=\'billing__contact\']',
      locateStrategy: 'xpath',
    },

    editedContactDetails: {
      selector: '//DIV//P//SPAN[contains(text(),\'Edited_FN\')]',
      locateStrategy: 'xpath',
    },

    updateBillingContactButton: {
      selector: '//SPAN[contains(text(), \'Update\')]',
      locateStrategy: 'xpath',
    },

    billingContactUpdateSuccessMessage: {
      selector: '//DIV[text()=\'Billing Contact updated successfully.\']',
      locateStrategy: 'xpath',
    },

    contactFirstNameInput: {
      selector: '//INPUT[@name=\'contactFirstName\']',
      locateStrategy: 'xpath',
    },

    contactLastNameInput: {
      selector: '//INPUT[@name=\'contactLastName\']',
      locateStrategy: 'xpath',
    },

    phoneNumberInput: {
      selector: '//INPUT[@name=\'contactPhone\']',
      locateStrategy: 'xpath',
    },

    emailAddrInput: {
      selector: '//INPUT[@name=\'contactEmail\']',
      locateStrategy: 'xpath',
    },

    billingLine1Input: {
      selector: '//INPUT[@name=\'street1\']',
      locateStrategy: 'xpath',
    },

    billingLine2Input: {
      selector: '//INPUT[@name=\'street2\']',
      locateStrategy: 'xpath',
    },

    cityInput: {
      selector: '//INPUT[@name=\'city\']',
      locateStrategy: 'xpath',
    },

    stateInput: {
      selector: '//SELECT[@name=\'state\']',
      locateStrategy: 'xpath',
    },

    contactZipInput: {
      selector: '//INPUT[@name=\'zip\']',
      locateStrategy: 'xpath',
    },

    cancelUpdateBillingContactButton: {
      selector: '//BUTTON[@title=\'Cancel updating billing contact\']',
      locateStrategy: 'xpath',
    },

    contactSaveButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Save Billing Contact\']',
      locateStrategy: 'xpath',
    },

    // ---------------------- Payment Method Section //----------------------//
    availablePaymentMethodDetails: {
      selector: '//DIV[@id = \'billing__paymentMethod\']',
      locateStrategy: 'xpath',
    },

    namePaymentMethod: {
      selector: '//SPAN[@id = \'billing__paymentMethod__name\']',
      locateStrategy: 'xpath',
    },

    // Available Payment Details - Credit Card
    creditCardNumber: {
      selector: '//LI[contains(text(),\'Credit Card Number\')]',
      locateStrategy: 'xpath',
    },

    expirationDate: {
      selector: '//LI[contains(text(),\'Expiration Date\')]',
      locateStrategy: 'xpath',
    },

    // Available Payment Details - Bank Account
    bankName: {
      selector: '//LI[contains(text(),\'Bank Name\')]',
      locateStrategy: 'xpath',
    },

    routingNumber: {
      selector: '//LI[contains(text(),\'Routing Number\')]',
      locateStrategy: 'xpath',
    },

    accountNumber: {
      selector: '//LI[contains(text(),\'Account Number\')]',
      locateStrategy: 'xpath',
    },

    changePaymentMethodButton: {
      selector: '//SPAN[contains(text(),\'Change\') or contains (text(),\'Add\')]',
      locateStrategy: 'xpath',
    },

    // Update Billing Payment Method Modal
    updatePaymentModalHeader: {
      selector: '//H3[contains(text(), \'Billing Payment Method\')]',
      locateStrategy: 'xpath',
    },

    radioCreditCard: {
      selector: '//LABEL[contains(text(),\'Credit Card\')]',
      locateStrategy: 'xpath',
    },

    radioBankAccount: {
      selector: '//LABEL[contains(text(),\'Bank Account\')]',
      locateStrategy: 'xpath',
    },

    paymentFirstNameInput: {
      selector: '//INPUT[contains(@name, \'firstName\')]',
      locateStrategy: 'xpath',
    },

    paymentLastNameInput: {
      selector: '//INPUT[contains(@name, \'lastName\')]',
      locateStrategy: 'xpath',
    },

    // Credit Card Form
    creditCardInput: {
      selector: '//INPUT[contains(@name, \'creditCardNumber\')]',
      locateStrategy: 'xpath',
    },

    expirationMonthSelect: {
      selector: '//SELECT[contains(@name, \'creditCardExpMonth\')]',
      locateStrategy: 'xpath',
    },

    expirationYearSelect: {
      selector: '//SELECT[contains(@name, \'creditCardExpYear\')]',
      locateStrategy: 'xpath',
    },

    cvvInput: {
      selector: '//INPUT[contains(@name, \'creditCardVerificationValue\')]',
      locateStrategy: 'xpath',
    },

    creditCardZipInput: {
      selector: '//INPUT[contains(@name, \'creditCardZip\')]',
      locateStrategy: 'xpath',
    },

    // Bank Account Form
    bankNameInput: {
      selector: '//INPUT[contains(@name, \'bankName\')]',
      locateStrategy: 'xpath',
    },

    bankAccountNumberInput: {
      selector: '//INPUT[contains(@name, \'bankAccountNumber\')]',
      locateStrategy: 'xpath',
    },

    bankRoutingNumberInput: {
      selector: '//INPUT[contains(@name, \'bankRoutingNumber\')]',
      locateStrategy: 'xpath',
    },

    bankAccountTypeSelect: {
      selector: '//SELECT[contains(@name, \'activeBankAccountTypeId\')]',
      locateStrategy: 'xpath',
    },

    cancelPaymentUpdateButton: {
      selector: '//BUTTON[@title=\'Cancel updating billing payment method\']',
      locateStrategy: 'xpath',
    },

    savePaymentMethodButton: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Save Payment Method\']',
      locateStrategy: 'xpath',
    },

    updatePaymentSuccessMessage: {
      selector: '//DIV[text()=\'Payment Profile updated successfully.\']',
      locateStrategy: 'xpath',
    },

    // ---------------------- History Section //----------------------//
    historyTable: {
      selector: '//DIV[@class=\'responsive-table\']',
      locateStrategy: 'xpath',
    },

    pdfButton: {
      selector: '(//SPAN[@class=\'button__text-wrapper\'][text()=\'PDF\'])[1]',
      locateStrategy: 'xpath',
    },

    pdfInvoice: {
      selector: '//CANVAS[@id=\'page1\']',
      locateStrategy: 'xpath',
    },

    NoBillingHistory: {
      selector: '//P[contains(text(), \'No billing history for this organization.\')]',
      locateStrategy: 'xpath',
    },

    loadMoreLink: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'Load more\']',
      locateStrategy: 'xpath',
    },

    viewLessLink: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][text()=\'View less\']',
      locateStrategy: 'xpath',
    },
  },
};
