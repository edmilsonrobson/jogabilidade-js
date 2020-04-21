import axios, { AxiosStatic, AxiosInstance } from "axios";
import { ITwitchManagerConfig, ITwitchVideo } from "../../constants/types";

class TwitchManager {
  private config: ITwitchManagerConfig;
  private axios: AxiosInstance;

  constructor(config: ITwitchManagerConfig) {
    this.config = config;
    this.axios = axios.create({
      baseURL: "https://api.twitch.tv/helix",
      headers: {
        "Client-ID": config.twitchClientId,
      },
    });
  }

  getConfigData() {
    return this.config;
  }

  async fetchVideos(): Promise<ITwitchVideo[]> {
    const result = await this.axios.get("/videos", {
      params: {
        user_id: this.config.twitchUserId,
      },
    });

    const twitchVideos: ITwitchVideo[] = [];
    result.data.data.forEach((video: any) => twitchVideos.push(video));

    return twitchVideos;
  }
}

export default TwitchManager;
