export const convertToFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const convertToCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const getShortDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const dayNames: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIndex: number = date.getDay();
  return dayNames[dayIndex];
};

export const loadDynamicImage = async (iconId: number) => {
  try {
    const weatherIconModule = await import(
      `../assets/weatherIcons/${iconId}.svg`
    );
    return weatherIconModule.default;
  } catch (error) {
    console.error("Error loading weather icon:", error);
  }
};

export const debounce = (func: Function, delay: number) => {
  let timer: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};
