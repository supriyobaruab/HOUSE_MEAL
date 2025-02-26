const url = "http://localhost:3000/info";
// // Select elements
const mealTrackerContainer = document.querySelector(".container");
const sdcount = document.querySelector(".daily-supriyo");
const stcount = document.querySelector(".total-supriyo");
const sadd_btn = document.querySelector("#supriyo-add");
const srm_btn = document.querySelector("#supriyo-remove");
const s_submit = document.querySelector("#supriyo-submit");
const date     = document.querySelector(".date");


// Counts
let sd_count = 0;
let st_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toDateString();
    // return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall = async () => {
    try {
        const getResponse = await fetch(url);
        const gdata = await getResponse.json();
        console.log("Fetched data from server:", gdata);
        st_count = gdata.data[0].total_count || 0;
        stcount.innerHTML = st_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.data[0].date || null;
        const todayDate1 = getTodayDate();
        // Disable buttons if already submitted today
        if (lastSubmittedDate1 === todayDate1) {
            s_submit.disabled = true;
            sadd_btn.disabled = true;
            srm_btn.disabled = true;
        } else {
            s_submit.disabled = false;
            sadd_btn.disabled = false;
            srm_btn.disabled = false;
        }
    date.innerHTML = lastSubmittedDate1;
    } catch (error) {
        console.error("Error fetching data:", error);
        // mealTrackerContainer.style.display = "none";
        alert('Server is not running check the console log to check');
    }
};

getCall();

// // Add meal button
sadd_btn.addEventListener('click', () => {
    sd_count += 1;
    if (sd_count > 2) {
        sd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    sdcount.innerHTML = sd_count;
});

// Remove meal button
srm_btn.addEventListener('click', () => {
    sd_count -= 1;
    if (sd_count < 0) {
        sd_count = 0;
    }
    sdcount.innerHTML = sd_count;
});

// Submit button
s_submit.addEventListener('click', async () => {
    if (sd_count === 2) {
        let confirmSubmit1 = confirm("You had 2 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }
    else if (sd_count === 1) {
        let confirmSubmit1 = confirm("You had 1 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }
    else if (sd_count === 0) {
        let confirmSubmit1 = confirm("You had no meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }

    st_count += sd_count;
    sdcount.innerHTML = 0;  // Reset daily count
    stcount.innerHTML = st_count;

    console.log(`Date: ${getTodayDate()}`);
    console.log(`Supriyo's total meal: ${st_count}`);

    // Send data to the server
    const postCall = async () => {
        try {
            const todayDate1 = getTodayDate();
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    daily_count: sd_count,
                    total_count: st_count,
                    date       : todayDate1,
                }),
            };

            const response = await fetch("http://localhost:3000/supriyo", config);
            const data = await response.json();
            console.log("Updated data from server:", data);

            // After successful submission, disable buttons
            s_submit.disabled = true;
            sadd_btn.disabled = true;
            srm_btn.disabled = true;
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    postCall();
});
