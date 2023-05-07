/* Web components */
import './components/my-aside.js'
import './components/my-cart-aside.js'
/* Functions */
import { getItem } from './Api/getApi.js'

async function showAllItems() {
    try {
        const container = document.querySelector('.container-all-items');
        const items = await getItem();
      
        const template = items.map((item) => {
            return `
            <div class="item">
            <img class="item-img-all" src='${item.image}'>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-price">${item.price}</p>
                <button class="item-add"><span>Add</span></button>
            </div>
            </div>
          
            `
        });
        container.innerHTML += template.join('')
    }
    catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMContentLoaded', showAllItems);
