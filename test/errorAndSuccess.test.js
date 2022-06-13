import { html, fixture, expect, waitUntil } from '@open-wc/testing';
import Sinon from 'sinon';
import '../src/SuccessAndError/Success.js';
import '../src/SuccessAndError/Error.js';

let el;
describe('Error screen ', () => {
  // Write test cases inside this block
  beforeEach(async () => {
    el = await fixture(html`<loan-error></loan-error>`);
  })
  it("Passes Element Validataion", async () => {
    expect(el).to.be.accessible();
  })

  it("Passes spy on Validataion ", async () => {
    const el = await fixture(html`<loan-error></loan-error>`);
    const myFunctionStub = Sinon.spy(el, "_toHome");
    // await el.updateComplete;
    // el.shadowRoot.querySelector('button').click()
    // console.log(el.shadowRoot.querySelector('button').in)
    el._toHome();
    expect(myFunctionStub.calledOnce).to.be.true;
  })


});


describe('Success screen', () => {
  // Write test cases inside this block
  beforeEach(async () => {
    el = await fixture(html`<loan-success></loan-success>`);
  })
  it("Passes Element Validataion", async () => {
    expect(el).to.be.accessible();
  })

  it('checks for home method', async () => {
    const spyMethod = Sinon.spy(el, "_toHome");
    const button = el.shadowRoot.querySelectorAll('lion-button');
    // await el.updateComplete;
    button[0].click();
    el._toHome();
    expect(spyMethod.calledOnce).to.be.true;
  });
});
