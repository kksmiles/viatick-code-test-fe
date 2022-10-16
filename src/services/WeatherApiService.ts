import axios from "axios";
import { Coord } from "../models/weather/Coord";
import { CurrentWeatherResponse } from "../models/weather/CurrentWeatherResponse";

const WEATHER_API_URL: string = import.meta.env.VITE_WEATHER_API_URL;
const API_KEY: string = import.meta.env.VITE_WEATHER_API_KEY;

export class WeatherApiService {
  getCurrentWeather(
    coord: Coord | undefined,
    callback: (currentWeatherResponse: CurrentWeatherResponse) => any
  ) {
    let CURRENT_WEATHER_URL: string = `${WEATHER_API_URL}?lat=${coord?.lat}&lon=${coord?.lon}&appid=${API_KEY}&units=metric`;

    axios
      .get(CURRENT_WEATHER_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response: any) => {
        let currentWeatherResponse = new CurrentWeatherResponse(response.data);
        callback(currentWeatherResponse);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
