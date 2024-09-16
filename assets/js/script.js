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
  cardDate.textContent = `${day} ${month} ${year}`;
  card.append(cardDate);

  const cardLink = document.createElement("a");
  cardLink.classList.add("card-link");
  cardLink.setAttribute("href", story.url);
  cardLink.setAttribute("target", "_blank");
  cardLink.textContent = "READ MORE ->";
  card.append(cardLink);

  container.append(card);
}

async function run() {
  await fetchNewStories();
  await fetchTenStories();
}

let button = document.querySelector(".button");
button.addEventListener("click", fetchTenStories);

let container = document.querySelector(".main");

run();
