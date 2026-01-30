/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { removeFromLocalStorage } from "./local_storage";
import { authKey } from "../config/constaints";

export const showToast = (result: any) => {

  if (result?.data?.success) {
    toast.success(result.data.message);
    return true;
  } else {
    const errorStatus = result?.error?.status;
    const errorMessage =
      result?.error?.data?.message || "Unknown error occurred";

    if (errorStatus === 403 || errorStatus === 401) {
      removeFromLocalStorage(authKey);
      toast.error(errorMessage, {
        onClose: () => {
          window.location.href = "/"; // Redirect after toast closes
        },
      });
    } else {
      toast.error(errorMessage);
      return false;
    }
  }
};
