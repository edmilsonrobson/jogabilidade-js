import PodcastManager from "./managers/PodcastManager/PodcastManager";
import Config from "./config";

console.log("Running JogabilidadeJS");

async function doTests() {
  const podcastManager = new PodcastManager();
  console.log("Fetching games...");
  await podcastManager.fetchGames(Config.FEED_GAMES);
  console.log("Fetched");
}

doTests();

module.exports = {};
