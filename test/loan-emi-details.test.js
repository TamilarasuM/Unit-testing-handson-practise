import { html, fixture, expect } from '@open-wc/testing';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import { localize } from '@lion/localize';
import '../../locale/inline-data.js';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import Sinon from 'sinon';
import { LoanEMIDetails } from '../src/LoanEMIDetails/LoanEMIDetails.js';

localStorage.setItem('emi', '{"interestRate":"7.00","monthlyEMI":"447.73","principal":"10000.00","interest":"745.42","totalAmount":"10745.42"}')
const el = await fixture(html`<loanemi-details></loanemi-details>`);
var button = await el.shadowRoot.querySelectorAll('lion-button');

describe('Loan EMI details', () => {

  beforeEach(async function () {
    localStorage.setItem('emi', '{"interestRate":"7.00","monthlyEMI":"447.73","principal":"10000.00","interest":"745.42","totalAmount":"10745.42"}')
  })

  afterEach(function () {
    localStorage.removeItem('emi');
  })

  it('checks for the accessibility - data hard coded in before value', async function () {
    expect(this.el).to.be.accessible();
  });

  it('Passes title name check', async () => {
    const h2 = el.shadowRoot.querySelector('h2');
    expect(h2).to.exist;
    expect(h2.textContent).to.equal('EMI Details');
  });

  xit('should navigate to customer page is working ', async function () {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    var button1 = await el.shadowRoot.querySelectorAll('lion-button');
    const myspy = Sinon.spy(el, '_toBasicDetails');
    button1[0].click();
    expect(myspy.calledOnce).to.be.true;

  });

  xit('spy the method next(_toCustomer)', async () => {
    const el = await fixture(html`<loanemi-details></loanemi-details>`);
    let btn = await el.shadowRoot.querySelector('lion-button');
    const myspy = Sinon.spy(el, '_toCustomer');

    btn[1].click();
    expect(myspy.calledOnce).to.be.true;
  });

});
