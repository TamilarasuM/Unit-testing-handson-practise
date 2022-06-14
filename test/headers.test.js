import { localize } from '@lion/localize';
import '../../locale/inline-data.js';
import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import { stub } from 'sinon';
import Sinon from 'sinon'
import '../src/header/Header.js';
import { Header } from '../src/header/Header.js'

describe('loan-header component check', () => {
    it('checks header title', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const headerTxt = await el.shadowRoot.querySelector('p').innerText;
        expect(headerTxt).to.equal('Apply Loan');
    });
    it('passes accessibility test For EN (validated by Class atrribute)', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const enBtn = await el.shadowRoot.querySelector('button[class="en-GB bg-btn-color "]');
        await expect(enBtn).to.be.accessible();
    });
    it('passes accessibility test For NL - (validated by ID atrribute)', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const enBtn = await el.shadowRoot.querySelector('button[id="nl-NL"]');
        await expect(enBtn).to.be.accessible();
    });

    it('passes accessibility test For language BTN click (EN)', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const enBtn = await el.shadowRoot.querySelector('button[id="en-GB"]');
        await enBtn.click();
        await expect(localize.locale).to.equal('en-GB');
    });
    it('passes accessibility test For localeChanged Event', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const myFunctionStub = Sinon.spy(el, 'localeChanged');
        const enBtn = await el.shadowRoot.querySelector('button[id="nl-NL"]');
        enBtn.click();
        expect(myFunctionStub).to.have.callCount(1);
    });
    it('passes accessibility test For language BTN click(NL)', async () => {
        const el = await fixture(html` <loan-header></loan-header> `);
        const enBtn = await el.shadowRoot.querySelector('button[id="nl-NL"]');
        await enBtn.click();
        await expect(localize.locale).to.equal('nl-NL');
    });
});
