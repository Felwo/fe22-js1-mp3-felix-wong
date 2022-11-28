/* TO DO LIST
DONE:
* Du ska använda REST Countries API version 3: Restcountry v 3
* När en användare söker på ett språk ska följande information visas på webbsidan för samtliga länder i svaret:
  - Officiellt namn
  - Subregion
  - Huvudstad
  - Befolkningsmängd
* En png-bild med landets flagga
* Länder från tidigare sök ska tas bort vid varje nytt sök. Får man 1 sökträff ska alltså endast ett land visas. Får man 20 sökträffar ska 20 länder visas. 
* Om språket inte går att hitta ska ett informerande meddelande visas på webbsidan. Meddelandet ska tas bort när man söker på ett nytt land.
--------------------------------------------------------
LEFT TO DO:
* Det landet med störst befolkningsmängd ska markeras på valfritt sätt. (Tex med text, färg eller border.)
*/

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
  container.innerHTML = "";
  langData.forEach((country) => {
    // const countryInfo = {
    //   flag: document.createElement("img"),
    //   countryName: document.createElement("h2"),
    //   subregion: document.createElement("h3"),
    //   capital: document.createElement("p"),
    //   population: document.createElement("p"),
    // };
    // countryInfo.countryName.innerText = country.name.official;
    // countryInfo.subregion.innerText = country.subregion;
    // countryInfo.capital.innerText = country.capital;
    // countryInfo.population.innerText = country.population;
    // countryInfo.flag.src = country.flags.png;
    // container.appendChild(countryInfo);
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
});
}

function catchError() {
  container.innerHTML = "";
  const errorText = document.createElement('h1');
  container.append(errorText);
  errorText.innerText = 'No countries found, try again';
}
