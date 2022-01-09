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

export function ResetPasswordForm(props) {
  const [customerResetPass, setCustomerResetPass] = useState({
    resetToken: "",
    email: "",
    password: "",
  });

  const [field, setField] = useState(false);
  const [passChange, setPassChange] = useState(false);

  const handleChange = (event) => {
    setCustomerResetPass({
      ...customerResetPass,
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
        "http://Shopit-env.eba-axgqujuw.ap-south-1.elasticbeanstalk.com/api/auth/resetPassword",
        customerResetPass,
        config
      )
      .then(function (response) {
        console.log(response);
        if (response.data === "Invalid Reset Token") {
          setField(true);
        } else if (response.status === 200) {
          setPassChange(true);
          setField(false);
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error) {
          setField(true);
        }
      });
  };

  const { switchToSignin } = useContext(AccountContext);

  //  function buttonHandler(e) {
  //    if(localStorage.getItem("resetToken") && localStorage.getItem("email")) {
  //      history.push("/signin#")
  //    }
  //  }

  return (
    <BoxContainer>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          {field && <BoldLink>Invalid input!</BoldLink>}
          {passChange && <BoldLink>Passwork changed Successfully!</BoldLink>}
          {passChange && <BoldLink>Signin to continue...</BoldLink>}

          <Input
            placeholder="OTP"
            type="password"
            name="resetToken"
            value={customerResetPass.resetToken}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="Confirm Your Email"
            type="email"
            name="email"
            value={customerResetPass.email}
            onChange={handleChange}
            required
          />
          <Input
            placeholder="New Password"
            type="password"
            name="password"
            value={customerResetPass.password}
            onChange={handleChange}
            required
          />
        </FormContainer>
        <Marginer direction="vertical" margin={10} />

        <MutedLink onClick={switchToSignin} href="#">
          Go Back to{" "}
          <BoldLink href="#" onClick={switchToSignin}>
            Signin{" "}
          </BoldLink>
        </MutedLink>
        <Marginer direction="vertical" margin="1.6em" />

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
      <Marginer direction="vertical" margin="1em" />
    </BoxContainer>
  );
}
