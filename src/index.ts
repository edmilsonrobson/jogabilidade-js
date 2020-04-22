import PodcastManager from "./managers/PodcastManager";
import TwitchManager from "./managers/TwitchManager";
import Config from "./config";

const manager = new PodcastManager();
const twitchManager = new TwitchManager({
  twitchClientId: "7t8w5vr1dzmpstdjj37xtsyrw7il8z",
  twitchUserId: "36830116",
});

const testVar = async () => {
  /* const result = await twitchManager.fetchVideos();
    console.log(result); */
  try {
    const result = await manager.fetchGames();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

testVar();

export { PodcastManager, Config, TwitchManager };
