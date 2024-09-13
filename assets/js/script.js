let newStoriesArray = [];

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
    const story = document.createElement("div");
    let date = new Date(json.time * 1000);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    story.textContent = `${json.title}, ${day}/${month}/${year} `;
    const link = document.createElement("a");
    link.textContent = "View more";
    link.setAttribute("href", json.url);
    story.append(link);
    container.append(story);
  });
}

async function run() {
  await fetchNewStories();
  await fetchTenStories();
}

let button = document.querySelector(".button");
button.addEventListener("click", fetchTenStories);

let container = document.querySelector(".main");

run();
