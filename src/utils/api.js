import fetch from "isomorphic-fetch";
import { extend } from "lodash";
import { Config, Lang } from "./index";

export function API(url, options = {}) {
  const defaultOptions = {};

  return Promise.race([
    fetch(url, extend(defaultOptions, options))
      // Network handler
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          const err = {
            status: res.status,
            message: Lang[Config.Lang].Errors.Network.Default
          };
          const statusErr = Lang[Config.Lang].Errors.Network[res.status];

          if (res.statusText) {
            err.message = res.statusText;
          } else if (statusErr) {
            err.message = Lang[Config.Lang].Errors.Network[res.status];
          }

          throw err;
        }
        return res.json();
      })
      // JSON handler
      .then((resJson) => {
        if (!resJson || !resJson.status || resJson.status === "ko") {
          throw resJson;
        }
        return resJson;
      })
      // Error handler
      .catch((err) => {
        throw err;
      }),
    new Promise((resolve, reject) =>
      setTimeout(
        () => reject(new Error(Lang[Config.Lang].Errors.Network.Timeout)),
        Config.Network.timeout
      ))
  ]);
}

export default API;
