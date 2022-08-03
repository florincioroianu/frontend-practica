import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import classes from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const _handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }

    if (value.length) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const _validate = () => {
    let isValid = true;
    const tmpErrors = { ...errors };

    if (!email.length) {
      tmpErrors.email = "Email cannot be empty!";
      isValid = false;
    }

    if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
      isValid = false;
      tmpErrors.email = "Email Not Valid";
    }

    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/)) {
      isValid = false;
      tmpErrors.password =
        "At least one digit, one uppercase and one lowercase, length must be between 5 and 20 characters";
    }

    setErrors(tmpErrors);

    return isValid;
  };

  const _forgotPassword = () => {
    navigate("/forgot-password");
  };

  const _login = async () => {
    const isValid = _validate();

    if (isValid) {
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
    }
  };

  return (
    <section>
      <div className="color-overlay d-flex justify-content-center align-items-center">
        <Form className="rounded p-4 p-sm-3">
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

          <Button variant="primary" onClick={_login}>
            Login
          </Button>
          <a className="link-danger mb-3" onClick={_forgotPassword}>
            Forgot password
          </a>
        </Form>
      </div>
    </section>
  );
};

export default Login;
