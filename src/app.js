const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();
app.use(express.static(path.join(__dirname, "../public")));
app.set("view engine", "hbs");
app.get("/", (req, res, body) => {
  res.render("index");
});
app.get("/weather", async (req, res, body) => {
  const place = req.query.address;
  //   console.log("ddd");
  if (!place) {
    return res.send({
      error: "Please provide a location",
    });
  }
  const data = await geocode(place);
  //   console.log("lll");
  //   console.log(latitude);
  if (data.error) {
    // console.log(data.error);
    return res.send({ error: data.error });
  }

  return res.send(data);
});
app.get("*", (req, res, body) => {
  res.send("404 page");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
