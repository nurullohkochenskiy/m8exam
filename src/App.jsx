import "./styles/App.scss";
import { ContextProvider } from "./context/ContextProvider";
import Layout from "./Layout";

const App = () => {
  return (
    <ContextProvider>
      <Layout />
    </ContextProvider>
  );
};

export default App;
