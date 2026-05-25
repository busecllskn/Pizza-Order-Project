import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";
import ConfirmationPage from "./pages/ConfirmationPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} /> 
      <Route path="/order" component={OrderPage} />
      <Route path="/confirmation" component={ConfirmationPage} />
    </Switch>
  );
};

export default App;