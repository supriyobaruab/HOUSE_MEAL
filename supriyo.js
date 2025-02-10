const sdcount  = document.querySelector(".daily-supriyo");
const stcount  = document.querySelector(".total-supriyo");

// Buttons
const sadd_btn = document.querySelector("#supriyo-add");
const srm_btn  = document.querySelector("#supriyo-remove");
const s_submit = document.querySelector("#supriyo-submit");

let sd_count = 0;
let st_count = 0;

// Date
function getTodayDate() {
return new Date().toISOString().split('T')[0];
}

// Checking date from localStorage
const lastSubmittedDate1 = localStorage.getItem("lastSubmittedDate1");
const todayDate1 = getTodayDate();


if (lastSubmittedDate1 !== todayDate1) {
    s_submit.disabled = false;
    sadd_btn.disabled = false;
    srm_btn.disabled = false;
} else {
    s_submit.disabled = true;
    sadd_btn.disabled = true;
    srm_btn.disabled = true;
}

// Adding button
sadd_btn.addEventListener('click', () => {
    sd_count += 1;
    if (sd_count > 2) {
        sd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    sdcount.innerHTML = sd_count;
});

// Remove button 
srm_btn.addEventListener('click', () => {
    sd_count -= 1;
    if (sd_count < 0) {
        sd_count = 0;
    }
    sdcount.innerHTML = sd_count;
});

// Submit button 
s_submit.addEventListener('click', () => {
    if (sd_count < 2) {
        let confirmSubmit1 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }

    console.log(`Date: ${todayDate1}`);
    console.log(`Supriyo's total meal: ${sd_count}`);

    st_count += sd_count;
    stcount.innerHTML = st_count;

    // Disable buttons after submission
    s_submit.disabled = true;
    sadd_btn.disabled = true;
    srm_btn.disabled = true;

    // Save today's date to localStorage
    localStorage.setItem("lastSubmittedDate1", todayDate1);
});
