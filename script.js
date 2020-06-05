customElements.define('toggle-button', 
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('toggle-button');
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
);

customElements.define('pricing-card',
    class extends HTMLElement {
        constructor() {
            super();
            const template = document.getElementById('pricing-card');
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
);