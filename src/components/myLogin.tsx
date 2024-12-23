'use client';
import 'client-only';
import { signIn } from 'next-auth/react';
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
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';

const MyLogin = () => {
  const router = useRouter();
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

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: '/',
    });
    if (result?.error) {
      const status = parseInt(result.error.split('|')[0]);
      if (status == 400) {
        alert('登入參數未提供');
      } else if (status == 401) {
        alert('email或密碼錯誤');
      } else if (status == 404) {
        alert('用戶不存在');
      } else if (status !== 200 || result.error) {
        alert('伺服器錯誤');
      }
    }
    if (result?.ok) {
      router.push('/');
      toast({
        title: '登入成功',
      });
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
            <div>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='example@gmail.com'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='block text-sm font-medium'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                        placeholder='********'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type='submit'
              className='w-full py-2 px-4 bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              Submit
            </Button>
          </form>
        </Form>
        <div className='flex justify-between mt-4'>
          <Button variant='link' asChild className='hover:underline'>
            <Link href='/register' prefetch={false}>
              註冊
            </Link>
          </Button>
          <Button variant='link' asChild className='hover:underline'>
            <Link href='/forgot-password' prefetch={false}>
              忘記密碼
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyLogin;
