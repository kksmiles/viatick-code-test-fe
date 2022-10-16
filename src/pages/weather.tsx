import { useEffect, useState } from "react";
import { CurrentWeatherResponse } from "../models/weather/CurrentWeatherResponse";
import { Coord } from "../models/weather/Coord";
import { WeatherApiService } from "../services/WeatherApiService";
import Swipable from "./swipable";
import { useNavigate } from "react-router-dom";

export default function Weather() {
  const navigate = useNavigate();
  // Api Call
  let svc = new WeatherApiService();
  let [currentWeatherResponse, setCurrentWeatherResponse] =
    useState<CurrentWeatherResponse>();

  // Get Device Location
  const getGeoLocation = () => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getCoordinates = async () => {
    if (navigator.geolocation) {
      const position: any = await getGeoLocation();
      return new Coord(
        position.coords.longitude ?? 103.8198,
        position.coords.latitude ?? 1.3521
      );
    } else {
      return new Coord(103.8198, 1.3521);
    }
  };

  // Weather Api Call
  const getCurrentWeather = async () => {
    const result = await getCoordinates();
    svc.getCurrentWeather(result, (response: CurrentWeatherResponse) => {
      checkCurrentTime(response.dt);
      setCurrentWeatherResponse(response);
      setIsLoading(false);
      window.localStorage.setItem("temperature", response.main.temp.toString());
    });
  };

  // Check if current time is morning, afternoon, night
  const checkCurrentTime = (seconds: any) => {
    const date = new Date(0);
    if (seconds) {
      date.setSeconds(seconds);
      var curHr = date.getHours();
    } else {
      var curHr = new Date().getHours();
    }
    if (curHr >= 6 && curHr < 12) {
      setTimeOfDay("morning");
    } else if (curHr >= 12 && curHr < 18) {
      setTimeOfDay("afternoon");
    } else {
      setTimeOfDay("night");
    }
  };

  const [startAnimation, setStartAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 100);
    checkCurrentTime(null);
    getCurrentWeather();
    return () => {};
  }, []);

  let [timeOfDay, setTimeOfDay] = useState<string>("welcome");

  return (
    <div
      className={`h-screen text-center ${
        startAnimation ? "translate-y-[0vh]" : "translate-y-[200vh]"
      } transition ease-in-out duration-700`}
    >
      <img
        className="h-full z-[-5] absolute top-0 left-0"
        src={`/images/background/${timeOfDay}.jpg`}
        alt="test"
      />
      <div className="w-full h-full backdrop-blur-sm">
        <div className="h-full flex flex-col justify-between items-center py-16">
          <div
            className="text-3xl text-white uppercase tracking-widest drop-shadow-xl"
            onClick={() => navigate("/welcome")}
          >
            <span> Welcome </span>
          </div>

          <div className="w-full grid grid-rows-3 mt-5 p-8 gap-y-4">
            <div className="text-2xl text-white drop-shadow-xl text-left">
              {isLoading ? (
                <div className="animate-pulse h-4 w-32 bg-slate-500 rounded"></div>
              ) : (
                <span>{currentWeatherResponse?.name}</span>
              )}
            </div>
            <div className="text-5xl text-white drop-shadow-xl text-left font-bold">
              {isLoading ? (
                <div className="animate-pulse h-12 w-48 bg-slate-500 rounded"></div>
              ) : (
                <span>
                  {currentWeatherResponse?.main.temp &&
                    currentWeatherResponse?.main.temp + "°C"}
                </span>
              )}
            </div>
            <div className="text-md text-white drop-shadow-xl text-left tracking-wide">
              {isLoading ? (
                <div className="animate-pulse h-4 w-24 bg-slate-500 rounded"></div>
              ) : (
                <span>
                  {currentWeatherResponse?.weather[0].main}
                  {currentWeatherResponse?.weather[0].icon && (
                    <img
                      src={`http://openweathermap.org/img/w/${currentWeatherResponse?.weather[0].icon}.png`}
                      className="inline ml-3 w-10 h-10"
                    />
                  )}
                </span>
              )}
            </div>
          </div>
          <Swipable isVertical={false} url="/devices" />
        </div>
      </div>
    </div>
  );
}
