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
      list: `${base}/sagalist`,
      news: `${base}/saga/news`
    },
    user: {
      feeds: `${base}/user/feeds`
    }
  }
};

export default Config;
