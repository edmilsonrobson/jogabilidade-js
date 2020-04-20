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
