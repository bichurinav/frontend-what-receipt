export function debounce(func: Function, timeout: number = 300): Function {
  let timer: number | null | undefined | NodeJS.Timeout = null;
  return (...args: string[]) => {
    clearTimeout(timer as number);
    timer = setTimeout(() => {
      func.apply(null, [...args]);
    }, timeout);
  };
}

export function decodeToBase64(str: string): string {
  if (!str || typeof str !== "string") {
    throw new Error("Вставьте строку!");
  }
  return btoa(unescape(encodeURIComponent(str)));
}
