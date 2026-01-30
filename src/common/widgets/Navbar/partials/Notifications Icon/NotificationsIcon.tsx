import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { Bell } from 'lucide-react';
import { hoverEffect } from '../../config/constants';

const NotificationsIcon = () => {
  return (
    <Menu
      as="div"
      className={`${hoverEffect} relative inline-block text-left p-2`}
    >
      <div>
        <Menu.Button className="flex justify-center gap-2 items-center bg-transparent border-0 cursor-pointer">
          <div>
            <Bell size={20} />

            <span className="absolute top-1 right-2 w-2.5 h-2.5 rounded-full bg-destructive animate-pulse"></span>
          </div>
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
        <Menu.Items className="absolute right-0 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-background shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div
            tabIndex={0}
            className="absolute right-0 z-10 mt-3  w-52 bg-base-500 shadow"
          >
            <div className="bg-background rounded-md">
              <h3 className="pt-3  font-semibold text-center">Account Created</h3>
              {/* <h3 className="pt-1 text-center">258963</h3> */}
              <hr className="mt-2" />
              <div className="py-3 pl-5">
                <p>Notification</p>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NotificationsIcon;
