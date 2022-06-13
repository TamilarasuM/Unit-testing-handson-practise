/* eslint-disable class-methods-use-this */
import { html, css, LitElement } from 'lit-element';
import { LocalizeMixin } from '@lion/localize';
import { Router } from '@vaadin/router';

export class DashboardMenu extends LocalizeMixin(LitElement) {
  static get styles() {
    return css`
      :host {
      }
      .container {
        display: block;
        font-family: sans-serif;
        letter-spacing: 1px;
        font-size: 14px;
        background-color: #ccc;
        padding: 2px 16px;
      }
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        width: 500px;
        padding: 15px;
        background-color: #ddd;
      }

      .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      }

      img {
        height: 150px;
        width: 250px;
        padding: 20px;
      }
    `;
  }

  static get properties() {
    return {
      imageURL: { type: String },
      title: { type: String },
    };
  }

  navigateToDetails() {
    // console.log('clicked');
    Router.go('/details');
  }

  _setTypeInLS() {
    // console.log(this.title);
    localStorage.setItem('type', this.title);
    this.navigateToDetails();
  }

  render() {
    return html`
      <div class="card">
        <button @click=${() => this._setTypeInLS()}>
          <img src=${() => this.imageURL()} alt="loan type" />
          <div class="container">
            <h4><b>${this.title}</b></h4>
          </div>
        </button>
      </div>
    `;
  }
}
window.customElements.define('dashboard-menu', DashboardMenu);
