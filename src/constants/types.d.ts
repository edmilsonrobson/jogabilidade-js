import moment from "moment";

interface IPodcast {
  title: string;
  description: string;
  duration: string;
  publicationDate: moment.Moment;
  imageUrl: string;
  siteUrl: string;
  audioUrl: string;
  topicTimestamps: ITimestamp[];
  musicTimestamps: ITimestamp[];
}

interface ITimestamp {
  timestamp: string;
  title: string;
}

interface ITwitchVideo {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: string;
  view_count: number;
  language: string;
  type: string;
  duration: string;
}

interface ITwitchManagerConfig {
  twitchClientId: string;
  twitchUserId: string;
}
