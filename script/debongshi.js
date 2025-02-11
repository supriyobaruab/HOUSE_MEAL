//Debongshi
const ddcount  = document.querySelector(".daily-debongshi");
const dtcount  = document.querySelector(".total-debongshi");

// Buttons
const dadd_btn = document.querySelector("#debongshi-add");
const drm_btn  = document.querySelector("#debongshi-remove");
const d_submit = document.querySelector("#debongshi-submit");

let dd_count = 0;
let dt_count = 0;

// Date
function getTodayDate2() {
return new Date().toISOString().split('T')[0];
}

// Checking date from localStorage
const lastSubmittedDate2 = localStorage.getItem("lastSubmittedDate2");
const todayDate2 = getTodayDate2();


if (lastSubmittedDate2 !== todayDate2) {
    d_submit.disabled = false;
    dadd_btn.disabled = false;
    drm_btn.disabled = false;
} else {
    d_submit.disabled = true;
    dadd_btn.disabled = true;
    drm_btn.disabled = true;
}

// Adding button
dadd_btn.addEventListener('click', () => {
    dd_count += 1;
    if (dd_count > 2) {
        dd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    ddcount.innerHTML = dd_count;
});

// Remove button 
drm_btn.addEventListener('click', () => {
    dd_count -= 1;
    if (dd_count < 0) {
        dd_count = 0;
    }
    ddcount.innerHTML = dd_count;
});

// Submit button 
d_submit.addEventListener('click', () => {
        if (dd_count < 2) {
        let confirmSubmit2 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit2) {
            return;
        }
    }

    console.log(`Date: ${todayDate2}`);
    console.log(`Debongshi's total meal: ${dd_count}`);

    dt_count += dd_count;
    dtcount.innerHTML = dt_count;

    // Disable buttons after submission
    d_submit.disabled = true;
    dadd_btn.disabled = true;
    drm_btn.disabled = true;

    // Save today's date to localStorage
    localStorage.setItem("lastSubmittedDate2", todayDate2);
});
