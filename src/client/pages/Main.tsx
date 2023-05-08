import { useAppContext } from "../Context";

const Main = () => {
  const { name, setName } = useAppContext();

  return (
    <div>
      <h1>Hi{name ? `, ${name}!` : ""}</h1>
      <input placeholder={"Enter your name"} onChange={(e) => setName(e.currentTarget.value)} />
    </div>
  );
};

export default Main;
