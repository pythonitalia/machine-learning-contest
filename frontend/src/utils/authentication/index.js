import localforage from "localforage";

const KEY = "IS_AUTHENTICATED";

export const isAuthenticated = () => localforage.getItem(KEY);
export const setIsAuthenticated = value => localforage.setItem(KEY, value);
