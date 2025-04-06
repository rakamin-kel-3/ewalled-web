import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import React from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/logo.svg";
import sunLight from "../../assets/sun-light.svg";
import { useUserContext } from "../../context/userContext";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Transfer", href: "/transfer" },
  { name: "Topup", href: "/topup" },
];

const naviagtionMoneyLogs = [
  { name: "Dashboard", href: "/Dashboard" },
  { name: "Graph", href: "/graph" },
];

export const Navbar = () => {
  const { logout } = useUserContext();
  return (
    <Disclosure as="nav" className="bg-white">
      <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-open:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-open:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={logo} className="h-8 w-auto" />
            </div>
          </div>
          <div className="hidden sm:block absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <div className="flex lg:space-x-7 md:space-x-4 space-x-1 items-center">
              <NavLink
                key="dashboard"
                to="/"
                className={({ isActive }) => {
                  return classNames(
                    isActive
                      ? "text-[#0061FF]"
                      : "text-black hover:text-[#0061FF",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  );
                }}
              >
                Home
              </NavLink>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="flex gap-x-2 items-center text-sm">
                  Transaction
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to="/transfer"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Transfer
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/topup"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Top Up
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="flex gap-x-2 items-center text-sm">
                  Money Logs
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Dashboard
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link
                        to="/graph"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Graph
                      </Link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
              <button
                className="text-black hover:text-[#0061FF] rounded-md px-3 py-2 text-sm font-medium"
                onClick={logout}
              >
                Sign Out
              </button>
              <div className="border-1 h-7 border-[#B3B3B3] my-auto"></div>
              <img src={sunLight} className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3 border-b-1 border-[#e5e5e5]">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "text-[#0061FF]"
                  : "text-black hover:text-[#0061FF]",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="space-y-1 px-2 pt-2 pb-3 border-b-1 border-[#e5e5e5]">
          {naviagtionMoneyLogs.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "text-[#0061FF]"
                  : "text-black hover:text-[#0061FF]",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
        <div className="space-y-1 px-2 pt-2 pb-3">
          <DisclosureButton
            key={"logout"}
            onClick={logout}
            aria-current={"page"}
            className="text-black hover:text-[#0061FF] block rounded-md px-3 py-2 text-base font-medium"
          >
            Sign Out
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;
