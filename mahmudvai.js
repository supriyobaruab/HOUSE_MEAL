const mdcount  = document.querySelector(".daily-mahmud");
const mtcount  = document.querySelector(".total-mahmud");

// Buttons
const madd_btn = document.querySelector("#mahmud-add");
const mrm_btn  = document.querySelector("#mahmud-remove");
const m_submit = document.querySelector("#mahmud-submit");

let md_count = 0;
let mt_count = 0;

// Date
function getTodayDate3() {
return new Date().toISOString().split('T')[0];
}

// Checking date from localStorage
const lastSubmittedDate3 = localStorage.getItem("lastSubmittedDate3");
const todayDate3 = getTodayDate3();


if (lastSubmittedDate3 !== todayDate3) {
    m_submit.disabled = false;
    madd_btn.disabled = false;
    mrm_btn.disabled = false;
} else {
    m_submit.disabled = true;
    madd_btn.disabled = true;
    mrm_btn.disabled = true;
}

// Adding button
madd_btn.addEventListener('click', () => {
    md_count += 1;
    if (md_count > 2) {
        md_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    mdcount.innerHTML = md_count;
});

// Remove button 
mrm_btn.addEventListener('click', () => {
    md_count -= 1;
    if (md_count < 0) {
        md_count = 0;
    }
    mdcount.innerHTML = md_count;
});

// Submit button 
m_submit.addEventListener('click', () => {
        if (md_count < 2) {
        let confirmSubmit3 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit3) {
            return;
        }
    }

    console.log(`Date: ${todayDate3}`);
    console.log(`Mahmud vai's total meal: ${md_count}`);

    mt_count += md_count;
    mtcount.innerHTML = mt_count;

    // Disable buttons after submission
    m_submit.disabled = true;
    madd_btn.disabled = true;
    mrm_btn.disabled = true;

    // Save today's date to localStorage
    localStorage.setItem("lastSubmittedDate3", todayDate3);
});
