customElements.define('pricing-container',
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.addEventListener('notify', this.notify);
    }

    disconnectedCallback() {
      this.removeEventListener('notify', this.notify);
    }

    notify() {
      const cards = this.querySelectorAll('pricing-card');
      cards.forEach(card => card.toggleAttribute('subscribe-annually'));
    }
  }
);

customElements.define('pricing-toggle', 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      const template = document.getElementById('toggle-button');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener('click', this.dispatchNotify);
    }

    disconnectedCallback() {
      this.removeEventListener('click', this.dispatchNotify);
    }

    dispatchNotify() {
      this.dispatchEvent(new CustomEvent('notify', {'bubbles': true}));
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
      
    }

    static get observedAttributes() {
      return ['subscribe-annually'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.update();
    }

    update() {
      const slot = this.querySelector('[slot="pricing"]');
      const isAnnually = this.hasAttribute('subscribe-annually');
      const priceAnnually = slot.getAttribute('annually');
      const priceMonthly = slot.getAttribute('monthly');
      const price = isAnnually ? priceAnnually : priceMonthly;
      slot.innerHTML = price;
    }
  }
);
