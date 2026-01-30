/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeFromLocalStorage } from "./local_storage";
import { authKey } from "../config/constaints";
import swal from "sweetalert";

export const showSwal = (result: any) => {
  if (result?.data?.success) {
    swal("Success", result.data.message, "success");
    return true;
  } else {
    const errorStatus = result?.error?.status;
    const errorMessage = result?.data?.message || "Unknown error occurred";

    if (errorStatus === 403 || errorStatus === 401) {
      removeFromLocalStorage(authKey);
      swal({
        title: "Error",
        text: errorMessage,
        icon: "error",
      }).then(() => {
        window.location.href = "/login";
      });
    } else {
      swal("Error", errorMessage, "error");
      return false;
    }
  }
};
