import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faPlus,
  faChartSimple,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <section
      id="bottom-navigation"
      className="max-w-lg mx-auto block fixed inset-x-0 bottom-0 z-10 shadow bg-white pt-2 h-[7vh]"
    >
      <div id="tabs" className="flex justify-between">
        <Link
          to="/devices"
          className="w-full focus:text-green-primary hover:text-green-primary justify-center inline-block text-center pt-2 pb-1"
        >
          <FontAwesomeIcon className="text-2xl" icon={faHome} />
        </Link>
        <a className="w-full focus:text-green-primary hover:text-green-primary justify-center inline-block text-center pt-2 pb-1">
          <FontAwesomeIcon className="text-2xl" icon={faMagnifyingGlass} />
        </a>
        <a className="w-full text-white justify-center inline-block text-center pt-2 pb-1">
          <span className="bg-green-primary p-3 rounded-2xl">
            <FontAwesomeIcon className="text-lg" icon={faPlus} />
          </span>
        </a>
        <a className="w-full focus:text-green-primary hover:text-green-primary justify-center inline-block text-center pt-2 pb-1">
          <FontAwesomeIcon className="text-2xl" icon={faChartSimple} />
        </a>
        <a className="w-full focus:text-green-primary hover:text-green-primary justify-center inline-block text-center pt-2 pb-1">
          <span className="rounded-full p-2">
            <FontAwesomeIcon className="text-2xl" icon={faUserAstronaut} />
          </span>
        </a>
      </div>
    </section>
  );
}
