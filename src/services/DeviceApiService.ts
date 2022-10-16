import axios from "axios";
import { GetUserDevicesResponse } from "../models/device/GetUserDevicesResponse";

const API_URL: string = import.meta.env.VITE_API_URL;

export class DeviceApiService {
  getUserDevices(
    userSlug: string,
    callback: (getUserDevicesResponse: GetUserDevicesResponse) => any
  ) {
    let GET_USER_DEVICES_URL: string = `${API_URL}/api/device_users/${userSlug}/devices`;

    axios
      .get(GET_USER_DEVICES_URL, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response: any) => {
        let getUserDevicesResponse = new GetUserDevicesResponse(response.data);
        callback(getUserDevicesResponse);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  updateDeviceData(deviceId: number, deviceData: any) {
    let STORE_DEVICE_DATA_URL: string = `${API_URL}/api/device_users`;

    axios
      .post(STORE_DEVICE_DATA_URL, {
        UserId: 1,
        DeviceId: deviceId,
        deviceData: deviceData,
      })
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
