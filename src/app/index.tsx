import Routes from "./routes";

import { Provider } from "react-redux";
import { store } from "./store";

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};
