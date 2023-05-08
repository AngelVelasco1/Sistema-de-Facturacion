/* Web components */
import "./components/my-aside.js";
import "./components/my-cart-aside.js";
/* Functions */
import { addCamper } from "./Api/getApi.js";

const campusForm = document.querySelector('#add-camper-form');
const campusFormBtn = document.querySelector('#submit-form');
campusForm.addEventListener('submit', validateCamper)
campusFormBtn.addEventListener('click', validateCamper)

function validateCamper(e){
    e.preventDefault();

    let name = document.querySelector('#name').value;
    let phone = document.querySelector('#phone').value;
    let age = document.querySelector('#age').value;
    let email = document.querySelector('#email').value
    let qualified = document.querySelector('#qualified').value
    let skill = document.querySelector('#skill').value
    let entry = document.querySelector('#entry').value
    let birth = document.querySelector('#birth').value


    const camperData = {
       name,
         phone,
         age,
         email,
         qualified,
         skill,
         team,
         entry,
         birth
    }
  
    addCamper(camperData)
}
function validate(object) {
    return  (Object.values(object).every(camper => camper !== ''));
}

