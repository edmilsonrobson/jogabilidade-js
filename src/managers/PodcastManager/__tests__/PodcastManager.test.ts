import PodcastManager from "../PodcastManager";
import { ITimestamp } from "../../../constants/types";
import { gamesRss } from "../utils";

describe("PodcastManager class", () => {
  const manager = new PodcastManager();

  describe("fetch games", () => {
    test("should parse correct number of podcasts from games test RSS", async () => {
      const podcasts = await manager.fetchPodcasts(gamesRss);
      const podcastsWithTimestamps = podcasts.filter(
        (podcast) => podcast.topicTimestamps.length > 0
      );
      const podcastsWithoutTimestamps = podcasts.filter(
        (podcast) => podcast.topicTimestamps.length === 0
      );

      expect(podcasts.length).toBe(373);
      expect(podcastsWithTimestamps.length).toBeGreaterThan(0); // * The newer ones have proper timestamps
      expect(podcastsWithoutTimestamps.length).toBeGreaterThan(0); // * Some old ones do not have timestamps
    });
  });

  describe("timestamps", () => {
    const dummyContent = `
      'Recebemos Ricardo Dias para comentar as notícias do fim do mundo, como as informações técnicas do Xbox Series X e PS5, rumores da Sony produzindo Silent Hill, o leilão do protótipo do Play Station, Horizon: Zero Dawn para PC e mais.<p></p><p><strong>E o que você tem a dizer?</strong></p><p>Deixe seu feedback acessando o <a href="http://jogabilida.de/2020/03/vertice-233/">post deste podcast</a>, ou mande um e-mail para <a href="mailto:contato@jogabilida.de">contato@jogabilida.de</a></p><p><strong>Blocos do Podcast</strong>:<ul>\r\n' +
      ' \t<li>Cancelamento da E3 2020 : 00:10:34</li>\r\n' +
      ' \t<li>Reflexos da pandemia no mundo dos jogos: 00:20:24</li>\r\n' +
      ' \t<li>Mais informações sobre a próxima geração de consoles: 00:43:03</li>\r\n' +
      ' \t<li>Email 1: 01:44:15</li>\r\n' +
      ' \t<li>Timestamp 333 test with: 24 numbers 02:00:00</li>\r\n' +
      '</ul></p><p><strong>Trilha do Podcast</strong>:<ul>\r\n' +
      ' \t<li>“Late Nite Funk Squad”, por David Tobin, Jeff Meegan e Malcolm Edmonstone</li>\r\n' +
      ' \t<li>Álbum "Relics of the Chozo" de https://ocremix.org/</li>\r\n' +
      '</ul></p><a href="http://jogabilida.de/contribua/"><img src="http://jogabilida.de/wp-content/uploads/2018/02/banner-contribua.jpg" /></a><a href="http://www.youtube.com/jogabilidade"><img src="http://jogabilida.de/wp-content/uploads/2018/02/banner-youtube.jpg" /></a>',
    `;

    test("should properly separate topic timestamps", () => {
      const expectedTopicTimestamps: ITimestamp[] = [
        {
          title: "Cancelamento da E3 2020",
          timestamp: "00:10:34",
        },
        {
          title: "Reflexos da pandemia no mundo dos jogos",
          timestamp: "00:20:24",
        },
        {
          title: "Mais informações sobre a próxima geração de consoles",
          timestamp: "00:43:03",
        },
        {
          title: "Email 1",
          timestamp: "01:44:15",
        },
        {
          title: "Timestamp 333 test with: 24 numbers",
          timestamp: "02:00:00",
        },
      ];

      const topicTimestamps = manager.parseTopicTimestamps(dummyContent);
      expect(topicTimestamps.sort()).toStrictEqual(
        expectedTopicTimestamps.sort()
      ); // * Order is irrelevant
    });

    test("should handle empty content", () => {
      const timestamps = manager.parseTopicTimestamps("");

      expect(timestamps).toEqual([]);
    });

    test("should handle gibberish content", () => {
      const timestamps = manager.parseTopicTimestamps(
        "asdas Amdaspkcwem)@#*( SMASD(AD(AD"
      );

      expect(timestamps).toEqual([]);
    });

    test("should handle invalidly formatted content", () => {
      const contentWithInvalidFormat = `
        <li>This is a topic without a proper timestamp at the end!</li>
        <li>02:20:22</li>
        <li>2:4:30</li>
        <li>fas pasdk< asDM<SP li </li>
      `;
      const timestamps = manager.parseTopicTimestamps(contentWithInvalidFormat);

      expect(timestamps).toEqual([]);
    });

    test("should handle partially well formatted content", () => {
      const contentWithInvalidFormat = `
        <li>This is a topic without a proper timestamp at the end!</li>
        <li>Mais informações sobre a próxima geração de consoles: 00:43:03</li>
        <li>2:4:30</li>
        <li>Email 1: 01:44:15</li>
        <li>fas pasdk< asDM<SP li </li>
      `;

      const expectedTopicTimestamps: ITimestamp[] = [
        {
          title: "Mais informações sobre a próxima geração de consoles",
          timestamp: "00:43:03",
        },
        {
          title: "Email 1",
          timestamp: "01:44:15",
        },
      ];

      const timestamps = manager.parseTopicTimestamps(contentWithInvalidFormat);

      expect(timestamps).toEqual(expectedTopicTimestamps);
    });
  });
});
