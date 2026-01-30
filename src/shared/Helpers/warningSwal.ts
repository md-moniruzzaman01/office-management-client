/* eslint-disable @typescript-eslint/no-explicit-any */
import swal from "sweetalert";

export const WarningSwal = ({
  handleDelete,
  id,
  customFirstMessage,
  customCancelMessage,
}: any) => {
  swal({
    title: "Are you sure?",
    text:
      customFirstMessage ||
      "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: [true, true],
  }).then((willDelete) => {
    if (willDelete) {
      handleDelete(id);
    } else {
      swal({
        text: customCancelMessage || "Your imaginary data is safe!",
        icon: "info",
        className: "custom-swal", // Add the same custom class to the cancel modal
      });
    }
  });
};
