
let text = '';

const auditLogsCommands = {

  pause: function (time) {
    this.api.pause(time);
    return this;
  },

  elementText: function (ele, message) {
    return this.getText(ele, function (tpObj) {
      text = tpObj.value;
      console.log(text, message);
    });
  },

  validateUrlChange: function () {
    return this.waitForElementNotPresent('@auditLogPageTitle', 6000, false, null, 'Audit Logs page opened successfully')
      .verify.urlContains('auditLog') // maybe some timeout issues happening here working as of 9/20/1
      .pause(5000)
  },

  verifyPageTitle: function(){
    return this.waitForElementVisible('@auditLogPageTitle', 'The Audit Log Page title is visible')
  },

  verifyFiltersVisibility: function(){
    return this.waitForElementVisible('@filtersLabel','Filters Label is visible')
    .verify.visible('@datePicker','Date Picker is visible')
    .verify.visible('@memberFilter','Member Filter is visible')
    .verify.visible('@contactFilter','Contact Filter is visible')
    .verify.visible('@categoryFilter','category Filter is visible')
    .verify.visible('@actionFilter','Action Filter is visible')
  },

  VerifyPaginationVisibility: function(){
    return this.waitForElementVisible('@topPagination','top Pagination is visible')
    .waitForElementVisible('@bottomPagination','Bottom Pagination is visible')
    },

  verifyColumnVisibility: function(){
    return this.verify.visible('@dateColumn','Date Column is visible')
    .verify.visible('@memberColumn','Member Column is visible')
    .verify.visible('@contactColumn','Contact Column is visible')
    .verify.visible('@categoryColumn','category Column is visible')
    .verify.visible('@actionColumn','Action Column is visible')
  },

  verifyExpandAllVisibility: function(){
    return this.waitForElementVisible('@expandAllButton','Expand All Button is visible')
  },

  clickSettingsDropdown: function () {
    return this.waitForElementVisible('@settingsDropdown', 'Settings dropdown is visible')
      .click('@settingsDropdown');
  },

  validateAuditLogsMenuOption: function () {
    return this.verify.visible('@auditLogsOption', 'Audit Log is available')
  },

  clickAuditLogsMenuOption: function () {
    return this.waitForElementVisible('@auditLogsOption', 'Audit Log option is available')
      .click('@auditLogsOption');
  },

  validateTagEntry: function(action, tagName) {
    return this.verify.visible('@auditEntry', 'Tag entry is visible')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', 'Munish Dutta', 'Member name is Munish Dutta')
      .verify.visible('@contact', 'Contact name should not be visible')
      .verify.containsText('@category', 'Tag', 'Category should be Tag')
      .verify.containsText('@action', action, 'Action should be ' + action)
      .verify.containsText('@linkText', 'Details', 'Link text should be Details')
      .click('@linkText')
      .verify.containsText('@staticField', tagName, action + 'ed tag name should be ' + tagName)
  },

  validateBillingEntry: function () {
    return this.verify.visible('@auditEntry', 'Billing entry is visible')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', 'Munish Dutta', 'Member name is Munish Dutta')
      .verify.visible('@contact', 'Contact name should not be visible')
      .verify.containsText('@category', 'Billing', 'Category should be Billing')
      .verify.containsText('@action', 'Edit', 'Action should be Edit')
      .verify.containsText('@linkText', 'Details', 'Link text should be Details')
  },

  validateEventEntry: function (action, eventName) {
    return this.verify.visible('@auditEntry', 'Event entry is visible')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', 'Munish Dutta', 'Member name is Munish Dutta')
      .verify.visible('@contact', 'Contact name should not be visible')
      .verify.containsText('@category', 'Out of Office', 'Category should be Out of Office')
      .verify.containsText('@action', action, 'Action should be ' + action)
      .verify.containsText('@linkText', 'Details', 'Link text should be Details')
      .click('@linkText')
      .verify.containsText('@staticField', eventName, action + 'ed Event should be ' + eventName)
  },

  validateTemplateEntry: function (action, templateTitle) {
    return this.verify.visible('@auditEntry', 'Event entry is visible')
      .verify.visible('@dateAndTime', 'Date and Time is visible')
      .verify.containsText('@member', 'Munish Dutta', 'Member name is Munish Dutta')
      .verify.visible('@contact', 'Contact name should not be visible')
      .verify.containsText('@category', 'Template', 'Category should be Template')
      .verify.containsText('@action', action, 'Action should be ' + action)
      .verify.containsText('@linkText', 'Details', 'Link text should be Details')
      .click('@linkText')
      .verify.containsText('@staticField', templateTitle, action + 'ed template title should be ' + templateTitle)
  },

  checkAuditEntry: function(){
    return this.waitForElementVisible('@categoryFilter','selecting Category Type')
    .waitForElementVisible('@actionFilter','Selecting Action Type')
    .verify.visible('@auditEntry','add entry for the org is available')
    .click('@linkText')
    .elementText('@auditEntry',' :: Entry Details')
  },
}

module.exports = {
  commands: [auditLogsCommands],
  url: function () {
    return this.api.launch_url + '/settings/organization/auditLog'
  },
  elements: {

    //*********------ Page Title -----*********//
    auditLogPageTitle: {
      selector: `//DIV[text()='Audit Log']`,
      locateStrategy: 'xpath',
    },

    filtersLabel : {
      selector : `//DIV[text()='FILTER LOG BY:']`,
      locateStrategy : 'xpath',
    },

    datePicker : {
      selector : `//DIV[@class='daterange__dropdown']//button`,
      locateStrategy : 'xpath',
    },

    memberFilter : {
      selector : `//SPAN[text()='Member(s)']`,
      locateStrategy : 'xpath',
    },

    contactFilter : {
      selector : `//SPAN[text()='Contact(s)']`,
      locateStrategy : 'xpath',
    },

    categoryFilter : {
      selector : `//SPAN[text()='Category']`,
      locateStrategy : 'xpath',
    },

    actionFilter : {
      selector : `//SPAN[text()='Action']`,
      locateStrategy : 'xpath',
    },

    topPagination : {
      selector : `    //DIV[@class="row"]//div[@class='u-m-t-small u-text-right u-text-small audit-log__pagination']`,
      locateStrategy : 'xpath',
    },

    bottomPagination : {
      selector : `//div[@class='box responsive-table audit-log__grid']//div[3][@class='u-m-t-small u-text-right u-text-small audit-log__pagination']`,
      locateStrategy : 'xpath',
    },

    dateColumn : {
      selector : `//DIV[@class='rt-resizable-header-content'][text()='Date']`,
      locateStrategy : 'xpath'
    },

    memberColumn : {
      selector : `//DIV[@class='rt-resizable-header-content'][text()='Member']`,
      locateStrategy : 'xpath'
    },

    contactColumn : {
      selector : `//DIV[@class='rt-resizable-header-content'][text()='Contact']`,
      locateStrategy : 'xpath'
    },

    categoryColumn : {
      selector : `//DIV[@class='rt-resizable-header-content'][text()='Category']`,
      locateStrategy : 'xpath'
    },

    actionColumn : {
      selector : `//DIV[@class='rt-resizable-header-content'][text()='Action']`,
      locateStrategy : 'xpath'
    },

    expandAllButton : {
      selector : `//BUTTON[@class='button expand-all__button button--link']`,
      locateStrategy : 'xpath',
    },

    //*********------- Audit Logs Menu option ------*********//

    settingsDropdown: {
      selector: `//*[@id="cuke-main-settings"]/div/button`,
      locateStrategy: 'xpath',
    },

    auditLogsOption: {
      selector: `//DIV[@class = 'dropdown__menu__item__content__label']/span[text()='Audit Log']`,
      locateStrategy: 'xpath',
    },

    //*********-------Audit entry ------*********//
    auditEntry: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]`,
      locateStrategy: 'xpath',
    },

    dateAndTime: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[1]`,
      locateStrategy: 'xpath',
    },

    member: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[2]`,
      locateStrategy: 'xpath',
    },

    contact: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[3]`,
      locateStrategy: 'xpath',
    },

    category: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[4]`,
      locateStrategy: 'xpath',
    },

    action: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[5]`,
      locateStrategy: 'xpath',
    },

    linkText: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]/DIV[1]/DIV[6]`,
      locateStrategy: 'xpath',
    },

    staticField: {
      selector: `//DIV[@class = 'rt-tbody']/DIV[1]//DIV[@class = 'u-inline-grid expand-row__detail u-inline-grid--small']//div[2]`,
      locateStrategy: 'xpath',
    }
  }
}