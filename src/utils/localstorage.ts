export const appLocalStorage = {
  get: (key: string): string => {
    return localStorage.getItem(key) || '';
  },
  set: (key: string, value: string) => {
    localStorage.setItem(key, value);
  },
  remove: (key: string) => {
    localStorage.removeItem(key);
  },
};
