const calc = document.querySelector(".calculate");
const amount = document.querySelector(".amount");
const p = document.querySelector(".p");
const data = document.querySelector(".indivitual");
const sup  = document.querySelector(".sup");
const deb  = document.querySelector(".deb");
const wal  = document.querySelector(".wal");
const mah  = document.querySelector(".mah");
const log  = document.querySelector(".logg");

data.style.display ="none";
amount.style.display = "none";
function calculate() {
    let supriyo   = parseInt(prompt("Enter Supriyo's contributed amount"));
    let debongshi = parseInt(prompt("Enter Debongshi's contributed amount"));
    let waly      = parseInt(prompt("Enter Waly vai's contributed amount"));
    let mahmud    = parseInt(prompt("Enter Mahmud vai's contributed amount"));

    if (isNaN(supriyo) || isNaN(debongshi) || isNaN(waly) || isNaN(mahmud)) {
        alert("Please enter valid numeric values.");
        return; 
    }
    mealTrackerContainer.style.display = "none";
    amount.style.display = "block";
    
    total_amount   = parseFloat(supriyo + debongshi + waly + mahmud);
    let total_meal = parseFloat(st_count + dt_count + wt_count + mt_count);
    console.log(total_meal);
    let meal_rate  = parseFloat((total_amount + total_meal)/4);
    amount.innerHTML = "Meal rate : "+meal_rate;
    data.style.display ="block";
    console.log(deb)
    sup.innerHTML = "Supriyo's    amount : "+(meal_rate * st_count);
    deb.innerHTML = "Debongshi's  amount : "+(meal_rate * dt_count);
    wal.innerHTML = "Waly vai's   amount : "+(meal_rate * wt_count);
    mah.innerHTML = "Mahmud vai's amount : "+(meal_rate * mt_count);
    log.style.display ="none";
}

calc.addEventListener('click', calculate);
