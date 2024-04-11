import "./App.css";
import Admin from "./pages/Admin";
import  {store}  from "./store";
import { Provider } from "react-redux";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Admin />
    </Provider>
  );
};

export default App;
