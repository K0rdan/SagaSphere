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
    saga: {
      list: `${base}/sagalist`
    }
  }
};

export default Config;
