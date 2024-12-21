'use client';
import 'client-only';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import React from 'react';
import { ReactNode, useState } from 'react';

const MyDropDownMenu = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const childArray = React.Children.toArray(children);
  const title = childArray[0];
  const list = childArray.slice(1);

  return (
    <div className='flex'>
      {title}

      <DropdownMenu modal={false} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        {list.length > 0 && (
          <>
            <DropdownMenuTrigger className='flex items-center gap-2'>
              <div className='p-1 px-4 bg-gray-800 text-white rounded-r-md hover:bg-gray-100 hover:text-black transition duration-200'>
                {isOpen ? <IconChevronUp /> : <IconChevronDown />}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              {list.map((item) => item)}
            </DropdownMenuContent>
          </>
        )}
      </DropdownMenu>
    </div>
  );
};
const MyDropDownTitle = ({ children }: { children: ReactNode }) => {
  return (
    <span className='p-1 px-4 bg-gray-800 text-white rounded hover:bg-gray-100 hover:text-black transition duration-200'>
      {children}
    </span>
  );
};
const MyDropDownList = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}) => {
  const childArray = React.Children.toArray(children);

  return childArray.map((item, index) => (
    <DropdownMenuItem key={index} onClick={onClick}>
      {item}
    </DropdownMenuItem>
  ));
};

export { MyDropDownMenu, MyDropDownTitle, MyDropDownList };
