/* DOM */
const emptyCart = document.querySelector("#empty-message");
const currentCart = document.querySelector("#current-cart");

const optionsCart = document.querySelector("#options-cart");
const clearBtn = document.querySelector("#clear-btn");

let pathName = new URL(import.meta.url).pathname;
let name = pathName.split("/").pop().replace(".js", "");

export default class myCartAside extends HTMLElement {
  static utl = import.meta.url;
  static async components() {
    return await (await fetch(pathName.replace(".js", ".html"))).text();
  }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  handleEvent(e) {
    e.type === "click" ? console.log("hppp") : undefined;
  }
  worker() {
    let wk = new Worker("../storage/wkItems.js", { type: "module" });
    wk.postMessage({ message: "Hola bebe " });
    wk.addEventListener("message", (e) => {});
  }
  connectedCallback() {
    Promise.resolve(myCartAside.components()).then((html) => {
      this.shadowRoot.innerHTML = html;
    });
    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    cartProducts = JSON.parse(localStorage.getItem("cart"));
    function updateCart() {
      if (cartProducts && cartProducts.length > 0) {
        emptyCart.classList.add("hidden");
        currentCart.classList.remove("hidden");
        currentCart.innerHTML = "";

        const template = cartProducts.map((item) => {
          return `
        
                    <div class="current-item">
                    <img class="item-img" src='${item.image}'>
                    <div class="item-title">
                        <small>Name</small>
                        <h3 class="item-name">${item.name}</h3>
                    </div>
                    <div class="item-amount">
                        <small>Amount</small>
                        <p>${item.amount}</p>
                    </div>
                    <div class="item-price">
                        <small>Price</small>
                        <p>${item.price}</p>
                    </div>
                    <div class="total">
                        <small>Total</small>
                        <p>${item.amount * item.price}</p>
                    </div>
                    <button class="delete-btn" id="${
                      item.id
                    }"><i class="bi bi-trash-fill"></i></button>
                </div>
                          `;
        });
        currentCart.innerHTML = template.join(" ");
        total();
      } else {
        emptyCart.classList.remove("hidden");
        currentCart.classList.add("hidden");
        optionsCart.classList.add("hidden");
      }
    }
    function updateEachBtn() {
      let deleteBtn = document.querySelectorAll(".delete-btn");
      deleteBtn.forEach((btn) => {
        btn.addEventListener("click", deleteEachItem);
      });
    }

    function deleteEachItem(e) {
      const idBtn = e.currentTarget.id;
      const index = cartProducts.findIndex(
        (product) => product.id === parseInt(idBtn)
      );
      cartProducts.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      updateCart();
      updateEachBtn();
    }
    clearBtn.addEventListener("click", clearCart);

    function clearCart() {
      cartProducts.length = 0;
      localStorage.setItem("cart", JSON.stringify(cartProducts));
      localStorage.clear();
      updateCart();
    }

    function total() {
      const total = document.querySelector("#total");
        const nowTotal = cartProducts.reduce((total, product) => total + (product.price * product.amount), 0);
        total.innerText = `Total: $${nowTotal}`
    }
    // Obtener el botón de "Comprar ahora"
const buyBtn = document.querySelector("#buy-btn");

// Agregar un event listener al botón
buyBtn.addEventListener("click", (e) => {
  // Obtener el ID del producto a partir del botón
  const productId = e.currentTarget.id;

  // Obtener los datos del producto del carrito
  const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cartProducts.find((p) => p.id === parseInt(productId));

  // Crear el modal
  const modal = document.createElement("div");
  modal.classList.add("modal");

  // Agregar el contenido al modal
  const content = cartProducts.map((item) => {
    return `
   
  <div class="-details">
    <p>${item.name}</p>
    <p>${item.amount}</p>
  </div>
                          ;
  `;
  }) 
  modal.innerHTML = content.join('');
  updateCart();
  clearCart();
  // Agregar el modal a la página
  document.body.appendChild(modal);

  // Agregar un event listener para cerrar el modal
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
});
    updateCart();
    updateEachBtn();
  }
}
customElements.define(name, myCartAside);
