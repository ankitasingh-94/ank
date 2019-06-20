import logger from 'rhinotilities/lib/loggers/logger';

const channelFeeder = require('../feeder/channel.feeder');

const channelsCommands = {

  validateChannelsEls() {
    return this
      .waitForElementPresent('@channelsPageTitle', 'Channels Page Opened.')
      .waitForElementVisible('@addChannelButton', 'add channel button is present');
  },

  channelEditMode(channel) {
    this.api.useXpath().waitForElementVisible(`//SPAN[contains(text(),'${channel}')]`, `${channel} Created Channel is visible in the channel list.`)
      .click(`//SPAN[contains(text(),'${channel}')]`);
    return this.waitForElementVisible('@editChannel', 'Summary Panel opened.')
      .click('@editChannel');
  },

  addChannel() {
    return this.waitForElementVisible('@addChannelButton', 'add channel button is visible')
      .click('@addChannelButton');
  },

  checkElementVisibility(element) {
    logger.info('check visibility of edit page title');
    return this.waitForElementVisible(element, 1000, (result) => {
      logger.info(`Element Visibility ${result.value}`);
      if (result.value) {
        logger.info('>>>>>>>>>>>>>> Inside If condition');
        this.click(element);
      }
    });
  },

  verifyUpdatedChannel(updatedChannel) {
    return this.waitForElementVisible(updatedChannel, `${updatedChannel} Created Channel is visible in the channel list.`)
      .click(updatedChannel);
  },
};

module.exports = {
  commands: [channelsCommands],
  url() {
    return `${this.api.launch_url}/settings/organization/channels`;
  },

  elements: {

    channelsPageTitle: {
      selector: '//DIV[@class=\'app-page__header__title\'][contains(text(),\'Channels\')]',
      locateStrategy: 'xpath',
    },

    addChannelButton: {
      selector: '//BUTTON[contains(@title,\'Create Channel\')]//SPAN',
      locateStrategy: 'xpath',
    },

    channelName: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${channelFeeder.channelName}')]`,
      locateStrategy: 'xpath',
    },

    billingChannelName: {
      selector: `//SPAN[@class='resource__intro__title__content has-subtitle'][contains(text(),'${channelFeeder.channelName1}')]`,
      locateStrategy: 'xpath',
    },

    rhinoSecureChannelTitle: {
      selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${channelFeeder.rhinoChannelName}')]`,
      locateStrategy: 'xpath',
    },

    editChannel: {
      selector: '//SPAN[@class=\'button__text-wrapper\'][contains(text(),\'Edit Channel\')]',
      locateStrategy: 'xpath',
    },

    editPageTitle: {
      selector: '//*[@class=\'app-page__header\']//*[text()=\'Edit Channel\']',
      locateStrategy: 'xpath',
    },
  },
};
