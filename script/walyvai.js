//Waly vai
const wdcount  = document.querySelector(".daily-waly");
const wtcount  = document.querySelector(".total-waly");

// Buttons
const wadd_btn = document.querySelector("#waly-add");
const wrm_btn  = document.querySelector("#waly-remove");
const w_submit = document.querySelector("#waly-submit");

let wd_count = 0;
let wt_count = 0;

// Date
function getTodayDate4() {
return new Date().toISOString().split('T')[0];
}

// Checking date from localStorage
const lastSubmittedDate4 = localStorage.getItem("lastSubmittedDate4");
const todayDate4 = getTodayDate4();


if (lastSubmittedDate4 !== todayDate4) {
    w_submit.disabled = false;
    wadd_btn.disabled = false;
    wrm_btn.disabled = false;
} else {
    w_submit.disabled = true;
    wadd_btn.disabled = true;
    wrm_btn.disabled = true;
}

// Adding button
wadd_btn.addEventListener('click', () => {
    wd_count += 1;
    if (wd_count > 2) {
        wd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    wdcount.innerHTML = wd_count;
});

// Remove button 
wrm_btn.addEventListener('click', () => {
    wd_count -= 1;
    if (wd_count < 0) {
        wd_count = 0;
    }
    wdcount.innerHTML = wd_count;
});

// Submit button 
w_submit.addEventListener('click', () => {
        if (wd_count < 2) {
        let confirmSubmit4 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit4) {
            return;
        }
    }

    console.log(`Date: ${todayDate4}`);
    console.log(`Waly vai's total meal: ${wd_count}`);

    wt_count += wd_count;
    wtcount.innerHTML = wt_count;

    // Disable buttons after submission
    w_submit.disabled = true;
    wadd_btn.disabled = true;
    wrm_btn.disabled = true;

    // Save today's date to localStorage
    localStorage.setItem("lastSubmittedDate4", todayDate4);
});
