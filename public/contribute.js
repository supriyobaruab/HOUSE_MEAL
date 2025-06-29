import { url } from "./app.js";
const contribute = document.querySelector("#person");
const contribute_info = document.querySelectorAll(".contribute");
const input = document.querySelector("#input");
const contribute_btn = document.querySelector("#ctbe");
async function get() {
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();
    data.contributions.forEach((contri) => {
      contribution[contri.name] = contri.result;
    });
    contribute_info.forEach((psrn) => {
      psrn.innerHTML = `৳${contribution[psrn.id]}`;
    });
    console.log("Contribution after fetch:", contribution);
  } catch (err) {
    console.error("Error fetching contribution:", err);
  }
}

let contribution = {
  supriyo: 0,
  debongshi: 0,
  waly: 0,
  mahmud: 0,
};
get();
console.log(contribution);
contribute_btn.addEventListener("click", () => {
  let user = contribute.value;
  let amount = parseInt(input.value);
  if (isNaN(amount)) {
    return alert("Enter a valid number\nWrite again");
  }
  contribution[user] += amount;
  console.log(contribution);
  contribute_info.forEach((psrn) => {
    psrn.innerHTML = `৳${contribution[psrn.id]}`;
    input.value = "";
  });
  postContribution(user);
});
async function postContribution(name) {
  console.log(name);
  console.log();
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: name, result: contribution[name] }),
  };
  const response = await fetch(`${url}/contribute`, option);
  const data = await response.json();
}
