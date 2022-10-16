import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faGear } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function BackHeader() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-between items-start p-3 h-[8vh]">
      <a href="#" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 m-3" />
      </a>
      <FontAwesomeIcon icon={faGear} className="w-5 h-5 m-3" />
    </div>
  );
}
