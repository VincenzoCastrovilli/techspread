let newStoriesArray = [];

let storyLimit = 10;

let mainArray = [];

async function fetchNewStories() {
  let response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  let data = await response.json();
  newStoriesArray = data;
}

async function fetchInitialStories(limit) {
  let arr = newStoriesArray.splice(0, limit);
  let urls = arr.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  Promise.all(urls.map((url) => fetch(url).then((res) => res.json()))).then(
    (jsons) => jsons.forEach((json) => mainArray.push(json))
  );
  console.log(mainArray);
}

async function loadMoreStories() {
  let arr = newStoriesArray.splice(11, 10);
  let urls = arr.map(
    (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  Promise.all(urls.map((url) => fetch(url).then((res) => res.json()))).then(
    (jsons) => jsons.forEach((json) => mainArray.push(json))
  );
  console.log(mainArray);
}

async function run() {
  await fetchNewStories();
  fetchInitialStories(storyLimit);
}

let button = document.querySelector(".button");
button.addEventListener("click", loadMoreStories);

run();
