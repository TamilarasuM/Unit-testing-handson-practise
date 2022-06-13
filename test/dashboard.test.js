import Sinon from 'sinon'
import { html, fixture, expect, fixtureSync, elementUpdated } from '@open-wc/testing';
import '../src/dashboard/Dashboard.js';
import { DashboardOverview } from '../src/dashboard/Dashboard-overview.js';

describe('dashboard menu', () => {
    it('checks dashboard menu', async () => {
        const el = await fixture(html`<dash-board></dash-board>`);
        const ourd = Sinon.spy(el, 'getOverview');
        el.firstUpdated();
        expect(ourd.calledOnce).to.be.true;
    });

    it('Checks Dashboard overview  accessible ', async () => {
        const el = await fixture(html` <dashboard-overview></dashboard-overview> `);
        await expect(el).to.be.accessible();
    });

    it('Checks Dashboard overview - container class name', async () => {
        const el = await fixture(html` <dashboard-overview></dashboard-overview> `);
        expect(el.shadowRoot.querySelector('div')).to.have.class('container');
    });

    it('Checks Dashboard overview child component dashboard menu', async () => {
        const el = await fixture(html` <dashboard-overview></dashboard-overview> `);
        expect(el.shadowRoot.querySelector('dashboard-menu')).to.be.accessible();
    });

    it('Checks Dashboard Menu building menthod', async () => {
        let dashBrd = new DashboardOverview();
        dashBrd.data = [{ title: 'Home Loan', image: 'images/Home-Loans.jpg' }]
        const el = await fixture(html`${dashBrd._renderdashboardcard()}`);
        expect(el).dom.to.equal('<dashboard-menu imageURL="../src/images/Home-Loans.jpg" title="Home Loan"></dashboard-menu>')
    });

    it('checks for spy', async () => {
        const el = await fixture(html`<dashboard-menu></dashboard-menu>`);
        const button = el.shadowRoot.querySelector('button');
        const fun = Sinon.spy(el, "_setTypeInLS");
        el._setTypeInLS()
        expect(fun.calledOnce).to.be.true;
    });


});