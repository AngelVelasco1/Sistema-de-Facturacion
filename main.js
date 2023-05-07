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
                <button class="item-add"><span>Add</span></button>
            </div>
            </div>
          
            `;
    });
    container.innerHTML = template.join("");
  } catch (err) {
    console.log(err);
  }
}
/* Categories */
export async function showItemsByCategory(category) {
  const container = document.querySelector(".container-all-items");
  container.innerHTML = "";
  await showAllItems(category);
}
document.addEventListener("DOMContentLoaded", showAllItems());
