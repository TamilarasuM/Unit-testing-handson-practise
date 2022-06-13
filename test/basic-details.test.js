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
    expect(headerText).to.equal("Loan details");
  });

  it('checks for spy function -nxt ', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const myspy = Sinon.spy(el, '_captureDetails');
    el.shadowRoot.querySelectorAll("lion-button")[1].click();
    expect(myspy.calledOnce).to.be.true;
  });

  it('checks for spy function prev btn', async () => {
    const el = await fixture(html`<basic-details></basic-details>`);
    const myspy = Sinon.spy(el, '_toDashboard');
    el.shadowRoot.querySelectorAll('.btn-previous')[0].click();
    expect(myspy.calledOnce).to.be.true;
  });

});





