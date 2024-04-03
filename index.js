import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
let str="";
app.get("/", (req, res) => {
    res.render("index.ejs",{data:str});
});

app.post("/search", async (req, res) => {
    try {
        const city = req.body.city;
        const response2 = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0d3b55486b2f022d3bc97adb89cc47e&units=metric`
        );
        const weatherData = response2.data;
        console.log(response2.data);
        res.render("index.ejs", {
            data: weatherData,
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "No weather data available.",
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
