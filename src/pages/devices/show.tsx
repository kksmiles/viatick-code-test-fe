import { useParams } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../components/navbar";
import BackHeader from "../../components/backheader";
import StatusCard from "../../components/statuscard";
import { useEffect } from "react";
import {
  CircularInput,
  CircularTrack,
  CircularProgress,
} from "react-circular-input";
import { DeviceApiService } from "../../services/DeviceApiService";
import { useLocation } from "react-router-dom";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Show() {
  let svc = new DeviceApiService();
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/devices";
  }
  const { device } = location.state;
  const { deviceSlug } = useParams();
  const min = 0.13;
  const max = 0.86;
  const minTemp = 6;
  const maxTemp = 34;

  // if (window.performance) {
  //   let navigationEntry: any = performance.getEntriesByType("navigation")[0];
  //   if (navigationEntry.type == "reload") {
  //     window.location.href = "/devices";
  //   }
  // }

  const [isOn, setIsOn] = useState(device.DeviceUser.deviceData.on);
  const handleToggle = () => {
    setIsOn(!isOn);
    device.DeviceUser.deviceData.on = !isOn;
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  const convertToPercentage = (v: any) => {
    return (v - minTemp) / (maxTemp - minTemp);
  };

  const convertToValue = (p: any) => {
    return Math.round((maxTemp - minTemp) * p + minTemp);
  };

  const valueWithinLimits = (v: any) => Math.min(Math.max(v, min), max);
  const [value, setValue] = useState(
    convertToPercentage(device.DeviceUser.deviceData.temperature)
  );
  const onChange = (p: any) => {
    setValue(valueWithinLimits(p));
    let v = convertToValue(value);
    device.DeviceUser.deviceData.temperature = v;
  };

  const onChangeEnd = (p: any) => {
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  useEffect(() => {
    document.title = "Viatick - " + device.name;
    return () => {};
  }, []);

  return (
    <div className="bg-[#F7F7F7] h-[100vh] z-0">
      <BackHeader />
      <div className="rounded-full w-4/5 bg-white h-12 mx-auto flex flex-col-2">
        <div className="w-1/2 bg-black text-white font-bold flex items-center justify-center h-full rounded-full text-center">
          Control
        </div>
        <div className="w-1/2 flex items-center font-bold justify-center h-full rounded-full text-center">
          Statistic
        </div>
      </div>
      <div className="h-[85vh] overflow-y-auto scrollbar-hidden">
        {device.slug == "air-conditioner" && (
          <div className="flex justify-center items-center p-12 mt-24">
            <div className="border-r-gray-200 border-b-gray-200 border-l-red-200 border-t-transparent border-dashed border-8 border-black p-5 rounded-full relative flex justify-center items-center">
              <span className="absolute left-0 top-6 text-gray-500">30</span>
              <span className="absolute -bottom-10 text-gray-500">25</span>
              <span className="absolute right-0 top-6 text-gray-500">10</span>
              <span
                className="absolute p-2 cursor-pointer"
                onClick={handleToggle}
              >
                <FontAwesomeIcon
                  icon={faPowerOff}
                  className={`"w-16 h-16 ${
                    isOn ? "text-cyan-800" : "text-red-800"
                  }`}
                />
              </span>
              <CircularInput
                radius={120}
                value={value}
                onChange={(v) => onChange(v)}
                onChangeEnd={(v) => onChangeEnd(v)}
              >
                <CircularTrack stroke="#ebebeb" />
                <CircularProgress stroke="#c6c6c6" />
              </CircularInput>
            </div>
          </div>
        )}

        <div className="p-3">
          <div className="grid gap-5 grid-cols-2 mt-5">
            {Object.keys(device.DeviceUser.deviceData).map((key, index) => {
              if (key != "on") {
                return (
                  <StatusCard
                    key={index}
                    label={key}
                    value={
                      device.DeviceUser.deviceData[key] +
                      (key == "temperature" ? "°" : "") +
                      (key == "humidity" ? "%" : "")
                    }
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
