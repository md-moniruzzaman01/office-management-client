/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import swal from "sweetalert"; // Ensure this is imported correctly
import { removeFromLocalStorage } from "../../shared/Helpers/local_storage";
import { authKey } from "../../shared/config/constaints";

const ErrorShow = ({ error }: any) => {
  const navigate = useNavigate();
  if (!error || !error.data) {
    return null;
  }

  if (
    error.status === 403 ||
    error.status === 401 ||
    error.data.message === "jwt expired"
  ) {
    removeFromLocalStorage(authKey);
    swal({
      title: "Error",
      text: error.data.message || "Unknown error occurred",
      icon: "error",
    }).then(() => {
      navigate("/login");
    });
  }

  return (
    <div className="error-container p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <h1 className="text-xl font-bold mb-2">
        Error <span className="font-semibold"> {error.status}</span>
      </h1>
      <div>
        <p className="mb-2">
          {error.data.message || "An unknown error has occurred."}
        </p>
        {error.data.errorMessages?.map((errorMessage: any) => (
          <p key={errorMessage.path} className="text-sm">
            <strong className="font-semibold">{errorMessage.path}:</strong>{" "}
            {errorMessage.message}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ErrorShow;
