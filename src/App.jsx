import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  const [siparis, setSiparis] = useState(null);
  const [axiosYaniti, setAxiosYaniti] = useState(null);

  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route
        path="/order"
        render={() => (
          <OrderPage setSiparis={setSiparis} setAxiosYaniti={setAxiosYaniti} />
        )}
      />
      <Route
        path="/confirmation"
        render={() => (
          <ConfirmationPage siparis={siparis} axiosYaniti={axiosYaniti} />
        )}
      />
    </Switch>
  );
}

export default App;