const testConstants = require('../../feeder');

module.exports = {

  addBillingOrg: function (client) {
    client.maximizeWindow()
    const setup = client.page.AccountSetupPage();

    setup.navigate()
      .fillInOrgBasicInformation(testConstants.name, testConstants.address, testConstants.city,
        testConstants.state, testConstants.zip)
        .setPlan()
       .setSubscriptionDate(testConstants.subsDate)
      .billingContactDetails(testConstants.billingContactFirstName,
        testConstants.billingContactLastName, testConstants.billingEmail,
        testConstants.billingAddressLine1, testConstants.city, testConstants.state,
        testConstants.zip)
      .clickCreateOrganization()
      .getOrgId()

  },

  addWithoutBillingOrg: function (client) {
    client.maximizeWindow()
    const setup = client.page.AccountSetupPage();

    setup.navigate()
      .clickBillingToggle()
      .fillInOrgBasicInformation(testConstants.name, testConstants.address,
        testConstants.city, testConstants.state, testConstants.zip)
      .clickCreateOrganization()
      .getOrgId()
  },

}