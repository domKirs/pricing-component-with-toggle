customElements.define('toggle-button', 
    class extends HTMLElement{
        constructor() {
            super();
            const template = document.getElementById('toggle-button');
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }
);