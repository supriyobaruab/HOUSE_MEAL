const add_buttons = document.querySelectorAll(".add_button");
const remove_buttons = document.querySelectorAll(".remove_buttons");
const submit_buttons = document.querySelectorAll(".submit");
const mealup = document.querySelectorAll(".mealup");
const meal = document.querySelectorAll(".meal");
export const url = "http://192.168.0.104:3000";

async function get() {
  try {
    const response = await fetch(`${url}/api`);
    const data = await response.json();

    const todayDate = new Date().toLocaleDateString();

    data.people.forEach((personData) => {
      const name = personData.name;
      if (!people[name]) return;

      people[name].today = personData.today;
      people[name].total = personData.total;
      people[name].lastDate = personData.lastDate;
      people[name].submittedToday = personData.submittedToday;

      if (people[name].lastDate !== todayDate) {
        people[name].today = 0;
        people[name].submittedToday = false;
        people[name].lastDate = todayDate;
      }

      mealup.forEach((mu) => {
        if (mu.id === name) {
          mu.innerHTML = `${people[name].today} meals today`;
        }
      });

      meal.forEach((el) => {
        if (el.id === name) {
          el.innerHTML = people[name].total;
        }
      });
    });

    // console.log(people);
  } catch (err) {
    console.log("Error fetching data:", err.message);
  }
}

let people = {
  supriyo: { total: 0, today: 0, lastDate: "", submittedToday: false },
  debongshi: { total: 0, today: 0, lastDate: "", submittedToday: false },
  waly: { total: 0, today: 0, lastDate: "", submittedToday: false },
  mahmud: { total: 0, today: 0, lastDate: "", submittedToday: false },
};
get();
const todayDate = new Date().toLocaleDateString();

const names = Object.keys(people);
for (let i = 0; i < names.length; i++) {
  const name = names[i];
  if (people[name].lastDate !== todayDate) {
    people[name].today = 0;
    people[name].submittedToday = false;
    people[name].lastDate = todayDate;
  }
}

for (let i = 0; i < meal.length; i++) {
  const el = meal[i];
  el.innerHTML = people[el.id].total;
}

add_buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const person = btn.id;

    if (people[person].submittedToday) {
      alert("You already submitted today's meals.");
      return;
    }

    if (people[person].today < 2) {
      people[person].today++;
    }

    if (people[person].today > 2) {
      people[person].today = 2;
    }

    mealup.forEach((mu) => {
      if (mu.id === person) {
        mu.innerHTML = `${people[person].today} meals today`;
      }
    });
  });
});

remove_buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const person = btn.id;

    if (people[person].submittedToday) {
      alert("You already submitted today's meals.");
      return;
    }

    if (people[person].today > 0) {
      people[person].today--;
    }

    if (people[person].today < 0) {
      people[person].today = 0;
    }

    mealup.forEach((mu) => {
      if (mu.id === person) {
        mu.innerHTML = `${people[person].today} meals today`;
      }
    });
  });
});

submit_buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const person = btn.id;

    if (people[person].submittedToday) {
      alert("You've already submitted today.");
      return;
    }

    people[person].total += people[person].today;
    people[person].lastDate = todayDate;
    people[person].submittedToday = true;
    post(btn.id);

    meal.forEach((el) => {
      if (el.id === person) {
        el.innerHTML = people[person].total;
      }
    });

    alert(`${person}'s meals submitted.`);
  });
});
async function post(person) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: person, result: people[person] }),
  };
  try {
    const response = await fetch(`${url}/submit`, option);
    // if (!response.ok) {
    //   throw new Error("Server failed");
    // }
    const data = await response.json();
    // console.log(data);
  } catch (err) {
    console.log(err.message);
  }
}
