const forecast = async (lat, lon) => {
  try {
    const fetch = (await import("node-fetch")).default;
    const res = await fetch(
      `http://api.weatherstack.com/current?access_key=0e84b1fbcca463b79a99fa8de56ec524&query=${lat},${lon}`
    );
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const data = await res.json();
    if (!data.location) {
      return {
        error:
          "Latitude and longitude for the location you entered is not valid",
      };
    }

    console.log(data);
    const temperature = data.current.temperature;
    const weather_description = data.current.weather_descriptions[0];
    const feels = data.current.feelslike;
    console.log(temperature, weather_description, feels);
    return {
      temperature,
      weather_description,
      feelslike: feels,
    };
    //   console.log(data);
  } catch (error) {
    if (error.system) {
      return { error: "Check your connection⛔" };
    } else {
      return { error: error.message };
    }
  }
};
module.exports = forecast;
