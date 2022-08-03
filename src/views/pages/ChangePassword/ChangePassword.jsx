import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
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

    if (name === "code") {
      setCode(value);
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

    if (!password.length) {
      tmpErrors.password = "Password cannot be empty!";
      isValid = false;
    }

    setErrors(tmpErrors);

    return isValid;
  };

  const _changePassword = async () => {
    const isValid = _validate();

    if (isValid) {
      // make API REQUEST
      const payload = {
        email,
        code,
        password,
      };

      const res = await fetch("http://practica.local/api/change-password", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(res);
      navigate("/login");
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
            <Form.Label>Code</Form.Label>
            <Form.Control
              name="code"
              type="input"
              placeholder="Enter code from email"
              value={code}
              onChange={_handleChange}
            />
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

          <Button onClick={_changePassword}>Change password</Button>
        </Form>
      </div>
    </section>
  );
};

export default ChangePassword;
