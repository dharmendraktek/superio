const isClient = typeof window !== 'undefined';

console.log("------------is client ", isClient);
export const getLocalStorage = (key) => {
  if (isClient) {
    return window.localStorage.getItem(key);
  }
  return null;
};

export const setLocalStorage = (key, value) => {
  if (isClient) {
    window.localStorage.setItem(key, value);
  }
};

export const removeLocalStorage = (key) => {
  if (isClient) {
    window.localStorage.removeItem(key);
  }
};
