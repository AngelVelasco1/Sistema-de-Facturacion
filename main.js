/* Web components */
import "./components/my-aside.js";
import "./components/my-cart-aside.js";
/* Functions */
import { getItem } from "./Api/getApi.js";

/* Show All items */
export async function showAllItems(category) {
  try {
    const container = document.querySelector(".container-all-items");
    const items = await getItem();

    const filteredItems = category
      ? items.filter((item) => item.category.name === category)
      : items;

    const template = filteredItems.map((item) => {
      return `
            <div class="item">
            <img class="item-img-all" src='${item.image}'>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">${item.price}</p>
                <button class="item-add" id="${item.id}"><span>Add</span></button>
            </div>
            </div>
          
            `;
    });
    container.innerHTML = template.join("");
    /* Add items to cart */
    let addButtons = document.querySelectorAll(".item-add");
    addButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        addToCart(e);
      });
    });

    /* funtion Add to cart */
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
    /* Delete each item */



    /* DELETE ALL ITEMS */
  } 
  catch (err) {
    console.log(err);
  }
}
/* Categories */
export async function showItemsByCategory(category) {
  const container = document.querySelector(".container-all-items");
  container.innerHTML = "";
  await showAllItems(category);
}
/* Call function */
document.addEventListener("DOMContentLoaded", showAllItems());
