const url2 = "http://192.168.0.104:3000/debongshi";
// Select elements
const ddcount = document.querySelector(".daily-debongshi");
const dtcount = document.querySelector(".total-debongshi");
const dadd_btn = document.querySelector("#debongshi-add");
const drm_btn = document.querySelector("#debongshi-remove");
const d_submit = document.querySelector("#debongshi-submit");

// Counts
let dd_count = 0;
let dt_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall2 = async () => {
    try {
        const getResponse = await fetch(url2);
        const gdata = await getResponse.json();
        console.log("Fetched data from server:", gdata);
        dt_count = gdata.debongshi_total || 0;
        dtcount.innerHTML = dt_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.lastSubmittedDate || null;
        const todayDate1 = getTodayDate();
        // Disable buttons if already submitted today
        if (lastSubmittedDate1 === todayDate1) {
            d_submit.disabled = true;
            dadd_btn.disabled = true;
            drm_btn.disabled = true;
        } else {
            d_submit.disabled = false;
            dadd_btn.disabled = false;
            drm_btn.disabled = false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert('Server is not running');
    }
};

getCall2();

// Add meal button
dadd_btn.addEventListener('click', () => {
    dd_count += 1;
    if (dd_count > 2) {
        dd_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    ddcount.innerHTML = dd_count;
});

// Remove meal button
drm_btn.addEventListener('click', () => {
    dd_count -= 1;
    if (dd_count < 0) {
        dd_count = 0;
    }
    ddcount.innerHTML = dd_count;
});

// Submit button
d_submit.addEventListener('click', async () => {
    if (dd_count < 2) {
        let confirmSubmit1 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }

    dt_count += dd_count;
    ddcount.innerHTML = 0;  // Reset daily count
    dtcount.innerHTML = dt_count;

    console.log(`Date: ${getTodayDate()}`);
    console.log(`debongshi's total meal: ${dt_count}`);

    // Send data to the server
    const postCall = async () => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Daily_count: dd_count,
                    Total_count: dt_count,
                }),
            };

            const response = await fetch(url2, config);
            const data = await response.json();
            console.log("Updated data from server:", data);

            // After successful submission, disable buttons
            d_submit.disabled = true;
            dadd_btn.disabled = true;
            drm_btn.disabled = true;
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    postCall();
});
