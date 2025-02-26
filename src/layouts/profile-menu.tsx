'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import { Title, Text } from '@/components/ui/text';
import { routes } from '@/config/routes';
import cn from '@/utils/class-names';
import { useLogout } from '@/framework/auth'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFindUsers } from '@/framework/users';
import Spinner from '@/components/ui/spinner';

const menuItems = [
  {
    name: 'My Profile',
    href: routes.profile,
  },
  {
    name: 'Account Settings',
    href: routes.forms.profileSettings,
  },
  // {
  //   name: 'Activity Log',
  //   href: '#',
  // },
];

function DropdownMenu() {
  const { mutate } = useLogout()
  const { push } = useRouter()
  // let idNum:any=localStorage.getItem("userId") 
  // const { data,isLoading} = useFindUsers(idNum)  
  
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={""}
          name={"Mohamed Faried"}
          color="invert"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
          {"Mohamed Faried"}
          </Title>
          <Text className="text-gray-600">{"mohamed@gmail.com"}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-3.5 font-medium text-gray-700">
        {menuItems.map((item) => {
          return<Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        }
        )}
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          // onClick={() => signOut()}
          onClick={() => {
            mutate()
            push('/auth/login')
          }}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);
  // let idNum:any=localStorage.getItem("userId") 
  // const { data,isLoading} = useFindUsers(idNum) 
  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={() => <DropdownMenu />}
      shadow="sm"
      placement="bottom-end"
      className="z-50 p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100"
    >
      <button
        className={cn(
          'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
          buttonClassName
        )}
      >
          <Avatar
            src={""}
            name={""}
            color="invert"
            className={cn('!h-9 w-9 sm:!h-10 sm:w-10', avatarClassName)}
          />
      </button>
    </Popover>
  );
}
