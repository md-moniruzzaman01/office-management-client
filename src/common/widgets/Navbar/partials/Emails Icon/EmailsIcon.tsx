import { Mail } from "lucide-react";
import { hoverEffect } from "../../config/constants";

const EmailsIcon = () => {
  return (
    <div className={`${hoverEffect}  p-2`}>
      <Mail size={20} />
    </div>
  );
};

export default EmailsIcon;
