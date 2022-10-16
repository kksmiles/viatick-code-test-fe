import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAstronaut,
  faThermometer,
} from "@fortawesome/free-solid-svg-icons";
import UserProfilePicture from "/images/user-avatar.jpg";
import { Link } from "react-router-dom";

interface IHomeHeaderProps {
  temp: any;
}

export default function HomeHeader({ temp }: IHomeHeaderProps) {
  return (
    <div className="flex flex-row justify-between items-start p-3 bg-white h-[8vh]">
      <div className="grid grid-rows-2 grid-cols-5 gap-x-5">
        <img
          className="w-12 h-12 rounded-full row-span-2"
          src={UserProfilePicture}
          alt="User Profile Picture"
        />
        <div className="col-span-4">
          Hi, <b>Lucy Connor</b>
        </div>
        <div className="col-span-4">25 device on</div>
      </div>
      <Link to={"/weather"}>
        <div className="my-auto bg-green-quaternary text-green-tertiary py-2 px-3 rounded-full font-bold">
          <FontAwesomeIcon icon={faThermometer} />
          <span className="ml-2">{temp} °C</span>
        </div>
      </Link>
    </div>
  );
}
