const notify = new Event('notify');

customElements.define('pricing-toggle', 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      const template = document.getElementById('toggle-button');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener('click', _ => this.dispatchEvent(notify));
    }

    disconnectedCallback() {
      this.removeEventListener('click', _ => this.dispatchEvent(notify));
    }

  }
);

customElements.define('pricing-card',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      const template = document.getElementById('pricing-card');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener('notify', update);
    }

    update() {
      const slot = this.querySelector('[slot="pricing"]');
      const price = Number(slot.innerHTML);
      const isAnnually = slot.hasAttribute('annually');
      const newPrice = isAnnually ? price / 11 : price * 11;
      slot.toggleAttribute('annually');
      slot.innerHTML = newPrice.toFixed(2);
    }
  }
);