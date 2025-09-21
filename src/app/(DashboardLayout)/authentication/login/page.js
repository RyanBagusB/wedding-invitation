"use client";

import React, { useState } from "react";
import Card from "../../components/ui/card/Index";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const newErrors = {
      username: !username.trim() ? "Username is required" : "",
      password: !password.trim() ? "Password is required" : "",
    };

    setErrors(newErrors);
    setLoginError("");

    if (newErrors.username || newErrors.password) return;

    if (username !== "admin" || password !== "123456") {
      setLoginError("Invalid username or password");
      return;
    }

    console.log("Logging in with:", { username, password });
  };

  return (
    <Card className="w-full max-w-sm mx-auto">
      <Card.Header className="pt-6">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
      </Card.Header>
      <form onSubmit={handleLogin}>
        <Card.Body className="space-y-6 py-6">
          <Input
            id="username"
            name="username"
            label="Username"
            placeholder="Enter your username"
            value={username}
            required
            error={errors.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            error={errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {loginError && (
            <p className="text-sm text-red-500 text-center mt-2">{loginError}</p>
          )}
        </Card.Body>
        <Card.Footer className="flex justify-center pb-8">
          <Button type="submit" variant="primary" size="md" className="w-full">
            Login
          </Button>
        </Card.Footer>
      </form>
    </Card>
  );
}
