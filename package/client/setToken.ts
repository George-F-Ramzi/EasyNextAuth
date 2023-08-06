import { setCookie } from "cookies-next";

interface Prop {
  token: string;
  date: string;
}

export default function setToken({ date, token }: Prop) {
  const setDate = (value: string) => {
    let match = value.match(/(\d+)/);
    let number = Number(match![0]);
    let isMinutes = false;
    let isHours = false;

    if (value.includes("h")) isHours = true;
    if (value.includes("m")) isMinutes = true;

    const date = new Date();

    if (isMinutes) {
      date.setTime(date.getTime() + number * 60 * 1000);
      date.toUTCString();
      return date;
    }

    if (isHours) {
      date.setTime(date.getTime() + number * 60 * 60 * 1000);
      date.toUTCString();
      return date;
    }

    date.setTime(date.getTime() + number * 24 * 60 * 60 * 1000);
    date.toUTCString();
    return date;
  };

  setCookie("easy-next-token", token, { expires: setDate(date) });
  return;
}
