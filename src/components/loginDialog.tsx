'use client';
import 'client-only';
import { IconLogin, IconLogout } from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';

const LoginDialog = ({ defaultOpen = false }: { defaultOpen?: boolean }) => {
  const { status } = useSession();

  const FormSchema = z.object({
    email: z.string().email({
      message: 'Invalid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data;
    await signIn('credentials', { email, password, callbackUrl: '/' });
  };
  const [open, setOpen] = useState(defaultOpen);
  if (status == 'authenticated') {
    return (
      <button onClick={() => signOut()} className='flex items-center gap-2'>
        <IconLogout />
        登出
      </button>
    );
  }
  if (status == 'unauthenticated') {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <div className='flex items-center gap-2'>
            <IconLogin />
            登入
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>登入</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-2/3 space-y-6'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='example@gmail.com' {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='********' {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit'>Submit</Button>
            </form>
          </Form>
          <div className='flex justify-end gap-2'>
            <Button variant='link' asChild>
              <Link
                href='/user/register'
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                註冊
              </Link>
            </Button>
            <Button variant='link' asChild>
              <Link
                href='/forgot-password'
                prefetch={false}
                onClick={() => setOpen(false)}
              >
                忘記密碼
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};
export default LoginDialog;
