'use client';
import 'client-only';
import { IconLogin } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

import MyLogin from './myLogin';
import { useState } from 'react';

const LoginDialog = ({
  defaultOpen = false,
  isIcon = true,
}: {
  defaultOpen?: boolean;
  isIcon?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {isIcon && (
          <div className='flex items-center gap-2'>
            <IconLogin />
            登入
          </div>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <MyLogin />
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
