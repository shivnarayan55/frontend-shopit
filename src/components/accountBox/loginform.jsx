import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

import { useHistory } from "react-router-dom";

export function LoginForm(props) {
  const history = useHistory();

  const [customerSignin, setCustomerSignin] = useState({
    username: "",
    password: "",
  });

  const [showIncorrectCreds, setShowIncorrectCreds] = useState(false);

  const handleChange = (event) => {
    setCustomerSignin({
      ...customerSignin,
      [event.target.name]: event.target.value,
    });
  };

  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/auth/signin",
        customerSignin,
        config
      );
      console.log(resp.data);

      localStorage.setItem("access token", resp.data.accessToken);
      localStorage.setItem("authority", resp.data.auth);
      localStorage.setItem("email", resp.data.username);

      if (resp.data.auth === "Superadmin") {
        history.push("/adminDashboard");
      } else if (resp.data.auth === "User") {
        history.push("/home");
      } else if (resp.data.auth === "Admin") {
        history.push("/adminDashboard");
      } else {
        history.push("/adminDashboard");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        setShowIncorrectCreds(true);
      }
    }
  };

  const { switchToSignup } = useContext(AccountContext);
  const { switchToforgetPassForm } = useContext(AccountContext);

  return (
    <BoxContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {showIncorrectCreds && (
            <BoldLink>Enter correct credentials or verify your email</BoldLink>
          )}
          <Input
            placeholder="email"
            type="text"
            name="username"
            value={customerSignin.username}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={customerSignin.password}
            onChange={handleChange}
            required
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink onClick={switchToforgetPassForm} href="#">
          Forget your password?
        </MutedLink>
        <Marginer direction="vertical" margin="1.6em" />

        <SubmitButton type="submit">Signin</SubmitButton>
      </form>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
