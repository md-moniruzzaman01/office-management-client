import { jwtDecode } from "jwt-decode";
import { getFromLocalStorage } from "./local_storage";
import { authKey } from "../config/constaints";

export const decodedToken = (token: string) => {
  return jwtDecode(token);
};

export const getUser = () => {
  const authToken = getFromLocalStorage(authKey);
  if (authToken) {
    const decodedData = decodedToken(authToken);

    return decodedData;
  } else {
    return "";
  }
};
