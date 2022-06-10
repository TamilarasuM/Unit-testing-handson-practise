import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { stub } from 'sinon';
// import * as LoanApplication from '../src/LoanApplication.js';
import '../loan-application.js';

describe('LoanApplication', () => {
  // Write test cases inside this block

  it('passes component access', async () => {
    const el = await fixture(html` <LoanApplication></LoanApplication>`);
    expect(el).dom.to.equal('<loanapplication></loanapplication>');
  });

});
