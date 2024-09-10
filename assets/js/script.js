let newStoriesArray;

async function fetchNewStories() {
  let response = await fetch(
    "https://hacker-news.firebaseio.com/v0/newstories.json"
  );
  let data = await response.json();
  newStoriesArray = data;
}

async function fetchSingleStory(storyId) {
  let response = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`
  );
  let story = await response.json();
  console.log(story);
}

fetchSingleStory("4355");
