import { html, fixture, expect } from '@open-wc/testing';
import Sinon from 'sinon';
import { stub } from 'sinon';
import '../src/LoanBasicDetails/BasicDetails.js';
import { LocalizeMixin, localize } from '@lion/localize';
import { FormControlsCollection } from '@lion/form-core';

const el = await fixture(html`<basic-details></basic-details>`);
const form = el.shadowRoot.querySelectorAll('lion-button');
describe('Basic details', () => {
  // Write test cases inside this block
  // refer basic-details.js files

  it('check for accessebility', async () => {
    const el = await fixture(html`  <basic-details></basic-details>`);
    expect(el).to.be.accessible;
  });

  xit('checks en header text', async () => {
    localStorage.setItem('type', 'Home')
    const el = await fixture(html`  <basic-details></basic-details>`);
    const headerText = await el.shadowRoot.querySelector("#type").textContent;
    // const des = Sinon.spy(el, '_increment').returns(true);
    //LoanApplication._increment();
    expect(headerText).to.equal("Loan details");
  });


  xit('checks for spy function', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const amount = el.shadowRoot.querySelectorAll('.amount')[0].textContent;
    console.log(el.shadowRoot.querySelectorAll('.amount')[0])
    expect(amount).to.equal(10000);
  });

  it('checks for spy function', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const myspy = Sinon.spy(el, '_captureDetails');
    el.shadowRoot.querySelector("form").submit();
    expect(myspy.calledOnce).to.be.false;
  });

});
