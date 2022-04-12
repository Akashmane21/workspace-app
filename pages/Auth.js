import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Formik, Field, Form } from "formik";
import styles from "../styles/Auth.module.scss";
import { Button, IconButton, TextField } from "@mui/material";
import { signInWithGoogle, githubSignin } from "../db/auth";
import firebase from "../db/firebase";
import { message } from "antd";
import { useCounter } from "../Context/Context";
import { useRouter } from "next/router";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

export const SignBtns = () => {
  return (
    <>
      <div className={styles.sign}>
        {/* <IconButton>
<GoogleIcon className={styles.gobtn} style={{color:"red"}}  />
</IconButton>

<IconButton>
<GitHubIcon className={styles.gobtn} style={{color:"blue"}}  />
</IconButton> */}

        <Button
          onClick={signInWithGoogle}
          variant="contained"
          startIcon={
            <GoogleIcon className={styles.gobtn} style={{ color: "red" }} />
          }
        >
          Sign in with Google
        </Button>
        {/* <br /> */}
        <Button
          onClick={githubSignin}
          variant="contained"
          startIcon={
            <GitHubIcon className={styles.gobtn} style={{ color: "black" }} />
          }
        >
          Sign in with GIthub
        </Button>
      </div>

      {/* <br /><br /> */}
      <hr />
      <center>
        <h4 className={styles.or}>Or</h4>
      </center>
    </>
  );
};

export default function Auth() {
  const router = useRouter();
  const { setuid } = useCounter();
  const [isLogin, setisLogin] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [Name, setName] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((User) => {
      if (User) {
        router.push("/");
        setuid(User.uid);
      }
    });
  }, []);

  const newRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u.user);
        const data = {
          Name: Name,
          email: email,
          password: password,
          Number: number,
          creationTime: u.user.metadata.creationTime,
          Photo: u.user.photoURL,
          Displayname: u.user.displayName,
        };
        firebase.database().ref(`Linksdata/${u.user.uid}/Auth`).set(data);

        firebase.database().ref(`Linksdata/${u.user.uid}/CollectionName`).push({
          Image:
            "https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
          Name: "My Workspace",
        });

        firebase
          .database()
          .ref(`Linksdata/${u.user.uid}/All_Coll/My Workspace/info`)
          .set({
            Image:
              "https://i.pinimg.com/originals/22/21/27/222127297d886c722c077658509091f6.jpg",
            Name: "My Workspace",
          });
      })
      .catch((err) => {
        message.warn(err.message);
      });
  };

  function newLogin() {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        message.warn(err.message);
      });
  }

  return (
    <div className={styles.Auth}>
      {/* <div className={styles.poster}>
        <img src="/login.svg" alt="" />
        </div> */}

      <div className={styles.form}>
        {isLogin ? (
          <div>
            <h2> Log in </h2>
            <h6>Hello , welcome back to WorkSpace.me</h6>

            <SignBtns />

            <div className={styles.forminput}>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                  newLogin(values);
                }}
              >
                <Form>
                  <div className={styles.sin}>
                    <TextField
                      label="Email"
                      required
                      variant="filled"
                      style={{ marginTop: 10, marginRight: 30 }}
                      type="email"
                      onChange={(e) => setemail(e.target.value)}
                    />

                    <TextField
                      label="Password"
                      variant="filled"
                      required
                      style={{ marginTop: 10, marginRight: 30 }}
                      type="password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <div className={styles.joinbtn}>
                    <Button
                      variant="outlined"
                      onClick={() => setisLogin(false)}
                    >
                      Sine Up
                    </Button>

                    <Button variant="contained" type="submit">
                      Login
                    </Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        ) : (
          <>
            <h2> Register Now </h2>
            <h6>Hello , welcome to SafeJourney.io</h6>

            <SignBtns />
            <Formik
              initialValues={{ username: "", password: "", phone: "" }}
              onSubmit={async (values) => {
                newRegister(values);
              }}
            >
              <Form>
                <div className={styles.reg}>
                  <span>
                    <TextField
                      onChange={(e) => setName(e.target.value)}
                      variant="standard"
                      label="Name"
                      placeholder="Enter your Name"
                      type="text"
                      required={true}
                    />
                  </span>

                  <span>
                    <TextField
                      onChange={(e) => setnumber(e.target.value)}
                      variant="standard"
                      label="Phone"
                      placeholder="Enter your phone"
                      type="tel"
                      required={true}
                    />
                  </span>

                  <span>
                    <TextField
                      onChange={(e) => setemail(e.target.value)}
                      variant="standard"
                      label="Email"
                      placeholder="example@gmail.com"
                      type="email"
                      required={true}
                    />
                  </span>

                  <span>
                    <TextField
                      onChange={(e) => setpassword(e.target.value)}
                      variant="standard"
                      label="Password"
                      placeholder="********"
                      type="password"
                      required={true}
                    />
                  </span>
                </div>

                <div className={styles.joinbtn}>
                  <Button variant="outlined" onClick={() => setisLogin(true)}>
                    Sign In
                  </Button>
                  <Button variant="contained" type="submit">
                    Register
                  </Button>
                </div>
              </Form>
            </Formik>
          </>
        )}
      </div>
    </div>
  );
}
