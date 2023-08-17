import Routes from "./routes";
import { AppProvider } from "./store";

export const Client: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};
