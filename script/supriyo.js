// Supriyo
const url = "http://192.168.0.104:3000/";
// Text
const sdcount = document.querySelector(".daily-supriyo");
const stcount = document.querySelector(".total-supriyo");
// Buttons
const sadd_btn = document.querySelector("#supriyo-add");
const srm_btn = document.querySelector("#supriyo-remove");
const s_submit = document.querySelector("#supriyo-submit");
// Counts
let sd_count = 0;
let st_count = 0;

const getCall = async () => {
    const getResponse = await fetch(url);
    const gdata = await getResponse.json();
    console.log("Fetched data from server:", gdata);
    st_count = gdata.supriyo_total || st_count; 
    stcount.innerHTML = st_count; 
    };
    getCall();
    sd_count = 0;   

// Date
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Load saved counts from localStorage
const lastSubmittedDate1 = localStorage.getItem("lastSubmittedDate1");
const todayDate1 = getTodayDate();

// Counts from localStorage if available
if (savedDailyCount !== null) {
    sd_count = parseInt(savedDailyCount);
    sdcount.innerHTML = sd_count;
}
if (savedTotalCount !== null) {
    st_count = parseInt(savedTotalCount);
    stcount.innerHTML = st_count;
}

//If the date is the same as the last submitted, disable submission
if (lastSubmittedDate1 === todayDate1) {
    s_submit.disabled = true;
    sadd_btn.disabled = true;
    srm_btn.disabled = true;
}

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
    st_count += sd_count;
    sdcount.innerHTML = 0;  // Reset daily count
    stcount.innerHTML = st_count;
    console.log(`Date: ${todayDate1}`);
    console.log(`Supriyo's total meal: ${st_count}`);

    localStorage.setItem("lastSubmittedDate1", todayDate1);

    // localStorage.setItem("totalCount", st_count);

    const postCall = async () => {
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Daily_count: sd_count,
                Total_count: st_count,
            }),
        };
        const response = await fetch(url, config);
        const data = await response.json();  // We assume the server responds with the updated data
        console.log("Updated data from server:", data);
    };
    postCall(); 
});
