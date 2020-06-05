class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  removeObserver(observer) {
    const removeIndex = this.observers.findIndex(obs => obs === observer);
    if (removeIndex !== -1) {
      this.observers = this.observers.slice(removeIndex, 1);
    }
  }

  notify() {
    if (this.observers.length > 0) {
      this.observers.forEach(obs => obs.update());
    }
  }
}

const clickSubject = new Subject();

customElements.define('toggle-button', 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
    }
    
    connectedCallback() {
      const template = document.getElementById('toggle-button');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this.addEventListener('click', e => clickSubject.notify());
    }

  }
);

customElements.define('pricing-card',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({mode: 'open'});
      clickSubject.addObserver(this);
    }
    
    connectedCallback() {
      const template = document.getElementById('pricing-card');
      this.shadowRoot.appendChild(template.content.cloneNode(true));
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