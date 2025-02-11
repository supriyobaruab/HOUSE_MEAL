const url4 = "http://192.168.0.104:3000/waly";
// Select elements
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
    return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall4 = async () => {
    try {
        const getResponse = await fetch(url4);
        const gdata = await getResponse.json();
        console.log("Fetched data from server:", gdata);
        wt_count = gdata.waly_total || 0;
        wtcount.innerHTML = wt_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.lastSubmittedDate || null;
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
        alert('Server is not running');
    }
};

getCall4();

// Add meal button
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
    console.log(`waly's total meal: ${wt_count}`);

    // Send data to the server
    const postCall = async () => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Daily_count: wd_count,
                    Total_count: wt_count,
                }),
            };

            const response = await fetch(url4, config);
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

    postCall();
});
