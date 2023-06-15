import Cookies from "js-cookie";

export const setCookie = (key: string, value: any, options: Cookies.CookieAttributes = {}) => {
  Cookies.set(key, JSON.stringify(value), options);
};

export const getCookie = (key: string) => {
  const cookie = Cookies.get(key);
  return cookie ? JSON.parse(cookie) : null;
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};
