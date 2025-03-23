import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

const Select = ({ onChange, name, placeholder, option }) => {
  const [selected, setSelected] = useState({ name: placeholder });

  const handleSelect = (item) => {
    setSelected(item);
    const e = {
      target: {
        name,
        value: item.name,
      },
    };
    onChange(e);
  };

  return (
    <Listbox value={selected} onChange={handleSelect}>
      <div className="relative mt-1">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 bg-white shadow-input rounded-lg py-3 px-5 text-left text-[#737373] sm:text-sm/6">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected.name}</span>
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>
        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md bg-white py-1 text-base ring-1 shadow-lg ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {option.map((o) => (
            <ListboxOption
              key={o.id}
              value={o}
              className="group relative cursor-default py-2 pr-9 pl-3 text-[#737373] select-none data-focus:bg-indigo-600 data-focus:text-white data-focus:outline-hidden"
            >
              <div className="flex items-center">
                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                  {o.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select;
