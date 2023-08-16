import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div>
      <h1>Main</h1>
      <Link to="/map">go to map</Link>
    </div>
  );
};

export default Main;
