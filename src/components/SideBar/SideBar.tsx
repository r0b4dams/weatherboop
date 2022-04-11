import "./SideBar.css";
import React from "react";
import { SideBarProps } from "../../@types/props";

const SideBar: React.FC<SideBarProps> = ({ lng, lat, zoom }): JSX.Element => {
  return (
    <div className="sidebar">
      <div>
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
    </div>
  );
};

export default SideBar;
