const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
let supriyo_daily = 0;
let supriyo_total = 0;
const app = express();
app.use(express.json());
app.use(cors());

app.post('/', (req, res) => {
    console.log("Data received", req.body.Daily_count);
    supriyo_daily = req.body.Daily_count;
    supriyo_total = req.body.Total_count;
    fs.writeFileSync('./server/supriyo.json', JSON.stringify({
        supriyo_daily,
        supriyo_total,
    }));
    res.json({
        supriyo_daily,
        supriyo_total
    });
});
app.get('/', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./server/supriyo.json', 'utf8'));
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
