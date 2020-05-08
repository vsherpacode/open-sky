interface CurrentWeatherData {
  temp: number,
  feelsLike: number,
  description?: string
}

interface DailyWeatherData {
  highTemp: number,
  lowTemp: number,
  date?: string,
  description?: string
}

interface HourlyData {
  time: string,
  temp: number,
  description: string
}


export { CurrentWeatherData, DailyWeatherData, HourlyData };

export default interface IWeatherApi {
  getCurrentWeather(lat: number, lon: number) : Promise<CurrentWeatherData>;
  getTodaysWeather(lat: number, lon: number): Promise<DailyWeatherData>;
  getNext24HourData(lat: number, lon: number) : Promise<HourlyData[]>;
  getNextWeekData(lat: number, lon: number) : Promise<DailyWeatherData[]>;
};