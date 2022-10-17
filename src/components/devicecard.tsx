import { useState } from "react";
import { DeviceApiService } from "../services/DeviceApiService";
import { Link } from "react-router-dom";

interface IDeviceCardProps {
  device: any;
  svc: DeviceApiService;
  setDeviceCount: any;
}

export default function DeviceCard({
  device,
  svc,
  setDeviceCount,
}: IDeviceCardProps) {
  const [isOn, setIsOn] = useState(device.DeviceUser.deviceData.on);

  const handleToggle = () => {
    setIsOn(!isOn);
    device.DeviceUser.deviceData.on = !isOn;
    setDeviceCount((prev: any) => prev + (isOn ? -1 : 1));
    svc.updateDeviceData(device.id, device.DeviceUser.deviceData);
  };

  return (
    <div
      className={
        "w-full h-72 rounded-3xl p-5 flex flex-col justify-between " +
        (isOn ? "bg-black text-white" : "bg-white text-black")
      }
    >
      <Link
        to={`/devices/${device.slug}-${device.DeviceUser.id}`}
        className="h-4/6"
        state={{ device: device }}
      >
        <img
          className={"h-12 w-12 " + (isOn ? "invert" : "")}
          src={`/images/${device.icon}`}
        ></img>
      </Link>
      <div className="flex flex-row justify-between">
        <div className="w-1/2 h-12"> {device.name} </div>
        <div className="w-1/2 text-right">
          <label
            htmlFor={`"small-toggle-${device.DeviceUser.id}"`}
            className="inline-flex relative items-center cursor-pointer -rotate-90"
          >
            <input
              type="checkbox"
              id={`"small-toggle-${device.DeviceUser.id}"`}
              className="sr-only peer"
              onChange={() => {
                handleToggle();
              }}
              defaultChecked={isOn}
            />
            <div className="w-12 h-7 peer-focus:outline-none rounded-full peer dark:bg-[#F7F7F7] peer-checked:after:translate-x-full peer-checked:after:bg-black peer-checked:after:border-[#F7F7F7] after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-[#EBEBEB] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-white "></div>
          </label>
        </div>
      </div>
    </div>
  );
}
