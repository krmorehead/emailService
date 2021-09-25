import {EmailService, i_email_params} from "../src/Services/Email.Service";
import { expect } from 'chai';
import {IntegrationFactory} from "../src/Factories/IntegrationFactory";

describe('IntegrationFactory', () => {
  describe('method: getIntegrations', () => {
    it('should return the email integrations from the global settings', () => {
      console.log(IntegrationFactory.getIntegrations('email'));
      expect(IntegrationFactory.getIntegrations('email')).to.not.be.undefined;
    })
  })
})
