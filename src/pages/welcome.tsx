import logo from "/images/logo/logo-border.png";
import Swipable from "./swipable";
import { useEffect, useState } from "react";

export default function Welcome() {
  const [startAnimation, setStartAnimation] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setStartAnimation(true);
    }, 100);
  }, []);
  return (
    <div
      className={`h-screen text-center bg-[url('/images/background/welcome.jpg')] bg-cover ${
        startAnimation ? "translate-y-[0vh]" : "translate-y-[-100vh]"
      } transition ease-in-out duration-700`}
    >
      <div className="w-full h-full backdrop-blur-sm">
        <div className="h-full flex flex-col justify-between items-center py-16">
          <div className="text-xl text-white uppercase tracking-widest align-baseline drop-shadow-xl">
            <span> Jerovis </span>
            <img src={logo} className="inline invert w-10 h-10 mb-3" alt="" />
            <span className="text-xs absolute ml-3"> 大厦 </span>
            <span> Mansion </span>
          </div>
          <Swipable isVertical={true} url="/weather" />
        </div>
      </div>
    </div>
  );
}
