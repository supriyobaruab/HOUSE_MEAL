const url3 = "http://192.168.0.104:3000/mahmud";
// Select elements
const mdcount = document.querySelector(".daily-mahmud");
const mtcount = document.querySelector(".total-mahmud");
const madd_btn = document.querySelector("#mahmud-add");
const mrm_btn = document.querySelector("#mahmud-remove");
const m_submit = document.querySelector("#mahmud-submit");

// Counts
let md_count = 0;
let mt_count = 0;

// Function to get today's date
function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

// Fetch data from the server
const getCall3 = async () => {
    try {
        const getResponse = await fetch(url3);
        const gdata = await getResponse.json();
        console.log("Fetched data from server:", gdata);
        mt_count = gdata.mahmud_total || 0;
        mtcount.innerHTML = mt_count;
        // Get last submitted date from server
        const lastSubmittedDate1 = gdata.lastSubmittedDate || null;
        const todayDate1 = getTodayDate();
        // Disable buttons if already submitted today
        if (lastSubmittedDate1 === todayDate1) {
            m_submit.disabled = true;
            madd_btn.disabled = true;
            mrm_btn.disabled = true;
        } else {
            m_submit.disabled = false;
            madd_btn.disabled = false;
            mrm_btn.disabled = false;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        alert('Server is not running');
    }
};

getCall3();

// Add meal button
madd_btn.addEventListener('click', () => {
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
    console.log(`mahmud's total meal: ${mt_count}`);

    // Send data to the server
    const postCall = async () => {
        try {
            const config = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    Daily_count: md_count,
                    Total_count: mt_count,
                }),
            };

            const response = await fetch(url3, config);
            const data = await response.json();
            console.log("Updated data from server:", data);

            // After successful submission, disable buttons
            m_submit.disabled = true;
            madd_btn.disabled = true;
            mrm_btn.disabled = true;
        } catch (error) {
            console.error("Error sending data:", error);
        }
    };

    postCall();
});
