import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index.ejs", { data: null });
});

app.post("/search", async (req, res) => {
    try {
        const city = req.body.city;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a0d3b55486b2f022d3bc97adb89cc47e&units=metric`
        );
        const weatherData = response.data;
        res.render("index.ejs",{data:weatherData});
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: "Error fetching weather data. Please try again later.",
            data:'invalid',
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
