// Javascript for Submit Button
const cityname = document.getElementById("cityName");
const subtn = document.getElementById("submitBtn");
const cityoutput = document.getElementById("city_name");
const tempvalue = document.getElementById("temp_value");
const tempstatus = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getinfo = async (event) => {
  event.preventDefault();
  cityval = cityname.value;

  if (cityval == "") {
    cityoutput.innerText = "Oops !!! Plzz enter the city name.....";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&appid=2e5aacf32a68b81adfb872fe9e1dea6e`;
      const res = await fetch(url); // getting json data
      const objdata = await res.json(); // converting json data into object data
      const arrdata = [objdata]; //  converting object data into array of objects
      cityoutput.innerText = `${arrdata[0].name}  ,  ${arrdata[0].sys.country}`;
      const tempt = arrdata[0].main.temp;
      tempvalue.innerText = Math.ceil(tempt - 273.15);
      // tempstatus.innerText = arrdata[0].weather[0].main;
      const tempmood = arrdata[0].weather[0].main;
      if (tempmood == "Sunny") {
        tempstatus.innerHTML =
          "<span class='material-symbols-outlined'> sunny </span>";
      } else if (tempmood == "Clouds") {
        tempstatus.innerHTML =
          "<span class='material-symbols-sharp'> cloudy </span>";
      } else if (tempmood == "Mist") {
        tempstatus.innerHTML =
          "<span class='material-symbols-sharp'> mist </span>";
      } else if (tempmood == "Haze") {
        tempstatus.innerHTML =
          "<span class='material-symbols-outlined'> dehaze </span> ";
      } else {
        tempstatus.innerHTML =
          "<span class='material-symbols-sharp'> rainy </span>";
      }
      datahide.classList.remove("data_hide");
      // console.log(objdata);
    } catch (err) {
      cityoutput.innerText = "Oops !!! plzz enter the correct city name.....";
      datahide.classList.add("data_hide");
    }
  }
};

subtn.addEventListener("click", getinfo);
