import * as Env from '@utils/env';
import * as Lang from '@utils/lang';
import * as TrackPlayerUtils from '@utils/trackPlayer';
import * as Services from '@utils/services/index';

export { Env, Lang, TrackPlayerUtils as TrackPlayer, Services };

export const utils = {
  Env,
  Lang,
  TrackPlayer: TrackPlayerUtils,
  Services,
};

export default utils;
