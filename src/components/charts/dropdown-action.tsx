'use client';

import { useState } from 'react';
import Select from '@/components/ui/select';
import { PiCalendarBlank, PiCaretDownBold } from 'react-icons/pi';

type Options = {
  value: string;
  name: string;
};

type DropdownActionProps = {
  name?: string;
  options: Options[];
  defaultActive?: string;
  defaultOption?: Options;
  onChange: (data: string) => void;
  className?: string;
  activeClassName?: string;
  dim?:number;
};

export default function DropdownAction({
  options,
  onChange,
  className,
  defaultOption,
  dim
}: DropdownActionProps) {
  const [viewType, setViewType] = useState(defaultOption || options[0]);
  function handleOnChange(data: Options) {
    setViewType(data);
    onChange && onChange(data.value);
  }

  return (
    <Select
    disabled={dim==5}
      variant="text"
      value={viewType.value}
      options={options}
      onChange={handleOnChange}
      displayValue={(selected) =>
        options.find((option) => option.value === selected)?.name
      }
      selectClassName="py-1 px-2 leading-[32px] h-8"
      optionClassName="py-1 px-2 leading-[32px] h-8"
      dropdownClassName="w-32 p-2 gap-1 grid"
      useContainerWidth={false}
      placement="bottom-end"
      prefix={<PiCalendarBlank className="h-5 w-5 text-gray-500" />}
      suffix={<PiCaretDownBold className="ml-2 h-3 w-3" />}
      className={className}
    />
  );
}
