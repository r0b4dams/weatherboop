import { useAppContext } from "../../store";

export const Sidebar: React.FC = () => {
  const { state } = useAppContext();

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
      Latitude: {state.lat} | Longitude: {state.lng} | Zoom: {state.zoom}
    </div>
  );
};
