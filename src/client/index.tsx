import Routes from "./routes";
import { AppProvider } from "./store";
import { ThemeToggle } from "./components";

export const Client: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
      <ThemeToggle />
    </AppProvider>
  );
};
