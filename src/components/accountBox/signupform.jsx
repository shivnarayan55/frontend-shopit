import React, { useContext, useState } from "react";
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

export function SignupForm(props) {
  const [customerSignUp, setCustomerSignUp] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const [field, setField] = useState(false);
  const [verify, setVerify] = useState(false);

  const handleChange = (event) => {
    setCustomerSignUp({
      ...customerSignUp,
      [event.target.name]: event.target.value,
    });
  };

  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/auth/signup",
        customerSignUp,
        config
      )
      .then(function (response) {
        console.log(response.data);
        if (response.status === 200) {
          setVerify(true);
          setField(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          setField(true);
          setVerify(false);
        }
      });
  };

  const { switchToSignin } = useContext(AccountContext);

  return (
    <BoxContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {field && <BoldLink>Kindly fill all the fields correctly!</BoldLink>}
          {verify && <BoldLink>Successfully Registered!</BoldLink>}
          {verify && (
            <BoldLink>Kindly verify your email and Signin...</BoldLink>
          )}
          <Input
            placeholder="name"
            type="text"
            name="name"
            value={customerSignUp.name}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="email"
            type="email"
            name="email"
            value={customerSignUp.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="username"
            type="text"
            name="username"
            value={customerSignUp.username}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="password"
            type="password"
            name="password"
            value={customerSignUp.password}
            onChange={handleChange}
            required
          />
        </FormContainer>

        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit">Signup</SubmitButton>
        <Marginer direction="vertical" margin={10} />

        <MutedLink href="#">This will send a Link to your email </MutedLink>
        <Marginer direction="vertical" margin="0.5em" />
      </form>
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
