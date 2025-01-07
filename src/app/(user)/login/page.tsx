'use client';
import 'client-only';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' }),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: '/',
      ...data,
    });

    if (result?.error) {
      const [code] = result.error.split('|');
      const status = parseInt(code);

      switch (status) {
        case 400:
          alert('登入參數未提供');
          break;
        case 401:
          alert('email或密碼錯誤');
          break;
        case 404:
          alert('用戶不存在');
          break;
        default:
          alert('伺服器錯誤');
      }
      return;
    }

    if (result?.ok) {
      router.push('/');
      toast({ title: '登入成功' });
    }
  };

  return (
    <div className='flex flex-col items-center justify-center py-6 sm:py-12'>
      <div className='w-full max-w-md px-8 py-6 shadow-lg rounded-lg'>
        <h1 className='text-2xl font-bold text-center mb-6'>
          歡迎光臨 Crypto Inflation Website
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='example@gmail.com' {...field} />
                  </FormControl>
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
                    <Input type='password' placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>
              Submit
            </Button>
          </form>
        </Form>
        <div className='flex justify-between mt-4'>
          <Button variant='link' asChild>
            <Link href='/register'>註冊</Link>
          </Button>
          <Button variant='link' asChild>
            <Link href='/forgot-password'>忘記密碼</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
