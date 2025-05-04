import { supriyo, debongshi, waly, mahmud } from "./functions/contributors.js";
const contribute = document.getElementById("contribute");
const calculate = document.getElementById("calculate");
const log = document.getElementById("log");
console.log(contribute, calculate, log);
contribute.addEventListener("click", () => {
  console.log("clicked");
  const person = prompt("Who contributed?").toLowerCase();
  if (person == "supriyo") {
    supriyo(person);
  } else if (person == "debongshi") {
    debongshi(person);
  } else if (person == "waly" || "walyvai") {
    waly(person);
  } else if (person == "mahmud" || "mahmudvai") {
    mahmud(person);
  }
});
calculate.addEventListener("click", () => {
  window.location.href = "/calculate";
});
log.addEventListener("click", () => {
  window.location.href = "/logs";
});
