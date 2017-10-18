/*--------------------------------------------------------------------------------------------------------*/

// The purpose of these tests are to make sure the elements present throughout the app (universalElements)
// render properly and function properly when clicked and lead to their respective end points

/*--------------------------------------------------------------------------------------------------------*/

module.exports = {

  //Logs into app to start tests
  'Login Page with Correct Credentials': function(client) {
    const login = client.page.LoginPage();

    login.navigate()
      .fillInForm('ntester', 'tester')
      .submit()
      .validateUrlChange()
  },

  'Universal Elements render': function(client) {
    const universalElements = client.page.UniversalElements();

    universalElements.validateUniversalElements()
      .validateSearchDropdown('fro')
      .validateSettingsDropdown()

    client.pause(3000);
  },

  'Test click app-navigation buttons': function(client) {
    const universalElements = client.page.UniversalElements();

    universalElements.clickAppNavButtons()

    client.pause(3000);
  },

  'Test click search dropdown buttons': function(client) {
    const universalElements = client.page.UniversalElements();
    const addContactPopup = client.page.AddContactPopupPage();

    universalElements.clickSearchDropdownButtons('fro')

    addContactPopup.renderAddContactsPage()
      .closeAddContactsPage()

    client.pause(3000);
  },

  'Test click all setting dropdown buttons': function(client) {
    const universalElements = client.page.UniversalElements();
    const sysDet = client.page.SystemDetailPage()

    universalElements.clickMyProfile()
      .pause(1000)
      .clickMyPreferences()
      .pause(1000)
      .clickAutoResponse()
      .pause(1000)
      .clickChannels()
      .pause(1000)
      .clickMembers()
      .pause(1000)
      .clickOrgPreferences()
      .pause(1000)
      .clickOrgProfile()
      .pause(1000)
      .clickTemplates()
      .pause(1000)
      .clickSystemDetails()
      .pause(1000);

    sysDet.leaveSysDetailsPage();

    universalElements.clickLogout();

    client.end(3000);
  },
}
