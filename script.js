const getData = async () => {
  let url = "https://corona-api.com/countries";

  const reqUser = await fetch(url);
  //console.log(reqUser.body);

  const userData = await reqUser.json();
  // console.log(userData);

  let url2 = "https://restcountries.eu/rest/v2/all";

  const reqUser2 = await fetch(url2);
  //console.log(reqUser2.body);

  const userData2 = await reqUser2.json();
  console.log(userData2);
  displayData(userData2, userData);
};

getData();

let countriesInContinent = [];
let countriesList = [];

const displayData = (userData2, userData) => {
  let bths = document.querySelectorAll(".region_btn");
  bths.forEach((element) =>
    element.addEventListener("click", function () {
      // for (let i = 0; i < userData.length; i++){
      //     userData[i]
      printChart(userData2, userData);

      for (let i = 0; i < userData2.length; i++) {
        if (userData2[i].region.toLowerCase() == element.value.toLowerCase()) {
          //let displayArr = [];
          let div = document.createElement("div");

          div.innerHTML = `<a href="javascript:void(0)"><img src="${userData2[i].flag}"</img>  <p>    ${userData2[i].name} </p></a>`;
          div.classList.add("countryBTN");

          countriesInContinent.push({
            name: userData2[i].name,
            code: userData2[i].alpha2Code,
          });

          countriesList.push(userData2[i].name);

          div.addEventListener("click", function () {
            console.log(userData2[i].name);
          });

          let displayDiv = document.querySelector(".display");
          displayDiv.appendChild(div);
        }
      }
    })
  );
};

function printChart(userData2, userData) {
  let amounts = [];

  // console.log(countriesInContinent.code);
  // console.log(userData.data[0].latest_data.deaths);
  let bths = document.querySelectorAll(".case_btn");

  bths.forEach((element) =>
    element.addEventListener("click", function () {
      console.log(element);

      let caseValue = element.value.toLowerCase();
      console.log(caseValue);

      //checkCase(caseStatus , caseValue);
      let color;
      let label;

      for (let x = 0; x < countriesInContinent.length; x++) {
        for (let i = 0; i < userData.data.length; i++) {
          let deaths = userData.data[i].latest_data.deaths;
          let confirmed = userData.data[i].latest_data.confirmed;
          let critical = userData.data[i].latest_data.critical;
          let recovered = userData.data[i].latest_data.recovered;

          if (countriesInContinent[x].code === userData.data[i].code) {
            if (caseValue === "deaths") {
              label = "deaths";
              color = "#443F3F";
              amounts.push(deaths);
            }

            if (caseValue === "confirmed") {
              label = "confirmed";
              color = "#454993";
              amounts.push(confirmed);
            }

            if (caseValue === "critical") {
              label = "critical";
              color = "#FF5C5C";
              amounts.push(critical);
            }
            if (caseValue === "recovered") {
              label = "recovered";
              color = "#61BC57";
              amounts.push(recovered);
            }
          }
        }
      }

      console.log(amounts);
      // Confirmed Cases
      // - Number of Deaths
      // - Number of recovered
      // - Number of critical condition

      let ctx = document.getElementById("myChart").getContext("2d");
      let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
          labels: countriesList,
          datasets: [
            {
              label: label,
              backgroundColor: color,
              borderColor: color,
              data: amounts,
            },
          ],
        },

        // Configuration options go here
        options: {},
      });
    })
  );
}
