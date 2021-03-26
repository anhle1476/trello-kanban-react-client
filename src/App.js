import "./App.scss";
import { Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header.component";
import Login from "./pages/Login/Login.component";
import Register from "./pages/Register/Register.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
