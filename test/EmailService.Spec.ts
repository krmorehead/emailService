import {EmailService, IEmailParams} from "../src/Services/Email.Service";
import { expect } from 'chai';
import exp = require("constants");

// @ts-ignore - testing
let samplePostParams: IEmailParams = {}

describe('Email Service', () => {

  describe('method: validatePostParams', () => {
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

  describe('method: proccessPostParams', () => {
    it('Should convert the inner HTML into a plain text version', () => {
      samplePostParams.body = "<h1>Weekly Report</h1><p>You saved 10 hours this week!</p>";
      const expectedBody = "WEEKLY REPORT\n\nYou saved 10 hours this week!"
      const body = EmailService.processPostParams(samplePostParams).body;
      expect(body).to.equal(expectedBody);
    })
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
