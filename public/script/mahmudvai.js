// // Select elements
const mdcount = document.querySelector(".daily-mahmud");
const mtcount = document.querySelector(".total-mahmud");
const mamd_btn = document.querySelector("#mahmud-add");
const mrm_btn = document.querySelector("#mahmud-remove");
const m_submit = document.querySelector("#mahmud-submit");

// Counts
let md_count = 0;
let mt_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toDateString();
    // return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall2 = async () => {
    try {
        const getResponse = await fetch(url);
        const gdata = await getResponse.json();
        // console.log("Fetched data from server:", gdata);
        mt_count = gdata.data[2].total_count || 0;
        mtcount.innerHTML = mt_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.data[2].date || null;
        const todayDate1 = getTodayDate();
        // Disable buttons if already submitted today
        if (lastSubmittedDate1 === todayDate1) {
            m_submit.disabled = true;
            mamd_btn.disabled = true;
            mrm_btn.disabled = true;
        } else {
            m_submit.disabled = false;
            mamd_btn.disabled = false;
            mrm_btn.disabled = false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        // mealTrackerContainer.style.display = "none";
        alert('Server is not running check the console log to check');
    }
};

getCall2();

// // Add meal button
mamd_btn.addEventListener('click', () => {
    md_count += 1;
    if (md_count > 2) {
        md_count = 2;
        alert("You can't have more than 2 meals per day");
    }
    mdcount.innerHTML = md_count;
});

// Remove meal button
mrm_btn.addEventListener('click', () => {
    md_count -= 1;
    if (md_count < 0) {
        md_count = 0;
    }
    mdcount.innerHTML = md_count;
});

// Submit button
m_submit.addEventListener('click', async () => {
    if (md_count < 2) {
        let confirmSubmit1 = confirm("You had single/0 meal today, are you sure you want to submit?");
        if (!confirmSubmit1) {
            return;
        }
    }

    mt_count += md_count;
    mdcount.innerHTML = 0;  // Reset daily count
    mtcount.innerHTML = mt_count;

    console.log(`Date: ${getTodayDate()}`);
    console.log(`Mahmud vai's total meal: ${mt_count}`);

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
                    daily_count: md_count,
                    total_count: mt_count,
                    date       : todayDate1,
                }),
            };

            const response = await fetch("http://localhost:3000/mahmudvai", config);
            const data = await response.json();
            console.log("Updated data from server:", data);

            // After successful submission, disable buttons
            m_submit.disabled = true;
            mamd_btn.disabled = true;
            mrm_btn.disabled = true;
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    postcall();
});
