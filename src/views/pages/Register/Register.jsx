import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.scss";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const _handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUsername(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (value.length) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const _validate = () => {
    let isValid = true;
    const tmpErrors = { ...errors };

    if (!username.length) {
      tmpErrors.username = "Username cannot be empty!";
      isValid = false;
    }

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      isValid = false;
      tmpErrors.email = "Email not valid";
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/)) {
      isValid = false;
      tmpErrors.password =
        "At least one digit, one uppercase and one lowercase, length must be between 5 and 20 characters";
    }
    if (!confirmPassword.length) {
      tmpErrors.confirmPassword = "Confirm password cannot be empty!";
      isValid = false;
    }

    if (confirmPassword !== password) {
      tmpErrors.confirmPassword = "Password and Confirm Password didn`t match";
      isValid = false;
    }

    setErrors(tmpErrors);

    return isValid;
  };

  const _register = async () => {
    const isValid = _validate();

    if (!isValid) {
      return;
    }

    // make API REQUEST
    const payload = {
      email,
      password,
    };

    // const res = await fetch('http://practica.local/api/login', {
    //   method: 'POST',
    //   headers: {
    //     "Accept": 'application/json',
    //     "Content-Type": 'application/json'
    //   },
    //   body: JSON.stringify(payload)
    // })

    // console.log(res);

    navigate("/verify-email");
  };

  console.log(errors, errors.email.length);
  return (
    <section>
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="input"
              placeholder="Enter username"
              value={username}
              isInvalid={errors.username.length}
              onChange={_handleChange}
            />
            {!!errors.username.length && (
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              isInvalid={errors.email.length}
              onChange={_handleChange}
            />
            {!!errors.email.length && (
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              isInvalid={errors.password.length}
              onChange={_handleChange}
            />
            {!!errors.password.length && (
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              isInvalid={errors.confirmPassword.length}
              onChange={_handleChange}
            />
            {!!errors.confirmPassword.length && (
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Button onClick={_register}>Register</Button>
        </Form>
      </div>
    </section>
  );
};

export default Register;
