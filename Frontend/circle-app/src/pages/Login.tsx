import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

type LoginType = {
  email: string;
  password: string;
};

export function Login() {
  const [form, setForm] = useState<LoginType>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("api/v1/auth/login", form);

      const token = res.data?.token;
      if (!token) {
        alert("Login gagal: token tidak tersedia");
        return;
      }

      login(token);
      navigate("/");

      alert("Login berhasil!");
    } catch (error) {
      console.error(error);
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">circle</CardTitle>
          <CardTitle>Login to Circle</CardTitle>
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="password"
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="bg-green-700 w-full">
                  Login
                </Button>
                <FieldDescription className="text-start">
                  Don't have an account yet?{" "}
                  <a href="/register" className="text-green-500">
                    Create account
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
