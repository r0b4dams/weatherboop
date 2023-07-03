import { useAppSelector } from "../../store/hooks";
import { selectMap } from "../../store/map/selectors";

import "./sidebar.css";

export const Sidebar: React.FC = () => {
  const { lat, lon, zoom } = useAppSelector(selectMap);

  return (
    <div className="sidebar">
      Latitude: {lat} | Longitude: {lon} | Zoom: {zoom}
    </div>
  );
};
