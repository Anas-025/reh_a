import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControlLabel,
  Paper,
  Switch,
  TextField,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/router";
import { useState } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useUser } from "components/UserContext.tsx";
import { setCookie } from "cookies-next";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config.js";
import classes from "./SignIn.module.css";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "./SigninFunctions.js";



const theme = createTheme({
  palette: {
    primary: {
      main: "#1565c0",
    },
    secondary: {
      main: "#2e7d32",
    },
    warning: {
      main: "#e65100",
    },
  },
});
const initialLoginData = { email: "", password: "" };
const initialCreateAccData = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  cPassword: "",
};


function SignIn() {

  const iniErrCreateUserState = {
    email_err: false,
    fname_err: false,
    lname_err: false,
    password_err: false,
    cPassword_err: false,
  };

  const [loginData, setLoginData] = useState(initialLoginData);
  const [createAccData, setCreateAccData] = useState(initialCreateAccData);
  const [loginEmailErr, setLoginEmailErr] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const { setLoggedIn } = useUser();
  const router = useRouter();

  const [err, setErr] = useState(iniErrCreateUserState);

  function handleLoginPage() {
    let inBox = document.getElementById("innerbox");
    inBox.style.transform = "rotateY(-180deg)";
    inBox.style.transformStyle = "preserve-3d";
  }

  function handleSignUpPage() {
    let inBox = document.getElementById("innerbox");
    inBox.style.transform = "rotateY(0deg)";
    inBox.style.transformStyle = "preserve-3d";
  }

  function handleClear() {
    setLoginData(initialLoginData);
  }

  function handleClear2() {
    setCreateAccData(initialCreateAccData);
    setErr({
      email_err: false,
      fname_err: false,
      lname_err: false,
      password_err: false,
      cPassword_err: false,
    });
  }

  const handleCreateAccount = async () => {
    let validCred = true;
    const res_fname = validateName(createAccData.fname);
    if (!res_fname) validCred = false;
    setErr((currState) => {
      return { ...currState, fname_err: !res_fname };
    });

    const res_lname = validateName(createAccData.lname);
    if (!res_lname) validCred = false;
    setErr((currState) => {
      return { ...currState, lname_err: !res_lname };
    });

    const res_mail = validateEmail(createAccData.email);
    if (!res_mail) validCred = false;
    setErr((currState) => {
      return { ...currState, email_err: !res_mail };
    });

    const res_password = validatePassword(createAccData.password);
    if (!res_password) validCred = false;
    setErr((currState) => {
      return { ...currState, password_err: !res_password };
    });

    const res_cPassword = validateConfirmPassword(
      createAccData.password,
      createAccData.cPassword
    );
    if (!res_cPassword) validCred = false;
    setErr((currState) => {
      return { ...currState, cPassword_err: !res_cPassword };
    });

    if (validCred) {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          createAccData.email,
          createAccData.password
        );
        await updateProfile(auth.currentUser, {
          displayName: `${createAccData.fname} ${createAccData.lname}`,
        }).catch((err) => console.log(err));
        const userId = user.user.uid;
        await setDoc(doc(db, "Userdata", userId), {
          fname: createAccData.fname,
          lname: createAccData.lname,
          email: createAccData.email,
        });
        setCreateAccData(initialCreateAccData);
        setLoggedIn(true);
        if (window) {
          window.localStorage.setItem("loggedIn", true);
          window.localStorage.setItem("uid", userId);
        }       
        setCookie("uid", userId, {
          path: "/",
          sameSite: true,
          secure: true,
          maxAge: 3600 * 24 * 7,
        });
        router.push('/app');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  const handleLogin = async () => {
    const res_email = validateEmail(loginData.email);
    setLoginEmailErr(!res_email);
    if (res_email == true) {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          loginData.email,
          loginData.password
        );
        setLoginData(initialLoginData);
        setLoggedIn(true);
        if (window) {
          window.localStorage.setItem("loggedIn", 'true');
          window.localStorage.setItem("uid", user.user.uid);
        }

        setCookie("uid", user.user.uid, {
          path: "/",
          sameSite: true,
          secure: true,
          maxAge: 3600 * 24 * 7,
        });

        router.push('/app');
        
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <div className={classes.container}>
        {/* <div>{loggedInUser}</div> */}
        <ThemeProvider theme={theme}>
          <Paper className={classes.card} elevation={0}>
            <div className={classes.innerBox} id="innerbox">
              <div className={classes.cardFront}>
                <div className={classes.title}>Login</div>
                <TextField
                  label="Email ID"
                  error={loginEmailErr}
                  helperText={loginEmailErr && "Invalid Email!"}
                  color="primary"
                  variant="outlined"
                  type="email"
                  fullWidth
                  id="email"
                  sx={{ borderRadius: "10px" }}
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    type={showLoginPassword ? "text" : "password"}
                    id="pswd"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowLoginPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showLoginPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    fullWidth
                  />
                </FormControl>

                <div className={classes.forgotPswd}>
                  <Button color="primary">Forgot Password?</Button>
                </div>
                <div className={classes.remember}>
                  <FormControlLabel
                    control={<Switch color="info" />}
                    label="Remember me for a month"
                  />
                </div>
                <Button
                  sx={{ backgroundColor: "#1565c0!important" }}
                  fullWidth
                  variant="contained"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={handleClear}
                >
                  Clear
                </Button>
                <div className={classes.switchForm1}>
                  <div>Don&apos;t Have an account yet?</div>
                  <Button color="primary" onClick={handleLoginPage}>
                    Create Account
                  </Button>
                </div>
              </div>

              {/* Create New account */}
              <div className={classes.cardBack}>
                <div className={classes.title}>New User</div>
                <div className={classes.name}>
                  <TextField
                    required
                    label="First Name"
                    error={err.fname_err}
                    helperText={err.fname_err ? "Only letters allowed" : ""}
                    color="primary"
                    variant="outlined"
                    type="text"
                    sx={{ width: "47%" }}
                    id="fname"
                    value={createAccData.fname}
                    onChange={(e) =>
                      setCreateAccData({
                        ...createAccData,
                        fname: e.target.value,
                      })
                    }
                  />
                  <TextField
                    required
                    label="Last Name"
                    error={err.lname_err}
                    helperText={err.fname_err ? "Only letters allowed" : ""}
                    color="primary"
                    variant="outlined"
                    type="text"
                    sx={{ width: "47%" }}
                    id="lname"
                    value={createAccData.lname}
                    onChange={(e) =>
                      setCreateAccData({
                        ...createAccData,
                        lname: e.target.value,
                      })
                    }
                  />
                </div>
                <TextField
                  required
                  label="Email ID"
                  error={err.email_err}
                  helperText={err.fname_err ? "Incorrect email" : ""}
                  color="primary"
                  variant="outlined"
                  type="email"
                  fullWidth
                  id="mail"
                  value={createAccData.email}
                  onChange={(e) =>
                    setCreateAccData({
                      ...createAccData,
                      email: e.target.value,
                    })
                  }
                />

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    error={err.password_err}
                    type={showRegisterPassword ? "text" : "password"}
                    id="pswrd"
                    value={createAccData.password}
                    onChange={(e) =>
                      setCreateAccData({
                        ...createAccData,
                        password: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowRegisterPassword((prev) => !prev)
                          }
                          edge="end"
                        >
                          {showRegisterPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    fullWidth
                  />
                  {err.password_err && (
                    <FormHelperText id="outlined-weight-helper-text" error>
                      Password should have atleast 8 characters with atleast one
                      lowercase letter and special character
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl variant="outlined" fullWidth>
                  <InputLabel htmlFor="outlined-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <OutlinedInput
                    error={err.cPassword_err}
                    type={showCPassword ? "text" : "password"}
                    id="cpswd"
                    value={createAccData.cPassword}
                    onChange={(e) =>
                      setCreateAccData({
                        ...createAccData,
                        cPassword: e.target.value,
                      })
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowCPassword((prev) => !prev)}
                          edge="end"
                        >
                          {showCPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Confirm Password"
                    fullWidth
                  />
                  {err.password_err && (
                    <FormHelperText id="outlined-weight-helper-text" error>
                      Password should have atleast 8 characters with atleast one
                      lowercase letter and special character
                    </FormHelperText>
                  )}
                </FormControl>
                <Button
                  sx={{ backgroundColor: "#1565c0!important" }}
                  fullWidth
                  variant="contained"
                  onClick={handleCreateAccount}
                >
                  Create Account
                </Button>
                <Button
                  fullWidth
                  color="warning"
                  variant="outlined"
                  onClick={() => handleClear2(setErr)}
                >
                  Clear
                </Button>
                <div className={classes.switchForm2}>
                  <div> Already have an account?</div>
                  <Button onClick={handleSignUpPage}>Login</Button>
                </div>
                <div className={classes.terms}>
                  By clicking &apos;Create account&apos;, I agree to
                  Reh-A&apos;s TOS and privacy policy.
                </div>
              </div>
            </div>
          </Paper>
        </ThemeProvider>
      </div>
    </>
  );
}
export default SignIn;
