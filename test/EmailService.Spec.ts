import {EmailService, i_email_params} from "../src/Services/Email.Service";
import { expect } from 'chai';

// @ts-ignore - testing
let samplePostParams: i_email_params = {}

describe('Email Service', () => {

  describe('method validatePostParams', () => {
    it('should do nothing upon valid parameters', () => {
      expect(() => {EmailService.validatePostParams(samplePostParams)}).to.not.throw()
    });

    it('properly throw an error on invalid email params', () => {
      samplePostParams.to = 'bob';
      //@ts-ignore
      expect(() => {EmailService.validatePostParams(samplePostParams)}).to.throw()
    });

    it('properly throw an error on invalid string params', () => {
      // @ts-ignore
      samplePostParams.to_name = 1;
      //@ts-ignore
      expect(() => {EmailService.validatePostParams(samplePostParams)}).to.throw()
    });
    it('properly throw an error on invalid html params', () => {
      // @ts-ignore
      samplePostParams.body = 1;
      //@ts-ignore
      expect(() => {EmailService.validatePostParams(samplePostParams)}).to.throw()
    });
  });

  beforeEach(() => {
    samplePostParams = {
      to: "susan@abcpreschool.org",
      to_name: "Miss Susan",
      from: "noreply@mybrightwheel.com",
      from_name: "brightwheel",
      subject: "Your Weekly Report","body": "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>"
    }
  })
});
