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

async function fetchNewStories() {
  let response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  let data = await response.json();
  newStoriesArray = data;
}

async function fetchTenStories() {
  let arr = newStoriesArray.splice(0, 10);
  let urls = arr.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  const jsons = await Promise.all(
    urls.map((url) => fetch(url).then((res) => res.json()))
  );

  jsons.forEach((json) => {
    createCard(json);
  });
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

async function run() {
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
  run();
});

let container = document.querySelector(".card-container");

run();
