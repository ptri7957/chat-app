import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import store from "./store";
import { Provider } from "react-redux";
import Login from "./components/Pages/Login";
import Register from "./components/Pages/Register";
import { loadUser } from "./actions/auth";
import setToken from "./utils/setToken";
import NavBar from "./components/Layout/NavBar";
import PrivateRoute from "./components/Routing/PrivateRoute";
import MainPage from "./components/Pages/MainPage";

function App() {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  useEffect(() => {
    store.dispatch(loadUser());
  });
  return (
    <Provider store={store}>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/main" component={MainPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
