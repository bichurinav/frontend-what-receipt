export function debounce(func: Function, timeout: number = 300): Function {
  let timer: number | null | undefined | NodeJS.Timeout = null;
  return (...args: string[]) => {
    clearTimeout(timer as number);
    timer = setTimeout(() => {
      func.apply(null, [...args]);
    }, timeout);
  };
}
