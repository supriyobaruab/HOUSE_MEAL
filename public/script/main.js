import { info } from "./info.js";
import { postInfo } from "./post.js";

const add_buttons = document.querySelectorAll(".add");
const remove_buttons = document.querySelectorAll(".remove");
const submit_buttons = document.querySelectorAll(".submitt");
const date = new Date().toISOString().split("T")[0];
const dailyCounts = {};
const totalCounts = {};
let lastSubmission = {};

// Fetch from server and initialize
async function init() {
  const data = await info();
  if (data) {
    console.log("Meal data received:", data);
    data.data.forEach((items) => {
      totalCounts[items.name] = items.total_count;
      lastSubmission[items.name] = items.date;

      // Update total count in the DOM
      const displayElement = document.querySelector(`.total-${items.name}`);
      if (displayElement) {
        displayElement.innerHTML = totalCounts[items.name];
      }

      // Disable submit button if already submitted today
      if (lastSubmission[items.name] === date) {
        const submitButton = document.querySelector(`#${items.name}-submit`);
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.innerText = "Submitted";
        }
      }
    });
  }
}
init();

// Add button logic
add_buttons.forEach((button) => {
  const person = button.id.split("-")[0];
  dailyCounts[person] = 0;

  button.addEventListener("click", () => {
    dailyCounts[person] += 1;
    if (dailyCounts[person] > 2) {
      dailyCounts[person] = 2;
      return alert("You can't have more than two meals per day");
    }
    const displayElement = document.querySelector(`.daily-${person}`);
    if (displayElement) {
      displayElement.innerHTML = dailyCounts[person];
    }
  });
});

// Remove button logic
remove_buttons.forEach((button) => {
  const person = button.id.split("-")[0];

  button.addEventListener("click", () => {
    dailyCounts[person] -= 1;
    if (dailyCounts[person] < 0) {
      dailyCounts[person] = 0;
      alert("Value can't be below zero");
    }
    const displayElement = document.querySelector(`.daily-${person}`);
    if (displayElement) {
      displayElement.innerHTML = dailyCounts[person];
    }
  });
});
// Submit button logic
// Submit button logic
submit_buttons.forEach((button) => {
  const person = button.id.split("-")[0];

  button.addEventListener("click", () => {
    if (!totalCounts.hasOwnProperty(person)) {
      totalCounts[person] = 0;
    }
    totalCounts[person] += dailyCounts[person];

    const displayElement1 = document.querySelector(`.total-${person}`);
    const displayElement2 = document.querySelector(`.daily-${person}`);

    if (displayElement1) {
      displayElement1.innerHTML = totalCounts[person];
      displayElement2.innerHTML = 0;
      dailyCounts[person] = 0;

      // Disable button immediately after submission
      const submitButton = document.querySelector(`#${person}-submit`);
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = "Submitted";
      }

      // Update local tracking
      lastSubmission[person] = date;

      // Send POST request
      postInfo(person, totalCounts[person], date);
    }
  });
});
