const temperatureField = document.querySelector(".weather1"); 
const cityField = document.querySelector(".weather2 p"); 
const dateField = document.querySelector(".weather2 span"); 
const emojiField = document.querySelector(".weather3 img"); 
const weatherField = document.querySelector(".weather3 span"); 
const searchField = document.querySelector(".searchField"); 
const form = document.querySelector("form"); 

form.addEventListener("submit", search);

let target = "bhopal";

const fetchData = async(target) => {
 try {
  const url = `http://api.weatherapi.com/v1/current.json?key=48c02c4c353a40f0a6e33100231508&q=${target}`;

  const response = await fetch(url);
  const data = await response.json();

  const {
    current: { 
        temp_c,
        condition: {text, icon},
    },
    location: { name, localtime },
  } = data;

  updateDom(temp_c, name, localtime, icon, text);
} catch (error) {
    alert("Location not found");
}
};

function updateDom(temperature, city, time, emoji, text) {
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];
    const exactDay = getDayFullName(new Date(exactDate).getDay());

    temperatureField.innerText = temperature;
    cityField.innerText = city;
    dateField.innerText = `${exactTime} - ${exactDay}   ${exactDate}`;
    emojiField.src = emoji;
    weatherField.innerText = text;
}

fetchData(target);

function search(e) {
    e.preventDefault();
  
    target = searchField.value;
  
    fetchData(target);
  }

  function getDayFullName(num) {
    switch (num) {
      case 0:
        return "Sunday";
  
      case 1:
        return "Monday";
  
      case 2:
        return "Tuesday";
  
      case 3:
        return "Wednesday";
  
      case 4:
        return "Thursday";
  
      case 5:
        return "Friday";
  
      case 6:
        return "Saturdat";
  
      default:
        return "Don't Know";
    }
  }
 