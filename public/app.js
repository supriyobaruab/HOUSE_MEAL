export const url = "https://new.countbites.tech";

const add_buttons = document.querySelectorAll(".add_button");
const remove_buttons = document.querySelectorAll(".remove_buttons");
const submit_buttons = document.querySelectorAll(".submit");
const mealup = document.querySelectorAll(".mealup");
const meal = document.querySelectorAll(".meal");

let selectedMeals = {};

async function get() {
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();
    const todayDate = new Date().toISOString().split("T")[0];

    data.people.forEach((person) => {
      const name = person.name;
      const isToday = person.lastDate === todayDate;
      const submitted = person.submittedToday && isToday;

      if (!submitted) {
        selectedMeals[name] = person.today || 0;
      }

      mealup.forEach((el) => {
        if (el.id === name) {
          el.innerHTML = `${
            submitted ? person.today : selectedMeals[name] || 0
          } meals today`;
        }
      });

      meal.forEach((el) => {
        if (el.id === name) {
          el.innerHTML = person.total;
        }
      });

      if (submitted) {
        disableUserControls(name);
      }
    });
  } catch (err) {
    console.error("Failed to fetch data:", err.message);
  }
}

get();

add_buttons.forEach((btn) => {
  const person = btn.id;

  btn.addEventListener("click", () => {
    if (!selectedMeals[person]) selectedMeals[person] = 0;
    if (selectedMeals[person] < 2) {
      selectedMeals[person]++;
      updateUI(person);
    }
  });
});

remove_buttons.forEach((btn) => {
  const person = btn.id;

  btn.addEventListener("click", () => {
    if (!selectedMeals[person]) selectedMeals[person] = 0;
    if (selectedMeals[person] > 0) {
      selectedMeals[person]--;
      updateUI(person);
    }
  });
});

submit_buttons.forEach((btn) => {
  const person = btn.id;

  btn.addEventListener("click", async () => {
    const meals = selectedMeals[person] || 0;

    try {
      const response = await fetch(`${url}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: person, today: meals }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
      } else {
        alert(`${person}'s meals submitted.`);
        disableUserControls(person);
        selectedMeals[person] = 0;
        updateUI(person);
      }
    } catch (err) {
      console.log("Submission failed:", err.message);
    }
    location.reload();
  });
});

function updateUI(person) {
  mealup.forEach((el) => {
    if (el.id === person) {
      el.innerHTML = `${selectedMeals[person] || 0} meals today`;
    }
  });
}

function disableUserControls(name) {
  document
    .querySelectorAll(`#${name}.add_button`)
    .forEach((btn) => (btn.disabled = true));

  document
    .querySelectorAll(`#${name}.remove_buttons`)
    .forEach((btn) => (btn.disabled = true));
}
