import api from "../../../api";

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const URL = "/users/token";
  const response = await api.post(
    URL,
    JSON.stringify({ username: email, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  console.log(response);
};
