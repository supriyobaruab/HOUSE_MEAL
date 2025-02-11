const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
let supriyo_daily = 0;
let supriyo_total = 0;
let debongshi_daily = 0;
let debongshi_total = 0;
let mahmud_daily = 0;
let mahmud_total = 0;
let waly_daily = 0;
let waly_total = 0;
const app = express();
app.use(express.json());
app.use(cors());
//Supriyo
app.post('/supriyo', (req, res) => {
    console.log("Data received", req.body.Daily_count);
    supriyo_daily = req.body.Daily_count;
    supriyo_total = req.body.Total_count;
    const submission_date = new Date().toISOString().split('T')[0]; // Get today's date

    fs.writeFileSync('./server/supriyo.json', JSON.stringify({
        supriyo_daily,
        supriyo_total,
        lastSubmittedDate: submission_date, // Save date
    }));
    const logEntry = `Date: ${submission_date}, Daily Meals: ${supriyo_daily}, Total Meals: ${supriyo_total}\n`;
    fs.appendFileSync('./log/supriyo.txt',logEntry);
    res.json({
        supriyo_daily,
        supriyo_total,
        lastSubmittedDate: submission_date,
    });
});
app.get('/supriyo', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./server/supriyo.json', 'utf8'));
    res.json(data);
});
//Debongshi
app.post('/debongshi', (req, res) => {
    console.log("Data received", req.body.Daily_count);
    debongshi_daily = req.body.Daily_count;
    debongshi_total = req.body.Total_count;
    const submission_date = new Date().toISOString().split('T')[0]; // Get today's date

    fs.writeFileSync('./server/debongshi.json', JSON.stringify({
        debongshi_daily,
        debongshi_total,
        lastSubmittedDate: submission_date, // Save date
    }));
    const logEntry = `Date: ${submission_date}, Daily Meals: ${debongshi_daily}, Total Meals: ${debongshi_total}\n`;
    fs.appendFileSync('./log/debongshi.txt',logEntry);
    res.json({
        debongshi_daily,
        debongshi_total,
        lastSubmittedDate: submission_date,
    });
});
app.get('/debongshi', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./server/debongshi.json', 'utf8'));
    res.json(data);
});
//Mahmud vai
app.post('/mahmud', (req, res) => {
    console.log("Data received", req.body.Daily_count);
    mahmud_daily = req.body.Daily_count;
    mahmud_total = req.body.Total_count;
    const submission_date = new Date().toISOString().split('T')[0];

    fs.writeFileSync('./server/mahmudvai.json', JSON.stringify({
        mahmud_daily,
        mahmud_total,
        lastSubmittedDate: submission_date, // Save date
    }));
    const logEntry = `Date: ${submission_date}, Daily Meals: ${mahmud_daily}, Total Meals: ${mahmud_total}\n`;
    fs.appendFileSync('./log/mahmudvai.txt',logEntry);
    res.json({
        mahmud_daily,
        mahmud_total,
        lastSubmittedDate: submission_date,
    });
});
app.get('/mahmud', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./server/mahmudvai.json', 'utf8'));
    res.json(data);
});
//waly vai
app.post('/waly', (req, res) => {
    console.log("Data received", req.body.Daily_count);
    waly_daily = req.body.Daily_count;
    waly_total = req.body.Total_count;
    const submission_date = new Date().toISOString().split('T')[0];

    fs.writeFileSync('./server/walyvai.json', JSON.stringify({
        waly_daily,
        waly_total,
        lastSubmittedDate: submission_date, // Save date
    }));
    const logEntry = `Date: ${submission_date}, Daily Meals: ${waly_daily}, Total Meals: ${waly_total}\n`;
    fs.appendFileSync('./log/walyvai.txt',logEntry);
    res.json({
        waly_daily,
        waly_total,
        lastSubmittedDate: submission_date,
    });
});
app.get('/waly', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./server/walyvai.json', 'utf8'));
    res.json(data);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
