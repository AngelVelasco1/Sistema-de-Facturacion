let pathName = new URL(import.meta.url).pathname;
let name = pathName.split('/').pop().replace('.js', '');

export default class myCartAside extends HTMLElement {
    static utl = import.meta.url;
    static async components() {
        return await (await fetch(pathName.replace('.js', '.html'))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    handleEvent(e) {
        (e.type === 'click') ? console.log("hppp"): undefined;
    }
    worker() {
        let wk = new Worker('../storage/wkItems.js', { type: 'module' });
        wk.postMessage({ message: "Hola bebe " });
        wk.addEventListener('message', (e) => {
        });
    }
    connectedCallback() {
        Promise.resolve(myCartAside.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.cart = this.shadowRoot.querySelector('#category-btn');
            this.cart.addEventListener('click', this.handleEvent.bind(this));
        })
    }
}
customElements.define(name, myCartAside);