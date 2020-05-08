import IWeatherApi from './IWeatherApi';
import moment from 'moment';
const BASE_URL = 'https://api.climacell.co/v3/weather/';

const WEATHER_CODE_LOOKUP = new Map<string, string>();
WEATHER_CODE_LOOKUP.set("freezing_rain_heavy", "Heavy Freezing Rain");
WEATHER_CODE_LOOKUP.set("freezing_rain", "Freezing Rain");
WEATHER_CODE_LOOKUP.set("freezing_rain_light", "Light Freezing Rain");
WEATHER_CODE_LOOKUP.set("freezing_drizzle", "Freezing Drizzle");
WEATHER_CODE_LOOKUP.set("ice_pellets_heavy", "Heavy Ice");
WEATHER_CODE_LOOKUP.set("ice_pellets", "Ice");
WEATHER_CODE_LOOKUP.set("ice_pellets_light", "Light Ice");
WEATHER_CODE_LOOKUP.set("snow_heavy", "Heavy Snow");
WEATHER_CODE_LOOKUP.set("snow", "Snow");
WEATHER_CODE_LOOKUP.set("snow_light", "Light Snow");
WEATHER_CODE_LOOKUP.set("flurries", "Flurries");
WEATHER_CODE_LOOKUP.set("tstorm", "Thunderstorm");
WEATHER_CODE_LOOKUP.set("rain_heavy", "Heavy Rain");
WEATHER_CODE_LOOKUP.set("rain", "Rain");
WEATHER_CODE_LOOKUP.set("rain_light", "Light Rain");
WEATHER_CODE_LOOKUP.set("drizzle", "Drizzle");
WEATHER_CODE_LOOKUP.set("fog_light", "Light Fog");
WEATHER_CODE_LOOKUP.set("fog", "Fog");
WEATHER_CODE_LOOKUP.set("cloudy", "Cloudy");
WEATHER_CODE_LOOKUP.set("mostly_cloudy", "Mostly Cloudy");
WEATHER_CODE_LOOKUP.set("partly_cloudy", "Partly Cloudy");
WEATHER_CODE_LOOKUP.set("mostly_clear", "Mostly Clear");
WEATHER_CODE_LOOKUP.set("clear", "Clear");

const getWeatherDescription = (weatherCode : string) => {
  return WEATHER_CODE_LOOKUP.has(weatherCode) ? 
    WEATHER_CODE_LOOKUP.get(weatherCode) :
    "Unknown"; // This happening is probably really bad. 
};

const convertTimestampToDisplayTime = (timestamp : string) => {
  const display = moment(timestamp).format('LT'); 
  return display;
};

const convertTimestampToDisplayDate = (timestamp: string) => {
  const display = moment(timestamp).format('MMM Do');
  return display;
};

export default class ClimacellWeatherApi implements IWeatherApi {
  constructor(private token: string) {}
  
  getCurrentWeather(lat : number, lon : number) {
    const url = BASE_URL + 'realtime?' +
      'lat=' + lat +
      '&unit_system=us' + 
      '&lon='+ lon +
      '&fields=feels_like,temp,weather_code' + 
      '&apikey=' + this.token;
    return fetch(url) 
      .then((response) => response.json())
      .then((data) => {
        let description = getWeatherDescription(data.weather_code.value);
        return {
          description,
          temp: Math.round(data.temp.value),
          feelsLike: Math.round(data.feels_like.value),
        }
      })
  }

  getTodaysWeather(lat: number, lon: number) {
    const url = `${ BASE_URL }forecast/daily?lat=${lat}&unit_system=us&start_time=now&lon=${lon}&fields=temp&apikey=${this.token}`;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return {
          highTemp: Math.round(data[0].temp[1].max.value),
          lowTemp: Math.round(data[0].temp[0].min.value),
        }
      });
  }

  getNext24HourData(lat: number, lon: number) {
    const endTime = moment().add(24, 'hours').toISOString();
    const url = BASE_URL + 'forecast/hourly?' +
      'lat=' + lat +
      '&unit_system=us' +
      '&end_time=' + endTime +
      '&lon='+ lon +
      '&fields=temp,weather_code' + 
      '&apikey=' + this.token;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.map((item : any) => {
          return {
            temp: Math.round(item.temp.value),
            description: getWeatherDescription(item.weather_code.value),
            time: convertTimestampToDisplayTime(item.observation_time.value)
          }
        });
      });
  }

  getNextWeekData(lat: number, lon: number) { 
    const weekFromNow = moment().add(7, 'days').toISOString();
    const url = BASE_URL + 'forecast/daily?' + 
    'lat=' + lat + 
    '&unit_system=us' +
    '&start_time=now' +
    '&end_time=' + weekFromNow +
    '&lon=' + lon + 
    '&fields=temp,weather_code&apikey=' + this.token;
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        return data.map((item : any) => { 
          return {
            highTemp: Math.round(item.temp[1].max.value),
            lowTemp: Math.round(item.temp[0].min.value),
            date: convertTimestampToDisplayDate(item.observation_time.value),
            description: getWeatherDescription(item.weather_code.value)
          }
        });
      });
  }
}