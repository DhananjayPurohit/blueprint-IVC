import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./src/Dashboard";
import Doc from "./src/Doc";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/doc">
          <Doc />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
