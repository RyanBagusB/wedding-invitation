"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "../../components/ui/card/Index";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!username.trim()) validationErrors.username = "Username wajib diisi";
    if (!password.trim()) validationErrors.password = "Password wajib diisi";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoginError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoginError(data.error || "Login gagal");
        return;
      }

      router.push("/dashboard"); // redirect setelah login sukses
    } catch (err) {
      console.error(err);
      setLoginError("Terjadi kesalahan, coba lagi.");
    }
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
