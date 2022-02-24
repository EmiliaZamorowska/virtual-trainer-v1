import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import WorkoutNav from "./WorkoutNav";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import Stack from "@material-ui/core/Stack";

function NavMenu() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [workoutB, changeWorkoutB] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div>
      <div className="nav">
        <div>
          <ul>
            <li
              className="mainLi"
              onClick={() => {
                changeWorkoutB(false);
              }}
            >
              <Link to="/">STRONA GŁÓWNA</Link>
            </li>
            <li
              className="mainLi"
              onClick={() => {
                changeWorkoutB(!workoutB);
              }}
            >
              TRENING NA ŻYWO
            </li>
            <li
              className="mainLi"
              onClick={() => {
                changeWorkoutB(false);
              }}
            >
              <Link to="/treningi">DZIENNIK</Link>
            </li>
          </ul>
        </div>
        {user ? (
          <div id="userPanel">
            <Stack
              direction={{ xs: "column", sm: "row", md: "row", lg: "row" }}
            >
              <p style={{ fontSize: "1.3em" }} id="userName">
                {user.result.name}
              </p>
              <Button
                className="signButton"
                color="warning"
                variant="contained"
                size="large"
                style={{
                  fontWeight: "bold",
                  minWidth: "fit-content",
                  marginLeft: "5%",
                }}
                onClick={logout}
              >
                Wyloguj się
              </Button>
            </Stack>
          </div>
        ) : (
          <div className="signButton" id="login">
            <Link to="/login">
              <Button
                color="warning"
                variant="contained"
                type="button"
                size="large"
              >
                Zaloguj się
              </Button>
            </Link>
          </div>
        )}
      </div>
      {workoutB === true ? <WorkoutNav /> : ""}
    </div>
  );
}

export default NavMenu;
