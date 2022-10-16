import Navbar from "../../components/navbar";
import HomeHeader from "../../components/homeheader";
import DeviceCard from "../../components/devicecard";
import { useEffect, useState } from "react";
import { DeviceApiService } from "../../services/DeviceApiService";
import { Device } from "../../models/device/Device";
import { GetUserDevicesResponse } from "../../models/device/GetUserDevicesResponse";

export default function Index() {
  const API_URL: string = import.meta.env.API_URL;
  let svc = new DeviceApiService();
  let [devices, setDevices] = useState<Device[]>([]);

  if (localStorage.getItem("temperature") == null) {
    window.location.href = "/weather";
  }
  let temp = Math.round(
    parseInt(window.localStorage.getItem("temperature") || "")
  );

  // Get Devices Api Call
  const getDevices = async () => {
    svc.getUserDevices("lucy-connor", (response: GetUserDevicesResponse) => {
      let devices: any = [];
      response.data.forEach((device) => {
        device["DeviceUser"]["deviceData"] = JSON.parse(
          JSON.parse(device["DeviceUser"]["deviceData"])
        );
        devices.push(device);
      });
      setDevices(devices);
    });
  };

  useEffect(() => {
    getDevices();

    console.log(devices);
    return () => {};
  }, []);

  return (
    <div className="bg-[#F7F7F7] h-[100vh] z-0">
      <HomeHeader temp={temp} />
      <div className="h-[85vh] overflow-y-auto scrollbar-hidden">
        <div className="w-full h-[25vh] mi bg-gold-secondary"></div>
        <div className="p-3">
          <span className="text-2xl"> Smart Devices </span>
          <div className="grid gap-5 grid-cols-2 mt-5">
            {devices.map((device) => {
              return (
                <DeviceCard
                  key={device.DeviceUser.id}
                  device={device}
                  svc={svc}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
