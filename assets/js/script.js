const axios = require("axios").default;

let newStoriesArray = [];

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

    newStoriesArray = data;
  } catch (error) {
    console.log(error.message);
  }
}

async function fetchTenStories() {
  let tenStories = newStoriesArray.splice(0, 10);
  let urls = tenStories.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );

  try {
    const storiesData = await Promise.all(
      urls.map((url) => axios.get(url).then((res) => res.data))
    );

    storiesData.forEach((story) => {
      createCard(story);
    });
  } catch (error) {
    console.log(error);
  }
}

function createCard(story) {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardTitle = document.createElement("div");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = story.title;
  card.append(cardTitle);

  const cardDate = document.createElement("div");
  cardDate.classList.add("card-date");
  let date = new Date(story.time * 1000);
  let day = date.getDate();
  let month = monthsArray[date.getMonth()];
  let year = date.getFullYear();
  cardDate.innerHTML = ` <i class="fa-regular fa-calendar"></i> ${day} ${month} ${year}`;
  card.append(cardDate);

  const cardLink = document.createElement("a");
  cardLink.classList.add("card-link");
  cardLink.setAttribute("href", story.url);
  cardLink.setAttribute("target", "_blank");
  cardLink.innerHTML = `READ MORE  <i class="fa-solid fa-arrow-up-right-from-square" style="margin-left: 4px"></i>`;
  card.append(cardLink);

  container.append(card);
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

async function updateStories() {
  await fetchNewStories();
  await fetchTenStories();
}

let loadButton = document.querySelector(".load-btn");
loadButton.addEventListener("click", fetchTenStories);

let topButton = document.querySelector(".top-btn");
topButton.addEventListener("click", topFunction);

let updateButton = document.querySelector(".update-btn");
updateButton.addEventListener("click", () => {
  container.textContent = "";
  updateStories();
});

updateStories();
