interface Props {
  data: IWeather;
}

export const Weather: React.FC<Props> = ({ data }) => {
  return (
    data && (
      <aside
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
        <h1>{data.name}</h1>
        <p>{new Date(1000 * data.dt).toLocaleString()}</p>

        {data.weather.map((w) => {
          return (
            <div key={w.id} style={{ display: "flex", alignItems: "center" }}>
              <img src={`https://openweathermap.org/img/wn/${w.icon}.png`} />
              <p>{w.description}</p>
            </div>
          );
        })}

        <p>{`temp: ${data.main.temp}`}</p>
        <p>{`temp_min: ${data.main.temp_min}`}</p>
        <p>{`temp_max: ${data.main.temp_max}`}</p>
        <p>{`pressure: ${data.main.pressure}`}</p>
        <p>{`humidity: ${data.main.humidity}`}</p>
      </aside>
    )
  );
};
