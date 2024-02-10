/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useNavigation } from "react-router-dom";
import { login } from "../services";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };
  const apiResponse = await login(loginData);
  console.log(apiResponse);
  return redirect("/dashboard");
}

export default function LoginPage() {
  const navigation = useNavigation();

  return (
    <div>
      <div>Login Page</div>
      <Form method="POST">
        <input
          placeholder="Email"
          aria-label="email"
          type="email"
          name="email"
        />
        <input
          placeholder="Password"
          aria-label="password"
          type="password"
          name="password"
        />
        <button type="submit" disabled={navigation.state === "submitting"}>
          Submit
        </button>
      </Form>
    </div>
  );
}
