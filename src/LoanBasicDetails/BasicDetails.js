/* eslint-disable class-methods-use-this */
import { html, css, LitElement } from 'lit-element';
import { Required, MinNumber, MaxNumber } from '@lion/form-core';
import '@lion/input/lion-input.js';
import '@lion/input-amount/lion-input-amount.js';
import '@lion/input-range/lion-input-range.js';
import '@lion/button/lion-button.js';
import { Router } from '@vaadin/router';
import { LocalizeMixin, localize } from '@lion/localize';
// import { LionProgressIndicator } from '@lion/progress-indicator';
import '../LoanEMIDetails/LoanEMIDetails.js';

import { inWords } from '../utils/numToWord.js';

// import {numWords} from 'num-words';

export class BasicDetails extends LocalizeMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--loan-application-text-color, #000);
        font-family: monospace;
        font-size: 1.5rem;
      }
      h2 {
        font-size: 2rem;
        font-family: monospace;
        text-align: center;
      }
      form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
      .form-field {
        width: 50%;
        padding: 10px 5px;
        margin: auto;
        height: 5%;
      }
      .form-basic {
        margin: auto;
      }
      input {
        height: 25px;
        padding: 4px;
        text-transform: capitalize;
        border: 2px solid grey;
        border-radius: 5px;
      }
      .form-control:focus {
        outline: none;
        box-shadow: 10px grey;
      }
      .emi-details {
        margin: 5px auto;
        text-align: center;
      }
      .btn-previous {
        background-color: #ff0000;
        color: white;
        border-radius: 5px;
        /* width:100px; */
        /* text-align:center; */
      }
      .btn-next {
        background-color: dodgerblue;
        color: white;
        border-radius: 5px;
        /* width:100px; */
      }
      .btn-submit {
        background-color: #009432;
        color: white;
        border-radius: 5px;
        margin: auto;
      }
      .button-content {
        text-align: left;
      }
      .btn-prev-nxt-parent {
        margin: 40px auto;
        width: 50%;
        display: flex;
        justify-content: space-between;
      }
      .button-content {
        text-align: center;
      }
      .btn:hover {
        cursor: pointer;
      }
      #word {
        background-color: #f2a154;
        padding: 5px 10px;
        border: 1px black;
        border-radius: 3px;
        color: azure;
      }
      .e-handle > input {
        border: 2px solid red;
      }
      .type > label {
        color: black;
      }
    `;
  }

  constructor() {
    super();
    this.amount = 10000;
    this.range = 2;
    this.emiCalc = 0;
    this.type = '';
  }

  connectedCallback() {
    super.connectedCallback();
    this.type = localStorage.getItem('type');
  }

  render() {
    return html` <div class="form-basic">
      <h2>${localize.msg('change-language:loandetails')}</h2>
      <lion-form>
        <form class="basic-web-form" @submit=${() => this._captureDetails()}>
          <!-- <div class="basic-form"> -->
          <lion-input
            label="${localize.msg('change-language:Name')}"
            type="text"
            name="type"
            id="type"
            class="type"
            disabled="diasbled"
            style=" color:black"
            .value="${this.type}"
            .validators="${[
        new Required(
          {},
          { getMessage: () => 'Type is a required field' }
        ),
      ]}"
          ></lion-input>

          <lion-input-amount
            type="Number"
            name="amount"
            id="amount"
            class="amount"
            .validators="${[
        new MinNumber(
          { min: 10000 },
          {
            getMessage: () =>
              'Should enter an amount greater than ten thousand ',
          }
        ),
        new MaxNumber(
          { max: 10000000 },
          {
            getMessage: () =>
              'Should enter an amount less than ten crore ',
          }
        ),
        new Required(
          {},
          { getMessage: () => 'Amount is a required field' }
        ),
      ]}"
            .modelValue="${this.amount}"
            label="${localize.msg('change-language:Amount')}"
            @keyup=${() => this._numToWord()}
          >
          </lion-input-amount>

          <div id="word"></div>

          <lion-input-range
            style="max-width: 400px;"
            min="1"
            max="20"
            step="1"
            .modelValue="${this.range}"
            label="${localize.msg('change-language:loanPeriod')}"
            name="Period"
            id="Period"
            class="period"
          >
          </lion-input-range>
        </form>
      </lion-form>

      <div class="btn-prev-nxt-parent">
        <lion-button class="btn-previous btn" @click=${() => this._toDashboard()}
          >${localize.msg('change-language:btnPrev')}</lion-button
        >
        <lion-button @click=${() => this._captureDetails()} class="btn-next btn"
          >${localize.msg('change-language:btnNext')}</lion-button
        >
      </div>
    </div>`;
  }

  _numToWord() {
    //  console.log(e.key)
    const val = this.shadowRoot.querySelector('.amount').value;
    const num = parseFloat(val.replace(/,/g, ''));
    this.shadowRoot.querySelector('#word').innerHTML = inWords(num);
    // this.shadowRoot.querySelector('#word').innerHTML = numWords(num)
    // console.log(inWords(num))
  }

  _captureDetails() {
    const _name = this.shadowRoot.querySelector('.type').value;
    const _amount = this.shadowRoot.querySelector('.amount').value;
    const _period = this.shadowRoot.querySelector('.period').value;

    if (parseFloat(_amount.replace(/,/g, '')) < 10000) {
      // alert('Amount should not be less than 10000');
      this.shadowRoot.querySelector('.amount').classList.add('e-handle');

      setTimeout(() => {
        this.shadowRoot.querySelector('.amount').classList.remove('e-handle');
      }, 2000);

      return;
    }
    const basic = { name: _name, amount: _amount, period: _period };
    // eslint-disable-next-line no-console
    console.log(basic);
    // e.preventDefault();

    fetch('https://loanfeapi.herokuapp.com/calculate-emi', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basic),
    })
      .then(response => response.json())
      .then(data => {
        this.emiCalc = data;
        localStorage.setItem('emi', JSON.stringify(data));
        Router.go('/emidetails');
        // console.log(data);
      });
  }

  /*   _toEmiDetails() {
    // console.log(this.emiCalc);
    Router.go('/emidetails');
    // ;
  } */

  _toDashboard() {
    Router.go('/');
  }
}
customElements.define('basic-details', BasicDetails);
