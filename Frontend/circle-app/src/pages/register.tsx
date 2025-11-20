import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/services/api";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

type RegisterType = {
  username: string;
  full_name: string;
  email: string;
  password: string;
};

export function Register() {
  const [form, setForm] = useState<RegisterType>({
    username: "",
    full_name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("api/v1/auth/register", form);
      alert("Register berhasil!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Register gagal!");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">circle</CardTitle>
          <CardTitle>Register to your account</CardTitle>
          <CardDescription>Create account Circle</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Input
                  id="username"
                  type="text"
                  value={form.username}
                  placeholder="username"
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Input
                  id="full_name"
                  type="text"
                  value={form.full_name}
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="bg-green-600 w-full">
                  Create
                </Button>
                <FieldDescription className="text-start">
                  Already have account?{" "}
                  <a href="/login" className="text-green-500">
                    Login
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
