export const Sidebar: React.FC = () => {
  const lat = 9;
  const lon = 9;
  const zoom = 99;
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
