import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { NavLink } from 'react-router-dom';
import Button from '../../../../Button';
import { Settings } from 'lucide-react';
import { hoverEffect } from '../../config/constants';

const SettingsIcon = () => {
  return (
    <Menu
      as="div"
      className={`${hoverEffect} relative inline-block text-left p-2`}
    >
      <div>
        <Menu.Button className="flex justify-center gap-2 items-center bg-transparent border-0 cursor-pointer ">
          <Settings size={20} />
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
            className="absolute right-0 mt-3 z-[1] w-52 bg-base-500 shadow"
          >
            <div className="bg-background rounded-md">
              <h3 className="pt-3 pl-5 font-semibold">Settings</h3>
              <hr className="mt-2" />
              <div className="py-3 pl-5">
                <NavLink
                  className="hover:bg-transparent !bg-transparent"
                  to={'/settings'}
                >
                  <Button link>Change Password</Button>
                </NavLink>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SettingsIcon;
