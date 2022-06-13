import { LitElement, html, css } from 'lit-element';
import { LocalizeMixin, localize } from '@lion/localize';
import '@lion/button/lion-button.js';
import { Router } from '@vaadin/router';

export class LoanError extends LocalizeMixin(LitElement) {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--loan-application-text-color, #000);
        font-family: monospace;
        font-size: 1.5rem;
        text-align: center;
      }
      h2 {
        font-size: 2rem;
        font-family: monospace;
        text-align: center;
      }
      .home-btn {
        margin: auto;
        background-color: #12cbc4;
        border-radius: 5px;
        color: white;
      }
    `;
  }
  // constructor(){
  //     super();

  // }

  render() {
    return html`
      <div>
        <h2>${localize.msg('change-language:oop')}!!</h2>
        <p>${localize.msg('change-language:errDesc')}</p>
        <lion-button class="home-btn" @click=${() => this._toHome()}
          >${localize.msg('change-language:home')}</lion-button
        >
      </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _toHome() {
    Router.go('/');
  }
}
customElements.define('loan-error', LoanError);
