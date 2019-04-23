const testConstants = require('../toolboxes/feeder.toolbox');

const channelRouteCommands = {


    validateChannelRoutes: function () {
        return this.waitForElementVisible('@membersButton', 'members button is visible')
            .verify.visible('@groupsButton', 'groups button is visible')
            .verify.visible('@memberInput', 'search input is visible')
            .verify.visible('@memberResult', 'first member is visible')
    },

    selectMemberRoute: function () {
        return this.waitForElementVisible('@membersButton', 'members button is visible')
            .click('@membersButton')
    },

    selectGroupRoute: function () {
        return this.waitForElementVisible('@groupsButton', 'group button is visible')
            .click('@groupsButton')
    },

    routeSearch: function (searchInput, routeName, result) {
        return this.waitForElementVisible(searchInput, searchInput + ' is visible')
            .setValue(searchInput, routeName)
            .waitForElementVisible(result, result + ' is visible')
            .click(result)
    }
}

module.exports = {
    commands: [channelRouteCommands],
    // url: function () {
    //     return this.api.launch_url + '/settings/organization/channels'
    // },
    elements: {

        /*-------------------------Member container select only-------------------------------*/

        addMemberButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Add More Members']`,
            locateStrategy: 'xpath'
        },

        reviewButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Review']`,
            locateStrategy: 'xpath'
        },

        /*------------------------------------------------------------------*/

        membersButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Members']`,
            locateStrategy: 'xpath',
        },

        groupsButton: {
            selector: `//SPAN[@class='button__text-wrapper'][text()='Groups']`,
            locateStrategy: 'xpath',
        },

        memberInput: {
            selector: `//INPUT[contains(@id, 'preloadedMembers')]`,
            locateStrategy: 'xpath',
        },

        groupInput: {
            selector: `//INPUT[@class='form__control form__control--large'][contains(@name, 'search')]`,
            locateStrategy: 'xpath',
        },

        memberResult: {
            selector: `//SPAN[contains(., '${testConstants.memberName}')]`,
            locateStrategy: 'xpath',
        },

        newPatientGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedPatientTypeGroup}')]`,
            locateStrategy: 'xpath',
        },

        newTeamGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedTeamTypeGroup}')]`,
            locateStrategy: 'xpath',
        },

        newPatientAndTeamGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.updatedpatientAndTeamType}')]`,
            locateStrategy: 'xpath',
        },

        patientGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.patientTypeGroup}')]`,
            locateStrategy: 'xpath',
        },

        teamGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.teamTypeGroup}')]`,
            locateStrategy: 'xpath',
        },

        patientAndTeamGroupResult: {
            selector: `//SPAN[@class='resource__intro__title__content'][contains(text(),'${testConstants.patientAndTeamType}')]`,
            locateStrategy: 'xpath',
        },
    }
};
