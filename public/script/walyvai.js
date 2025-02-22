// // Select elements
const wdcount = document.querySelector(".daily-waly");
const wtcount = document.querySelector(".total-waly");
const wadd_btn = document.querySelector("#waly-add");
const wrm_btn = document.querySelector("#waly-remove");
const w_submit = document.querySelector("#waly-submit");

// Counts
let wd_count = 0;
let wt_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toDateString();
    // return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall3 = async () => {
    try {
        const getResponse = await fetch(url);
        const gdata = await getResponse.json();
        // console.log("Fetched data from server:", gdata);
        wt_count = gdata.data[3].total_count || 0;
        wtcount.innerHTML = wt_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.data[3].date || null;
        const todayDate1 = getTodayDate();
        // Disable buttons if already submitted today
        if (lastSubmittedDate1 === todayDate1) {
            w_submit.disabled = true;
            wadd_btn.disabled = true;
            wrm_btn.disabled = true;
        } else {
            w_submit.disabled = false;
            wadd_btn.disabled = false;
            wrm_btn.disabled = false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        // mealTrackerContainer.style.display = "none";
        alert('Server is not running check the console log to check');
    }
};

getCall3();

// // Add meal button
wadd_btn.addEventListener('click', () => {
    wd_count += 1;
    if (wd_count > 2) {
        wd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    wdcount.innerHTML = wd_count;
});

// Remove meal button
wrm_btn.addEventListener('click', () => {
    wd_count -= 1;
    if (wd_count < 0) {
        wd_count = 0;
    }
    wdcount.innerHTML = wd_count;
});

// Submit button
w_submit.addEventListener('click', async () => {
    if (wd_count < 2) {
        let confirmSubmit1 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }

    wt_count += wd_count;
    wdcount.innerHTML = 0;  // Reset daily count
    wtcount.innerHTML = wt_count;

    console.log(`Date: ${getTodayDate()}`);
    console.log(`Waly vai's total meal: ${wt_count}`);

    // Send data to the server
    const postcall = async () => {
        try {
            const todayDate1 = getTodayDate();
            const config = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    daily_count: wd_count,
                    total_count: wt_count,
                    date       : todayDate1,
                }),
            };

            const response = await fetch("http://localhost:3000/walyvai", config);
            const data = await response.json();
            console.log("Updated data from server:", data);

            // After successful submission, disable buttons
            w_submit.disabled = true;
            wadd_btn.disabled = true;
            wrm_btn.disabled = true;
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    postcall();
});
