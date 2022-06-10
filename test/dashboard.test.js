import Sinon from 'sinon'
import { html, fixture, expect } from '@open-wc/testing';
import '../src/dashboard/Dashboard.js';

describe('dashboard menu', () => {
    it('checks dashboard menu', async () => {
        const el = await fixture(html`<dash-board></dash-board>`);
        const ourd = Sinon.spy(el, 'getOverview');
        el.firstUpdated();
        expect(ourd.calledOnce).to.be.true;
    });


    it('Checks Dashboard accessible ', async () => {
        const el = await fixture(html` <dashboard-overview></dashboard-overview> `);
        await expect(el).to.be.accessible();
    });
});