// main variable

// get repos function
function getRepos(){
  let reposData = document.querySelector(".show-data");
  let theInput = document.querySelector(".get-repos input");

  if (theInput.value == ""){   // if value is empty
    reposData.innerHTML = "<span> Please Write Github Usernme.</span>";
  }else{
    fetch(`https://api.github.com/users/${theInput.value}/repos`)

    .then((response) =>  response.json())

    .then((repositories) => {
     // Enmpty the Container
     reposData.innerHTML = "";
     // Loop On Rebositries
     repositories.forEach(repo => {
       // creat main dv element
      let mainDiv = document.createElement("div");

      console.log('repo', repo);
       // great rpo tex
      let reboName = document.createTextNode(repo.name);

      // append the text to main div
      mainDiv.appendChild(reboName);

      // // great repo url
      let theUrl = document.createElement("a");

      // //creat repo url text
      let theUrlText = document.createTextNode("Visit");

      // // append the repo url test to tag
       theUrl.appendChild(theUrlText)

      // // add the "href"
      theUrl.href = repo.svn_url;

       //set attrebut blank
      theUrl.setAttribute("target", "_blank");

       // appenad url anchor to the main div
      mainDiv.appendChild(theUrl);

       // creat the starts span
       let starstSpan = document.createElement("span")

       // creat the start cout text
       let starstText = document.createTextNode(`Stars ${repo.stargazers_count}`)

       // add stars text to span
       starstSpan.appendChild(starstText)

      //append stars cout to the main div
      mainDiv.appendChild(starstSpan)

      //add class to the main div
      mainDiv.className = "repo-box";

      // append the main div to container
      reposData.appendChild(mainDiv);
     });
    });

  }
}

const searchForm = document.getElementById('searchForm');

function submitSearch(e) {
  e.preventDefault();
  const searchInput = document.getElementById('search');
  let reposData = document.querySelector(".show-data");
  if (searchInput.value === "") {
    reposData.innerHTML = "<span> Please Write Github Usernme.</span>";
  } else {
    fetch(`https://api.github.com/users/${searchInput.value}/repos`)
    .then((response) =>  response.json())
    .then((repositories) => {
      // Enmpty the Container
      reposData.innerHTML = "";
      // Loop On Rebositries
      repositories.forEach(repo => {
      // creat main dv element
      let mainDiv = document.createElement("div");
      // great rpo tex
      let reboName = document.createTextNode(repo.name);

      // append the text to main div
      mainDiv.appendChild(reboName);

      // // great repo url
      let theUrl = document.createElement("a");

      // //creat repo url text
      let theUrlText = document.createTextNode("Visit");

      // // append the repo url test to tag
      theUrl.appendChild(theUrlText)

      // // add the "href"
      theUrl.href = repo.svn_url;

      //set attrebut blank
      theUrl.setAttribute("target", "_blank");

      // appenad url anchor to the main div
      mainDiv.appendChild(theUrl);

      // creat the starts span
      let starstSpan = document.createElement("span")

      // creat the start cout text
      let starstText = document.createTextNode(`Stars ${repo.stargazers_count}`)

      // add stars stars cout text to span
      starstSpan.appendChild(starstText)

      //append stars cout to the main div
      mainDiv.appendChild(starstSpan)

      //add class to the main div
      mainDiv.className = "repo-box";

      // append the main div to container
      reposData.appendChild(mainDiv);

     });

      // chart.js
      const labels = repositories.map(repo => repo.name); // ['name 1', 'name2' ....]
      const data = {
        labels: labels,
        datasets: [{
          label: 'Repositories stars',
          backgroundColor: 'rgb(19, 90, 157)',
          borderColor: 'rgb(255, 99, 132)',
          data: repositories.map(repo => repo.stargazers_count), // [20, 15 ....]
        }]
      };
      const config = {
        type: 'bar',
        data: data,
        options: {}
      };

      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
    });
  }
}

if(searchForm) {
  searchForm.addEventListener('submit', submitSearch);
}

// Add new city POST
const addNewCity = (e) => {
  e.preventDefault();
  // get the name and the population from inputs
  const cityName = document.getElementById('cityName');
  const cityPopulation = document.getElementById('cityPopulation');
  const body = {
    name: cityName.value,
    population: Number(cityPopulation.value),
  };
  fetch(`https://avancera.app/cities/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      loadCities();
      cityName.value = '';
      cityPopulation.value = '';
    } else {
      console.log('there is something wrong');
    }
  })
}
//removing cities DELETE
const deleteCity = (id) => {
  fetch(`https://avancera.app/cities/${id}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.ok) {
      loadCities();
    } else {
      console.log('there is something wrong');
    }
  })
}
//Edit cities PUT
const editCity = (id, body) => {
  fetch(`https://avancera.app/cities/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
  }).then(response => {
    if (response.ok) {
      loadCities();
    } else {
      console.log('there is something wrong');
    }
  })
}

const newCityForm = document.getElementById('newCityForm');
if (newCityForm) {
  newCityForm.addEventListener('submit', addNewCity);
}

const loadCities = () => {
  // Cities page
  const citiesContainer = document.getElementById('listCities');

  // fetch all cities GET
  fetch('https://avancera.app/cities')
    .then((response) =>  response.json())
    .then((cities) => {
      if (citiesContainer) {
        citiesContainer.innerHTML = '';

         // loop for each city
      for (let cityIndex = 0; cityIndex < cities.length; cityIndex++) {
        const city = cities[cityIndex];

        const row = document.createElement('div');
        const columnName = document.createElement('input');
        const columnPopulation = document.createElement('input');
        const columnActions = document.createElement('div');
        const buttonEdit = document.createElement('button');
        const buttonRemove = document.createElement('button');

        row.classList.add('row');

        columnName.classList.add('column-name');
        columnPopulation.classList.add('column-population');
        columnActions.classList.add('column-actions');

        columnName.classList.add('col');
        columnPopulation.classList.add('col');
        columnActions.classList.add('col-auto');
        buttonEdit.classList.add('btn');
        buttonEdit.classList.add('btn-outline-success');
        buttonEdit.classList.add('btn-sm');
        buttonEdit.classList.add('me-md-2');
        buttonRemove.classList.add('btn');
        buttonRemove.classList.add('btn-outline-danger');
        buttonRemove.classList.add('btn-sm');


        buttonEdit.onclick = function (){
          editCity(city.id, { id: city.id , name: columnName.value, population: Number(columnPopulation.value) });
        }

        buttonRemove.addEventListener('click', () => {
          deleteCity(city.id);
        });
        //
        // btn-outline-dange

        columnName.value = city.name;
        columnPopulation.value = city.population;
        buttonEdit.innerHTML = 'Edit';
        buttonRemove.innerHTML = 'Remove';
        columnActions.appendChild(buttonEdit);
        columnActions.appendChild(buttonRemove);

        row.appendChild(columnName);
        row.appendChild(columnPopulation);
        row.appendChild(columnActions);

        citiesContainer.appendChild(row);
      }


      }
      // append child to container
    })
}

loadCities();

// code of Web Storage för att spara ner,  samt vid ett senare tillfälle jag har spart dark theme
const linkElement = document.getElementById('link-theme');

const toggleTheme = () => {
  if (linkElement.hasAttribute('href')) {
    linkElement.removeAttribute('href');
    // 'isDarkTheme' save in localstorage value `false`
    localStorage.setItem('isDarkTheme', JSON.stringify(false));
  } else {
    linkElement.setAttribute('href', 'https://bootswatch.com/5/darkly/bootstrap.min.css');
    // 'isDarkTheme' save in localstorage value `true`
    localStorage.setItem('isDarkTheme', JSON.stringify(true));
  }
}

const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', toggleTheme);

// on page load
// check if isDarkTheme in localstorage is true or false
const isDarkTheme = JSON.parse(localStorage.getItem('isDarkTheme'));

if (isDarkTheme) {
  linkElement.setAttribute('href', 'https://bootswatch.com/5/darkly/bootstrap.min.css');
}
