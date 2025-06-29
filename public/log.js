import { url } from "./app.js";

const total_meal = document.querySelector("#total_meal");
const total_contribution = document.querySelector("#total_contribution");
const rate = document.querySelector("#rate");

let totalMeal = 0;
let totalContribute = 0;
let perrate = 0;

async function get() {
  const response = await fetch(`${url}/api`);
  const data = await response.json();

  totalMeal = 0;
  totalContribute = 0;

  data.people.forEach((person) => {
    totalMeal += person.total;
  });

  data.contributions.forEach((contri) => {
    totalContribute += contri.result;
  });

  perrate = totalMeal > 0 ? Math.ceil(totalContribute / totalMeal) : 0;
}

function info() {
  total_meal.innerHTML = totalMeal;
  total_contribution.innerHTML = `৳${totalContribute}`;
  rate.innerHTML = `৳${perrate}/Meal`;
}

get().then(() => {
  info();
  setInterval(info, 3000);
});
