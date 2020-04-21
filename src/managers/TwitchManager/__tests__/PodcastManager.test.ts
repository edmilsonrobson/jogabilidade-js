import TwitchManager from "../TwitchManager";

describe("PodcastManager class", () => {
  test("should properly receive configuration on constructor", () => {
    const manager = new TwitchManager({
      twitchClientId: "dummyClientId",
      twitchUserId: "dummyUserId",
    });

    expect(manager.getConfigData()).toEqual({
      twitchClientId: "dummyClientId",
      twitchUserId: "dummyUserId",
    });
  });
});
