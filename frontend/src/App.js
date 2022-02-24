import "./App.css";
import Home from "./pages/Home";
import Workouts from "./pages/Workouts";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Camera from "./pages/Camera";
import Auth from "./components/Auth";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#42403D",
    },
    secondary: {
      main: "#f46101",
    },
    warning: {
      main: "#c25b23",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/trening-wyciskanie"
              component={() => <Camera exercise={"shoulderPress"} />}
            />
            <Route
              exact
              path="/trening-biceps"
              component={() => <Camera exercise={"curls"} />}
            />
            <Route
              exact
              path="/trening-wznosy"
              component={() => <Camera exercise={"lateralRise"} />}
            />
            <Route
              exact
              path="/trening-triceps"
              component={() => <Camera exercise={"tricepKickback"} />}
            />
            <Route
              exact
              path="/trening-wioslowanie"
              component={() => <Camera exercise={"dumbbellRow"} />}
            />
            <Route exact path="/treningi" component={Workouts} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/" component={Home} />
            <Redirect exact from="" to="/" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
