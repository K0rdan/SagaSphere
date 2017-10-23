const protocol = "http";
const host = "192.168.213.27";
const port = "80";
const base = `${protocol}://${host}:${port}`;

export const Config = {
  Lang: "FR",
  NotificationDuration: 5000,
  Network: {
    host,
    port,
    base,
    timeout: 10000
  },
  EndPoints: {
    base,
    login: `${base}/login`,
    logout: `${base}/logout`,
    news: `${base}/news`,
    saga: {
      latest: `${base}/episodes/latest`,
      list: `${base}/sagalist`,
      news: `${base}/saga/news`
    },
    episodes: {
      latest: `${base}/episodes/latest`
    },
    user: {
      feeds: `${base}/user/feeds`
    }
  }
};

export default Config;
