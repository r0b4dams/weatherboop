import { useAppSelector } from "../../store/hooks";
import { selectMap } from "../../store/map/selectors";

export const Sidebar: React.FC = () => {
  const { lat, lon, zoom } = useAppSelector(selectMap);

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "black",
        opacity: 0.75,
        color: "#fff",
        padding: "6px 12px",
        zIndex: 1,
        top: 0,
        left: 0,
        margin: "12px",
        borderRadius: "4px",
      }}
    >
      Latitude: {lat} | Longitude: {lon} | Zoom: {zoom}
    </div>
  );
};
