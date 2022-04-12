import React, { Component, useEffect, useState } from "react";

import fire from "../db/firebase";

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [number, setnumber] = useState("");
  const [Name, setName] = useState("");

  function login() {
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signup() {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div class="login">
        <form>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="enter email address"
            onChange={handleChange}
            value={state.email}
          />
          <input
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="enter password"
            value={state.password}
          />
          <button onClick={login}>Login</button>
          <button onClick={signup}>Signup</button>
        </form>
      </div>
    </>
  );
}
export default Login;
