const axios = require("axios").default;
const _ = require("lodash");

let newStoriesArray = [];
let currentIndex = 0;

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let container = document.querySelector(".card-container");

async function fetchNewStories() {
  try {
    let { data } = await axios.get(
      "https://hacker-news.firebaseio.com/v0/newstories.json"
    );

    newStoriesArray = _.chunk(data, 10);
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchTenStories() {
  let tenStories = newStoriesArray[currentIndex];
  currentIndex++;
  let urls = tenStories.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  try {
    const storiesData = await Promise.all(
      urls.map((url) => axios.get(url).then((res) => res.data))
    );

    return storiesData;
  } catch (error) {
    console.log(error);
  }
}

function createDOMElement(type, classList, content, attributes = {}) {
  const element = document.createElement(type);
  if (classList) {
    classList
      .split(" ")
      .forEach((className) => element.classList.add(className));
  }
  if (content) {
    element.innerHTML = content;
  }
  for (let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }
  return element;
}

function createCard(story) {
  const card = createDOMElement("div", "card");
  const cardTitle = createDOMElement("div", "card-title", story.title);

  const cardDate = createDOMElement(
    "div",
    "card-date",
    `<i class="fa-regular fa-calendar"></i> ${new Date(
      story.time * 1000
    ).getDate()} ${
      monthsArray[new Date(story.time * 1000).getMonth()]
    } ${new Date(story.time * 1000).getFullYear()}`
  );
  const cardLink = createDOMElement(
    "a",
    "card-link",
    'READ MORE <i class="fa-solid fa-arrow-up-right-from-square"></i>',
    {
      href: story.url,
      target: "_blank",
    }
  );

  card.append(cardTitle, cardDate, cardLink);
  return card;
}

function loadCards(storiesData) {
  const fragment = document.createDocumentFragment();
  storiesData.forEach((story) => {
    const card = createCard(story);
    fragment.appendChild(card);
  });
  container.appendChild(fragment);
}

async function renderStories() {
  const storiesData = await fetchTenStories();
  if (storiesData) {
    loadCards(storiesData);
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

async function updateStories() {
  currentIndex = 0;
  newStoriesArray = [];
  container.textContent = "";
  await fetchNewStories();
  await renderStories();
}

let loadButton = document.querySelector(".load-btn");
loadButton.addEventListener("click", renderStories);

let topButton = document.querySelector(".top-btn");
topButton.addEventListener("click", topFunction);

let updateButton = document.querySelector(".update-btn");
updateButton.addEventListener("click", updateStories);

updateStories();
