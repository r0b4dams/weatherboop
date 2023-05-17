import { useAppContext } from "../context/AppContext";

export const Main: React.FC = () => {
  const { name, setName } = useAppContext();

  return (
    <div>
      <h1>Main</h1>

      <h1>Hi{name ? `, ${name}!` : ""}</h1>
      <input placeholder={"Enter your name"} onChange={(e) => setName(e.currentTarget.value)} />
    </div>
  );
};

export default Main;
