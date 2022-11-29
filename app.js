const btn = document.querySelector("#country-button");
btn.addEventListener("click", getLanguage);
const container = document.querySelector("#country-container");

function getLanguage(event) {
  event.preventDefault();
  const input = document.querySelector("#language-input");

  const language = input.value.toLowerCase();
  fetchCountry(language);
  input.value = '';
}

function fetchCountry(language) {
  const url = `https://restcountries.com/v3.1/lang/${language}`;

  fetch(url)
    .then((response) => response.json())
    .then(displayCountry)
    .catch(catchError);
}

function displayCountry(langData) {
  console.log(langData);
  clearInput();
  langData.sort((x, y) => y.population - x.population)
  .forEach((country, index) => {
    const countryCard = document.createElement('div');
    container.append(countryCard);
    const countryName = document.createElement('h2');
    const subregion = document.createElement('h3');
    const capital = document.createElement('p');
    const population = document.createElement('p');
    const flag = document.createElement('img');
    countryCard.appendChild(countryName);
    countryCard.appendChild(subregion);
    countryCard.appendChild(capital);
    countryCard.appendChild(population);
    countryCard.appendChild(flag);
    countryName.innerText = country.name.official;
    subregion.innerText = country.subregion;
    capital.innerText = "Capital: " + country.capital;
    population.innerText = "Population: " + country.population;
    flag.src = country.flags.png;
    if(index == 0){
      countryName.style.textDecoration = 'underline';
    }
  });

}

function catchError() {
  clearInput();
  const errorText = document.createElement('h1');
  container.append(errorText);
  errorText.innerText = 'No countries found, try again';
}

function clearInput(){
  return container.innerHTML = "";
}