import { Coord } from "./Coord";
import { Weather } from "./Weather";

export class CurrentWeatherResponse {
  coord: Coord;
  weather: Weather[];
  base: String;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;

  constructor(userResponse: any) {
    this.coord = userResponse.coord;
    this.weather = userResponse.weather;
    this.base = userResponse.base;
    this.main = userResponse.main;
    this.visibility = userResponse.visibility;
    this.wind = userResponse.wind;
    this.clouds = userResponse.clouds;
    this.dt = userResponse.dt;
    this.sys = userResponse.sys;
    this.timezone = userResponse.timezone;
    this.id = userResponse.id;
    this.name = userResponse.name;
    this.cod = userResponse.cod;
  }
}
