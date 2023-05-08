/* Web components */
import "./components/my-aside.js";
import "./components/my-cart-aside.js";
/* Functions */
import { getReclutas } from "./Api/getApi.js";

/* Show All items */
export async function showReclutas(category) {
  try {
    
    const container = document.querySelector(".container-all-items");
    const items = await getReclutas();

    const filteredItems = category
      ? items.filter((item) => item.team === category)
      : items;

    const template = filteredItems.map((camper) => {
      return `
      
            <div class="item">
            <img class="item-img-all" src='${camper.image}' onerror="this.src='./img/usuario.png'  ">
            <div class="item-details">
            <h3 class="item-name">${camper.name}</h3>
            <p class="item-price">Id: ${camper.id}</p>
                <p class="item-price">Phone: ${camper.phone}</p>
                <p class="item-price">Email: ${camper.email}</p>
                <p class="item-price">Address: ${camper.address}</p>
                <p class="item-price">Team: ${camper.team}</p>

                <button class="item-add" id="${camper.id}"><span>Add</span></button>
            </div>
            </div>
          
            `;
    });
    container.innerHTML = template.join("");
    /* Add items to database */
    let addButtons = document.querySelectorAll(".item-add");
    addButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addToCart(e);
      });
    });

    /* funtion Add to database */
    let cartProducts;
    const cartProductsLocal = localStorage.getItem("cart");
    if(cartProductsLocal) {
      cartProducts = JSON.parse(cartProductsLocal);
    }
    else {
      cartProducts = [];
    }

    const addToCart = (e) => {
      const idBtn = e.currentTarget.id;
      const addProduct = items.find(item => item.id === parseInt(idBtn));

      if (cartProducts.some(item => item.id === parseInt(idBtn))) {
        const index = cartProducts.findIndex(item => item.id === parseInt(idBtn));
        cartProducts[index].amount++;
      }
      else {
        addProduct.amount = 1; 
        cartProducts.push(addProduct);
      }
      /* Local Storage */
      localStorage.setItem('cart', JSON.stringify(cartProducts))
    };
    
  } 
  catch (err) {
    console.log(err);
  }
}
/* Categories */
export async function showItemsByCategory(category) {
  const container = document.querySelector(".container-all-items");
  container.innerHTML = "";
  await showReclutas(category);
}


/* Call function */
document.addEventListener("DOMContentLoaded", showReclutas());
