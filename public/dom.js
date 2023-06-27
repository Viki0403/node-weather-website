const form = document.querySelector("form");
const input = document.querySelector("input");
const message1 = document.querySelector("#message-1");

form.onsubmit = async (e) => {
  e.preventDefault();
  message1.textContent = "Loading...";
  const location = input.value;
  if (input.value === "") {
    message1.textContent = "Please provide the location!";
    return;
  }
  const res = await fetch(`http://localhost:3000/weather?address=${location}`);
  const data = await res.json();
  if (data.error) {
    return (message1.textContent = data.error);
  }
  const msg = `Its ${data.temperature} celsius and ${data.weather_description} possible now and feelslike ${data.feelslike} celsius `;
  message1.textContent = msg;
  input.value = "";
};
