import { MessageSquare } from "lucide-react";
import { hoverEffect } from "../../config/constants";

const MessagesIcon = () => {
  return (
    <div className={`${hoverEffect} relative cursor-pointer p-2`}>
      <MessageSquare size={20} className="scale-x-[-1]  " />
      <span className="absolute top-1 right-1  text-[9px] w-3 flex items-center justify-center text-white  rounded-full bg-blue-600 ">
        5
      </span>
    </div>
  );
};

export default MessagesIcon;
