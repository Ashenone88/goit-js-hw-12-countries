import './styles.css';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import templete from './templete.hbs';
import fetchCountries from './js/fetchCountries';
const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#input'),
  countryList: document.querySelector('#js-country__list'),
  countryInfo: document.querySelector('#js-country__info'),
};

const baseUrl = 'https://restcountries.eu/rest/v2/name/';

refs.input.addEventListener('input', debounce(inputSubmit, 500));

function inputSubmit() {
  fetchCountries(baseUrl, `${refs.input.value}`, inputSearchHandler);
}

function inputSearchHandler(data) {
  if (data.length >= 10) {
    soMatchCountriesList();
  } else if (data.length > 1) {
    countriesListDrowToHTML(data);
  } else {
    creatMarkupOneCountry(data[0]);
  }
}

function soMatchCountriesList() {
  clearOutput();
  PNotify.error({
    title: 'Error!',
    text: 'To many matches found. Please enter a more specific query!',
  });
}

function countriesListDrowToHTML(drowCountries) {
  clearOutput();
  const markup = drowCountries
    .map(({ name }) => `<li class="list__item">${name}</li>`)
    .join('');

  refs.countryList.insertAdjacentHTML('beforeend', markup);
}

function creatMarkupOneCountry(counrty) {
  clearOutput();
  creatMarkup(counrty);
}

function creatMarkup(objElem) {
  const markup = templete(objElem);
  refs.countryInfo.insertAdjacentHTML('beforeend', markup);
}

function clearOutput() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

///////////////////////

// refs.input.addEventListener('input', debounce(handleInputFetchCountries, 1000));

// function handleInputFetchCountries() {
//   fetchCountries(baseUrl, `${refs.input.value}`, onDataReady);
// }

// function onDataReady(data) {
//   if (data.length >= 10) {
//     fnToManyMatches();
//   } else if (data.length > 1) {
//     showCountryList(data);
//   } else {
//     showOneCountry(data[0]);
//   }
// }

// function fnToManyMatches() {
//   clearOutput();
//   PNotify.error({
//     title: 'Error!',
//     text: 'To many matches found. Please enter a more specific query!',
//   });
// }

// function showCountryList(data) {
//   clearOutput();
//   const listMarkup = data
//     .map(item => `<li class="country-list__item">${item.name}</li>`)
//     .join('');

//   refs.countryList.insertAdjacentHTML('beforeend', listMarkup);
// }

// function showOneCountry(dataObj) {
//   clearOutput();
//   createMarkup(dataObj);
// }

// function createMarkup(obj) {
//   const markup = countryTemplate(obj);
//   refs.countryInfo.insertAdjacentHTML('beforeend', markup);
// }

// function cleardOutput() {
//   refs.countryInfo.innerHTML = '';
//   refs.countryList.innerHTML = '';
// }
