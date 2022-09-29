const path = require("path");
const forecast = require("./forecast");

const geocode = async (location) => {
  try {
    const fetch = (await import("node-fetch")).default;

    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        location
      )}.json?access_token=pk.eyJ1IjoiNGI2NTc2Njk2ZSIsImEiOiJjbDhkOXA5ZmkxN3kzM25sYTh5b3pvMnhtIn0.v7JzldeRzDcIsedxrtQtQw&limit=1`
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    const data = await res.json();

    console.log(data);
    if (data.features.length === 0) {
      return {
        error: "Please provide a valid location😅",
      };
    }
    const longitude = data.features[0].center[0];
    const latitude = data.features[0].center[1];
    console.log(latitude, longitude);
    return await forecast(latitude, longitude);
  } catch (error) {
    if (error.type === "system") {
      return { error: "Check your connection⛔" };
    } else {
      return {
        error: error.message,
      };
    }
  }
};
module.exports = geocode;
