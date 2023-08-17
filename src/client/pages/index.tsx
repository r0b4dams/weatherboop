import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Main</h1>
      <Link to="/map">go to map</Link>
    </div>
  );
}
