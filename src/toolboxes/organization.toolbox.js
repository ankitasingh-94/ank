import logger from 'rhinotilities/lib/loggers/logger';
import { client } from 'nightwatch-api';
import {
  deleteOrganization,
  archiveOrganization,
  login,
} from '../services/Rhinoapi.service';

const setup = client.page.AccountSetupPage();

/**
 * Used to create without billing Organization
 * @param  {object} organizationDetails Data to create new Organization
 * @param  {string} envVariable environment variable neme that will contain Organization ID
 */
export function organizationSetUp(organizationDetails, envVariable) {
  setup.navigate()
    .clickBillingToggle()
    .fillInOrgBasicInformation(organizationDetails)
    .clickCreateOrganization()
    .waitForElementNotVisible('@createOrgButton', 'Create Org button not visible')
    .pause(1000)
    .getOrgId(envVariable);
}

/**
 * Used to delete an Organization by OrgId
 * @param  {number} organizationId Organization Id that needs to be deleted
 * @param  {string} username ccr user name
 * @param  {string} password ccr password
 */
export async function orgTearDown(organizationId, username, password) {
  logger.info('Login...');
  const cookie = await login(username, password);
  logger.info(organizationId, '== Deleting Org ==');
  await archiveOrganization(organizationId, cookie);
  logger.info('======== Organization Archive Response =======');
  await deleteOrganization(organizationId, cookie);
  logger.info('====== Organization Deleted =======');
}

/**
 * Used to select an Organization by CCR
 * @param  {string} organizationName Organization name that ccr needs to be logged in
 */
export function selectOrganizationByCCR(organizationName) {
  const org = client.page.UniversalElements();
  org.searchForOrganization(organizationName)
    .ccrOrgLogin()
    .pause(2000);
}