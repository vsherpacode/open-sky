import IWeatherApi from './IWeatherApi';


export default class MockWeatherApi implements IWeatherApi {

  constructor() {}

  
  getCurrentWeather(lat : number, lon : number) {
    return Promise.resolve({
      temp: 78,
      feelsLike: 52,
      description: 'Clear'
    });
  }
 
  getTodaysWeather(lat : number, lon : number) {
    return Promise.resolve({
      highTemp: 90,
      lowTemp: 72,
      description: 'test',
      date: 'Test Date'
    });
  }

  getNext24HourData(lat: number, lon: number) {
    return Promise.resolve(
      [{
        description: 'test',
        temp: 50,
        time: '11:00 AM'
      }]
    );
  }

  getNextWeekData(lat: number, lon: number) { 
    return Promise.resolve([
      {
        highTemp: 85,
        lowTemp: 72,
        date: '12/31',
        description: 'Cloudy with a chance of meatballs'
      }
    ]);
  }
}