const isSSR = typeof window === 'undefined';

export const setLocalStorage = <T>(key: string, value: T | null): void => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (isSSR) return defaultValue;

  try {
    const item = window?.localStorage.getItem(key);
    if (typeof item === 'undefined' || item === null) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.log(error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export function clearLocalStorage(): void {
  window.localStorage.clear();
}
