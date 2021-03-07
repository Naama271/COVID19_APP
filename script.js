const getData = async () => {
  let url = "https://corona-api.com/countries";

  const reqUser = await fetch(url);

  const userData = await reqUser.json();

  let url2 = "https://restcountries.eu/rest/v2/all";

  const reqUser2 = await fetch(url2);

  const userData2 = await reqUser2.json();

  displayData(userData2, userData);
};

getData();

let countriesInContinent = [];
let countriesList = [];

const displayData = (userData2, userData) => {
  let bths = document.querySelectorAll(".region_btn");
  bths.forEach((element) =>
    element.addEventListener("click", function () {
      countriesInContinent = [];
      countriesList = [];

      let displayDiv = document.querySelector(".display");

      while (displayDiv.firstChild)
        displayDiv.removeChild(displayDiv.firstChild);

      for (let i = 0; i < userData2.length; i++) {
        if (userData2[i].region.toLowerCase() == element.value.toLowerCase()) {
          let div = document.createElement("div");

          div.innerHTML = `<a href="javascript:void(0)"><img src="${userData2[i].flag}"</img>  <p>    ${userData2[i].name} </p></a>`;
          div.classList.add("countryBTN");

          countriesInContinent.push({
            name: userData2[i].name,
            code: userData2[i].alpha2Code,
          });

          countriesList.push(userData2[i].name);

          div.addEventListener("click", async () => {
            for (let i = 0; i < countriesInContinent.length; i++) {
              if (
                div.innerHTML
                  .toLowerCase()
                  .includes(countriesInContinent[i].name.toLowerCase())
              ) {
                // console.log(countriesInContinent[i].code);
                let contryCode = countriesInContinent[i].code;

                let url3 = `https://corona-api.com/countries/${contryCode}`;

                const reqUser3 = await fetch(url3);
                //console.log(reqUser3);

                const userData3 = await reqUser3.json();
                // console.log(userData3.data);

                let totalCases = userData3.data.latest_data.confirmed;
                let newCases = userData3.data.today.confirmed;
                let totalDeaths = userData3.data.latest_data.deaths;
                let newDeaths = userData3.data.today.deaths;
                let totalRecovered = userData3.data.latest_data.recovered;
                let criticalCondition = userData3.data.latest_data.critical;

                let contryHEADER = document.querySelector(".contryHEADER");
                contryHEADER.innerHTML = countriesInContinent[i].name;

                let totalCasesDiv = document.querySelector(
                  ".totalCases .amountOf"
                );
                totalCasesDiv.innerHTML = totalCases;

                let newCasesDiv = document.querySelector(".newCases .amountOf");
                newCasesDiv.innerHTML = newCases;

                let totalDeathsDiv = document.querySelector(
                  ".totalDeaths .amountOf"
                );
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
              }
            }
          });

          displayDiv.appendChild(div);
        }
      }
      printChart(userData);
    })
  );
};

function printChart(userData) {
  let bths = document.querySelectorAll(".case_btn");

  bths.forEach((element) =>
    element.addEventListener("click", function () {
      //  console.log(element);

      let caseValue = element.value.toLowerCase();
      // console.log(caseValue);

      let color;
      let label;

      amounts = [];

      for (let x = 0; x < countriesInContinent.length; x++) {
        for (let i = 0; i < userData.data.length; i++) {
          if (countriesInContinent[x].code === userData.data[i].code) {
            let deathsData = userData.data[i].latest_data.deaths;
            let confirmedData = userData.data[i].latest_data.confirmed;
            let criticalData = userData.data[i].latest_data.critical;
            let recoveredData = userData.data[i].latest_data.recovered;

            checkCase("deaths", "#443F3F", deathsData);
            checkCase("critical", "#FF5C5C", criticalData);
            checkCase("confirmed", "#454993", deathsData);
            checkCase("recovered", "#61BC57", recoveredData);

            function checkCase(caseName, colorHex, data) {
              if (caseValue === caseName) {
                label = caseName;
                color = colorHex;
                amounts.push(data);
              }
            }
          }
        }
      }

      let ctx = document.getElementById("myChart").getContext("2d");
      let chart = new Chart(ctx, {
        type: "line",

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
      });
    })
  );
}
