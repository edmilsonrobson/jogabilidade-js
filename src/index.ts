import PodcastManager from "./managers/PodcastManager";
import TwitchManager from "./managers/TwitchManager";
import Config from "./config";

const run = async () => {
  /* const manager = new TwitchManager({
    twitchClientId: "7t8w5vr1dzmpstdjj37xtsyrw7il8z",
    twitchUserId: "36830116",
  });

  const videos = await manager.fetchVideos(); */
};

run();

export { PodcastManager, Config, TwitchManager };
