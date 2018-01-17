import moment from "moment";

export const timeAsHourMinSec = (duration) => {
  const time = moment.duration(duration, "seconds");
  const hours = time.hours() > 0 ? time.hours() : 0;
  const minutes = time.minutes() > 0 ? time.minutes() : 0;
  const seconds = time.seconds() > 0 ? time.seconds() : 0;

  return `${
    hours < 10 ? `0${hours}` : hours
  }:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

export const Date = {
  timeAsHourMinSec
};

export default Date;
