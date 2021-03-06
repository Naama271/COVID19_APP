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
  // console.log(userData2);
  displayData(userData2, userData);
};

getData();

let countriesInContinent = [];
let countriesList = [];

const displayData = (userData2, userData) => {
  let bths = document.querySelectorAll(".region_btn");
  bths.forEach((element) =>
    element.addEventListener("click", function () {


      let displayDiv = document.querySelector(".display");

      while (displayDiv.firstChild)
        displayDiv.removeChild(displayDiv.firstChild);

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

          // console.log(countriesInContinent);

          countriesList.push(userData2[i].name);

          div.addEventListener("click", async () => {
            for (let i = 0; i < countriesInContinent.length; i++) {
              if (
                div.innerHTML
                  .toLowerCase()
                  .includes(countriesInContinent[i].name.toLowerCase())
              ) {
                console.log(countriesInContinent[i].code);
                let contryCode = countriesInContinent[i].code;

                let url3 = `https://corona-api.com/countries/${contryCode}`;

                const reqUser3 = await fetch(url3);
                console.log(reqUser3);

                const userData3 = await reqUser3.json();
                console.log(userData3.data);

                let totalCases = userData3.data.latest_data.confirmed;
                let newCases = userData3.data.today.confirmed;
                let totalDeaths = userData3.data.latest_data.deaths;
                let newDeaths = userData3.data.today.deaths;
                let totalRecovered = userData3.data.latest_data.recovered;
                let criticalCondition = userData3.data.latest_data.critical;

                //let countryStatus = document.querySelector(".countryStatus");

                let contryHEADER = document.querySelector(".contryHEADER");
                contryHEADER.innerHTML = countriesInContinent[i].name;

                let totalCasesDiv = document.querySelector(
                  ".totalCases .amountOf"
                );
                totalCasesDiv.innerHTML = totalCases;

                let newCasesDiv = document.querySelector(".newCases .amountOf");
                newCasesDiv.innerHTML = newCases;

                let totalDeathsDiv = document.querySelector(".totalDeaths .amountOf");
                totalDeathsDiv.innerHTML = totalDeaths;

                let newDeathsDiv = document.querySelector(
                  ".newDeaths .amountOf"
                );
                newDeathsDiv.innerHTML = newDeaths;

                let totalRecoveredDiv = document.querySelector(
                  ".totalRecovered .amountOf"
                );
                totalRecoveredDiv.innerHTML = totalRecovered;

                let criticalConditionDiv = document.querySelector(
                  ".criticalCondition .amountOf"
                );
                criticalConditionDiv.innerHTML = criticalCondition;
                // countryStatus.innerHTML = `totalCases:${totalCases}  newCases:${newCases}  totalDeaths:${totalDeaths}  newDeaths:${newDeaths} totalRecovered:${totalRecovered} criticalCondition:${criticalCondition}`
              }
            }

            //  displayData(userData2, userData);
          });

          displayDiv.appendChild(div);
        }
      }
      printChart(userData2, userData);
    })
  );
};

function printChart(userData2, userData) {
  let amounts = [];
  amounts.splice(0, amounts.length);
  console.log(amounts);

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
       // options: {},
      });
    })
  );
}
