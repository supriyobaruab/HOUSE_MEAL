const url = "http://192.168.0.104:3000/supriyo";
// Select elements
const sdcount = document.querySelector(".daily-supriyo");
const stcount = document.querySelector(".total-supriyo");
const sadd_btn = document.querySelector("#supriyo-add");
const srm_btn = document.querySelector("#supriyo-remove");
const s_submit = document.querySelector("#supriyo-submit");

// Counts
let sd_count = 0;
let st_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall = async () => {
    try {
        const getResponse = await fetch(url);
        const gdata = await getResponse.json();
        console.log("Fetched data from server:", gdata);
        st_count = gdata.supriyo_total || 0;
        stcount.innerHTML = st_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.lastSubmittedDate || null;
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
    } catch (error) {
        console.error("Error fetching data:", error);
        alert('Server is not running');
    }
};

getCall();

// Add meal button
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
    if (sd_count < 2) {
        let confirmSubmit1 = confirm("You had single/0 meal today, are you sure you want to submit?");
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
