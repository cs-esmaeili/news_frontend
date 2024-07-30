import React from "react";
import MiniProfile from "./MiniProfile";
import { FaBell } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";

const Header = ({ open, setOpen }) => {
  return (
    <div className="flex justify-between items-center p-2">
      <RiMenu3Line
        className="mr-3 text-2xl lg:hidden"
        onClick={() => setOpen(!open)}
      />

      <div className="flex items-center justify-center gap-2  ml-auto">
        <MdSunny className="text-2xl" />
        <FaBell className=" text-2xl" />
        <MiniProfile sliderIsOpen={open} />
      </div>
    </div>
  );
};

export default Header;
