import { html, fixture, expect } from '@open-wc/testing';
import { localize } from '@lion/localize';
import { stub } from 'sinon';
import '../src/Customer/Customer-details.js';
import Sinon from 'sinon';

let el = await fixture(html`<customer-details></customer-details>`)
describe('customer details', () => {
  it("accessabiliy check", () => {
    expect(el).to.accessible;
  });
  it("Passes spy on EMI Details check", () => {
    const mySPY = Sinon.spy(el, "_toEmidetails");
    el.shadowRoot.querySelector(".backbg-btn-color").click();
    expect(mySPY.calledOnce).to.be.true;
  });
  it('should contain the amount field', async () => {
    const el = await fixture(html`<lion-input-amount label="${localize.msg('change-language:previousemi')}"></lion-input-amount>`);
    await expect(el.label).to.equal('Previous EMIs Amount');
  });

  xit('checks for emi details', async () => {
    const el = await fixture(html`<customer-details></customer-details>`);
    const spy = Sinon.spy(el, 'submitHandler');
    const tags = el.shadowRoot.querySelector('lion-input')[0];
    tags.click();
    expect(spy.calledOnce).to.be.true;
    await el.shadowRoot.querySelector('.backbg-btn-color').click();
  });
});
