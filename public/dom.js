const form = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message-1");

form.onsubmit = async (e) => {
  e.preventDefault();
  console.log(e);
  console.log("submitted");
  message1.textContent = "Loading...";
  const location = input.value;
  if (input.value === "") {
    message1.textContent = "Please provide the location!";
    return;
  }

  const res = await fetch(`http://localhost:3000/weather?address=${location}`);

  console.log(res.ok);

  const data = await res.json();

  console.log(data);

  if (data.error) {
    console.log(data.error);
    return (message1.textContent = data.error);
  }

  console.log(data);

  console.log(data.temperature);

  const msg = `Its ${data.temperature} celsius and ${data.weather_description} possible now and feelslike ${data.feelslike} celsius `;

  message1.textContent = msg;
  input.value = "";
  console.log(res);
};
