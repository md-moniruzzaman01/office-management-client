/* eslint-disable @typescript-eslint/no-explicit-any */
import { authKey, refreshToken } from "../../../../shared/config/constaints";
import { removeFromLocalStorage } from "../../../../shared/Helpers/local_storage";

export const logout = ({ navigate }: any) => {
  removeFromLocalStorage(authKey);
  removeFromLocalStorage(refreshToken);
  navigate("/login");
};
