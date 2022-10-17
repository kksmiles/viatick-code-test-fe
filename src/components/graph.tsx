import { useEffect, useState } from "react";
import { DeviceUserHistory } from "../models/device/DeviceUserHistory";
import { GetUserDeviceHistoriesResponse } from "../models/device/GetUserDeviceHistoriesResponse";
import { DeviceApiService } from "../services/DeviceApiService";

interface IGraphProps {
  deviceUserIds: any;
  svc: DeviceApiService;
}

export default function Graph({ deviceUserIds, svc }: IGraphProps) {
  const [deviceUserHistories, setDeviceUserHistories] = useState<
    DeviceUserHistory[]
  >([]);
  const [hourlyEnergyUsage, setHourlyEnergyUsage] = useState<number[]>([]);
  const [todayEnergyUsage, setTodayEnergyUsage] = useState<number>(0);
  const start = new Date().setHours(0, 0, 0, 0);
  const end = new Date().setHours(23, 59, 59, 999);

  const getHourlyRanges = (start: number, end: number) => {
    let ranges = [];
    let current = start;
    while (current <= end) {
      ranges.push(current);
      current += 3600000;
    }
    return ranges;
  };

  let ranges = getHourlyRanges(start, end);
  const fetchHourlyEnergyUsage = () => {
    setHourlyEnergyUsage([]);
    setTodayEnergyUsage(0);
    let takenIds: number[] = [];
    ranges.forEach((range) => {
      let hourlyHistory = deviceUserHistories.filter((history) => {
        return (
          new Date(history.takenAt).getTime() >= range &&
          new Date(history.takenAt).getTime() < range + 3600000
        );
      });
      let hourlyEnergyUsageSum = hourlyHistory.reduce((a, b) => {
        if (!takenIds.includes(b.id)) {
          takenIds.push(b.id);
          setTodayEnergyUsage((prev) => prev + b.usage);
          return a + b.usage;
        }
        return a;
      }, 0);
      setHourlyEnergyUsage((prev) => [...prev, hourlyEnergyUsageSum]);
    });
  };

  const fetchDeviceUserHistories = () => {
    setDeviceUserHistories([]);
    deviceUserIds.forEach((deviceUserId: any) => {
      svc.getDeviceUserHistories(
        deviceUserId,
        new Date(new Date().setHours(0, 0, 0, 0)),
        new Date(new Date().setHours(23, 59, 59, 999)),
        (response: GetUserDeviceHistoriesResponse) => {
          response.data.forEach((history) => {
            setDeviceUserHistories((prev) => [...prev, history]);
          });
        }
      );
    });
  };

  const heightReturner = (percentage: number) => {
    return `h-[${percentage}%]`;
  };

  useEffect(() => {
    fetchHourlyEnergyUsage();
    return () => {};
  }, [deviceUserHistories]);

  useEffect(() => {
    fetchDeviceUserHistories();
    return () => {};
  }, [deviceUserIds]);

  return (
    <div className=" bg-[#E0D5CA] h-full p-5">
      <span className="font-bold text-sm">Usage today</span>
      <span className="bg-black text-sm font-bold text-white px-4 py-2 rounded-full ml-2">
        {todayEnergyUsage}kw
      </span>
      <div className="overflow-y-auto h-[85%] mt-3">
        <div className="w-[96rem] h-full flex flex-row justify-between">
          {ranges.map((range, index) => {
            let hours = new Date(range).getHours();
            let maxUsage = Math.max(...hourlyEnergyUsage, 40);
            let usage = hourlyEnergyUsage[index];
            let height = Math.round((usage / maxUsage) * 100);
            let heightStr = height + "%";
            return (
              <div key={index} className="grid grid-cols-24 grid-rows-5 w-full">
                <div className="row-span-4 flex flex-col items-center justify-end mb-4 mt-5">
                  <div className="flex flex-row justify-between gap-3 h-full">
                    <div className="flex flex-col justify-end">
                      <div
                        className={
                          "rounded-full w-4 row-span-4 " +
                          (index % 2 ? "bg-[#C59350]" : "bg-black")
                        }
                        style={{ height: heightStr }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-xs font-bold text-black text-center row-span-1">
                  {hours % 12 ? hours % 12 : 12} {hours >= 12 ? "pm" : "am"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
