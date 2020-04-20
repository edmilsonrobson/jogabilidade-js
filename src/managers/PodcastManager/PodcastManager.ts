import Config from "../../config";
import Parser from "rss-parser";
import { get } from "lodash";

import { IPodcast, ITimestamp } from "../../constants/types";
import moment from "moment";

class PodcastManager {
  parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  parseTopicTimestamps(content: string): ITimestamp[] {
    const topicTimestamps: ITimestamp[] = [];
    const contentWithoutMusicTracks = content.replace(
      /Trilha do Podcast.*$/gs,
      ""
    );
    const listItems = contentWithoutMusicTracks.match(/<li>(.*)<\/li>/g);
    if (!listItems) return [];
    listItems.forEach((item) => {
      const inner = item.replace(/<\/?li>/g, "");
      const timestampTime = inner.replace(/^.*(\d\d:\d\d:\d\d)$/, "$1");
      const title = inner.replace(/^(.*)\d\d:\d\d:\d\d$/, "$1");
      const cleanTitle = title.replace(/^(.*) ?\: $/, "$1").trim();

      const validValues =
        title && timestampTime && /\d\d:\d\d:\d\d/.test(timestampTime);
      if (!validValues) return;
      topicTimestamps.push({
        title: cleanTitle,
        timestamp: timestampTime,
      });
    });

    return topicTimestamps;
  }

  async fetchGames(source: string): Promise<IPodcast[]> {
    let feed = undefined;
    if (/^http:\/\/$/.test(source)) {
      feed = await this.parser.parseURL(source);
    } else {
      feed = await this.parser.parseString(source);
    }
    if (!feed || !feed.items) return [];

    const podcasts: IPodcast[] = [];

    feed.items?.forEach((item) => {
      podcasts.push({
        title: item.title ?? "",
        siteUrl: item.link ?? "",
        audioUrl: item.enclosure?.url ?? "",
        description: get(item, "itunes.summary"),
        publicationDate: moment(item.pubDate) ?? moment(),
        duration: get(item, "itunes.duration", ""),
        imageUrl: "",
        musicTimestamps: [],
        topicTimestamps: this.parseTopicTimestamps(item.content ?? ""),
      });
    });

    return podcasts;
  }
}

export default PodcastManager;
