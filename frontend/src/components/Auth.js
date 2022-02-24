import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signin, signup } from "../actions/auth";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  textField: {
    border: "1px solid #343434",
  },
}));
function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  };
  const [formData, setFormData] = useState(initialState);
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup)
      dispatch(signup(formData, history)).then((response) =>
        setError(response?.data?.message)
      );
    else
      dispatch(signin(formData, history)).then((response) =>
        setError(response?.data?.message)
      );
  };
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const switchSignup = () => {
    setIsSignup(!isSignup);
    setError("");
    setShowPassword(false);
  };

  return (
    <div className="loginSite">
      <form id="logForm" onSubmit={handleSubmit}>
        <div
          style={{ fontWeight: "bold", marginBottom: "6%", fontSize: "1.4em" }}
        >
          {isSignup ? "Zarejestruj się" : "Zaloguj się"}
        </div>
        {isSignup && (
          <>
            <TextField
              style={{ width: "80%", margin: "2%" }}
              size="small"
              className={classes.textField}
              variant="outlined"
              label="Imię"
              name="firstName"
              InputLabelProps={{
                style: { color: "#eae0d5" },
              }}
              InputProps={{
                style: { color: "#eae0d5" },
              }}
              onChange={handleChange}
              required
            />
            <TextField
              style={{
                width: "80%",
                margin: "2%",
              }}
              className={classes.textField}
              size="small"
              variant="outlined"
              label="Nazwisko"
              name="lastName"
              InputLabelProps={{
                style: { color: "#eae0d5" },
              }}
              InputProps={{
                style: { color: "#eae0d5" },
              }}
              onChange={handleChange}
              required
            />
          </>
        )}
        <TextField
          style={{ width: "80%", margin: "2%" }}
          className={classes.textField}
          size="small"
          variant="outlined"
          label="E-mail"
          name="email"
          type="email"
          InputLabelProps={{
            style: { color: "#eae0d5" },
          }}
          InputProps={{
            style: { color: "#eae0d5" },
          }}
          onChange={handleChange}
          required
        />
        <TextField
          style={{ width: "80%", margin: "2%" }}
          className={classes.textField}
          size="small"
          variant="outlined"
          name="password"
          label="Hasło"
          type={showPassword ? "text" : "password"}
          onChange={handleChange}
          InputLabelProps={{
            style: { color: "#eae0d5" },
          }}
          InputProps={{
            style: { color: "#eae0d5" },
          }}
          required
        />
        {isSignup && (
          <TextField
            style={{ width: "80%", margin: "2%" }}
            className={classes.textField}
            size="small"
            variant="outlined"
            name="confirmPassword"
            label="Potwierdź hasło"
            type={showPassword ? "text" : "password"}
            InputLabelProps={{
              style: { color: "#eae0d5" },
            }}
            InputProps={{
              style: { color: "#eae0d5" },
            }}
            onChange={handleChange}
            required
          />
        )}
        <div style={{ textAlign: "left", marginLeft: "10%" }}>
          <input
            type="checkbox"
            onClick={handleShowPassword}
            checked={showPassword && "checked"}
            onChange={() => {}}
          />
          Pokaż hasło
        </div>
        {<p className="error">{error}</p>}
        <Button
          style={{ width: "70%", margin: "2%" }}
          color="secondary"
          variant="contained"
          type="submit"
        >
          {isSignup ? "Zarejestruj się" : "Zaloguj się"}
        </Button>
        <p style={{ cursor: "pointer" }} onClick={switchSignup}>
          {isSignup
            ? "Posiadasz już konto? Zaloguj się"
            : "Nie posiadasz konta? Zarejestruj się"}
        </p>
      </form>
    </div>
  );
}

export default Auth;
