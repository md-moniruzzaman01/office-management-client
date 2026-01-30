import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { User } from "lucide-react";
import { hoverEffect } from "../../config/constants";

const UserIcon = () => {
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className={`${hoverEffect} p-2 flex`}>
          <User size={20} />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2  origin-top-right divide-y  rounded-md bg-background shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div
            tabIndex={0}
            className="absolute right-0 mt-3 z-[1] w-52  shadow"
          >
            <div className="bg-background rounded-md">
              <h3 className="pt-3  font-semibold text-center">
                admin
              </h3>
              <h3 className="pt-1 text-center">ID: SW-0001</h3>
              <hr className="mt-2" />
              <div className="py-3 px-2 text-center text-xs break-words">
                <p>admin@softwara.com</p>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserIcon;
