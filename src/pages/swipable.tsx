import { useNavigate } from "react-router-dom";
import TripleChevron from "/icons/triple-chevron-icon.svg";
import { useState } from "react";

interface ISwipableProps {
  isVertical: boolean;
  url: string;
}

export default function Swipable({ isVertical, url }: ISwipableProps) {
  const isMobile =
    navigator.userAgent.match(
      "Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|WPDesktop"
    ) != null;

  const navigate = useNavigate();
  // Swipe Left/Right
  const [mouseDown, setMouseDown] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const swipableHeight = Math.min(screen.height / 2, 300);
  const minSwipeDistance = 70;

  const onMouseDown = (e: any) => {
    if (e.clientY > swipableHeight) {
      setTouchEnd(null);
      setTouchStart(isVertical ? e.clientY : e.clientX);
      setMouseDown(true);
    }
  };
  const onMouseMove = (e: any) => {
    if (mouseDown) setTouchEnd(isVertical ? e.clientY : e.clientX);
  };

  const onTouchStart = (e: any) => {
    if (e.targetTouches[0].clientY > swipableHeight) {
      setTouchEnd(null);
      setTouchStart(
        isVertical ? e.targetTouches[0].clientY : e.targetTouches[0].clientX
      );
    }
  };

  const onTouchMove = (e: any) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = Math.abs(touchStart - touchEnd);
    const isSwipe = distance > minSwipeDistance;
    console.log(distance);
    if (isSwipe) navigate(url);
  };
  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onTouchEnd}
      onMouseLeave={onTouchEnd}
      className="w-full h-[40vh] flex flex-col align-bottom justify-end items-center"
    >
      <div
        className="cursor-pointer"
        onClick={() => (!isMobile ? navigate(url) : null)}
      >
        <img
          src={TripleChevron}
          className={`w-20 h-20 inline invert select-none pointer-events-none ${
            isVertical ? "-rotate-90" : "animate-bounce"
          }`}
          alt="Swipe up to continue"
        />
      </div>
    </div>
  );
}
