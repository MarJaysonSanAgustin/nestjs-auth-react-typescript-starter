import { AxiosError } from "axios";
import { authApi } from "../../../api";

export const getUser = async () => {
  try {
    const response = await authApi.get("/users/me");
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error?.response?.status === 401) {
      return null;
    }
  }
};

export const logout = async () => {
  try {
    const response = await authApi.delete("/users/token");
    return response?.data;
  } catch (error: unknown) {
    return null;
  }
};
