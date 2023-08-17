import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ color: "black" }}>
      <h1>Main</h1>
      <Link to="/map">go to map</Link>
    </div>
  );
}
