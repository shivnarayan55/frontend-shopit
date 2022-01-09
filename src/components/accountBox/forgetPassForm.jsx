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

export function ForgetPasswordForm(props) {
  var validator = require("email-validator");

  const [customerforgetPass, setCustomerforgetPass] = useState({ email: "" });

  const [field, setField] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleChange = (event) => {
    setCustomerforgetPass({
      ...customerforgetPass,
      [event.target.name]: event.target.value,
    });
    const email = event.target.value;
    if (validator.validate(email)) {
      setEmailValid(true);
      setField(false);
    } else {
      setField(true);
      setEmailValid(false);
    }
  };

  const accessToken = localStorage.getItem("access token");
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (customerforgetPass !== null) {
      try {
        const resp = await axios.post(
          "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/auth/forgot",
          customerforgetPass,
          config
        );
        console.log(resp);
      } catch (error) {
        console.log(error);
        if (error) {
          setField(true);
        }
      }
    } else {
      setField(true);
    }
  };

  const { switchToSignin } = useContext(AccountContext);

  const { switchToResetPasswordForm } = useContext(AccountContext);

  return (
    <BoxContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {field && <BoldLink>Incorrect Email!</BoldLink>}

          <Input
            placeholder="email"
            type="text"
            name="email"
            value={customerforgetPass.email}
            onChange={handleChange}
            required
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />

        <MutedLink href="#">This will send an OTP to your email </MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        {emailValid && (
          <SubmitButton onClick={switchToResetPasswordForm} type="submit">
            Submit
          </SubmitButton>
        )}
      </form>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink onClick={switchToSignin} href="#">
        Go Back to Signin
      </MutedLink>
    </BoxContainer>
  );
}
