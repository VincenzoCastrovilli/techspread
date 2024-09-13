let newStoriesArray = [];

let mainArray = [];

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

  jsons.forEach((json) => mainArray.push(json));
  console.log(mainArray);
}

async function run() {
  await fetchNewStories();
  await fetchTenStories();
}

let button = document.querySelector(".button");
button.addEventListener("click", fetchTenStories);

run();
