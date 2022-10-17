import Navbar from "../../components/navbar";
import HomeHeader from "../../components/homeheader";
import DeviceCard from "../../components/devicecard";
import { useEffect, useState } from "react";
import { DeviceApiService } from "../../services/DeviceApiService";
import { Device } from "../../models/device/Device";
import { GetUserDevicesResponse } from "../../models/device/GetUserDevicesResponse";
import Graph from "../../components/graph";

export default function Index() {
  let svc = new DeviceApiService();
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceUserIds, setDeviceUserIds] = useState([]);
  const [deviceCount, setDeviceCount] = useState(0);
  const [temp, setTemp] = useState(0);

  if (localStorage.getItem("temperature") == null) {
    window.location.href = "/weather";
  }

  // Get Devices Api Call
  const getDevices = async () => {
    svc.getUserDevices("lucy-connor", (response: GetUserDevicesResponse) => {
      let devices: any = [];
      let deviceUserIds: any = [];
      response.data.forEach((device) => {
        device["DeviceUser"]["deviceData"] = JSON.parse(
          JSON.parse(device["DeviceUser"]["deviceData"])
        );
        if (device["DeviceUser"]["deviceData"]["on"] == true) {
          setDeviceCount(deviceCount + 1);
        }
        deviceUserIds.push(device["DeviceUser"]["id"]);
        devices.push(device);
      });
      setDeviceUserIds(deviceUserIds);
      setDevices(devices);
    });
  };

  useEffect(() => {
    document.title = "Viatick - Devices";
    getDevices();
    setTemp(
      Math.round(parseInt(window.localStorage.getItem("temperature") || ""))
    );
    return () => {};
  }, []);

  return (
    <div className="bg-[#F7F7F7] h-[100vh] z-0">
      <HomeHeader temp={temp} deviceCount={deviceCount} />
      <div className="h-[85vh] overflow-y-auto scrollbar-hidden">
        <div className="w-full h-[30vh]">
          <Graph deviceUserIds={deviceUserIds} svc={svc} />
        </div>
        <div className="p-3">
          <span className="text-2xl"> Smart Devices </span>
          <div className="grid gap-5 grid-cols-2 mt-5">
            {devices.map((device) => {
              return (
                <DeviceCard
                  key={device.DeviceUser.id}
                  device={device}
                  svc={svc}
                  setDeviceCount={setDeviceCount}
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
