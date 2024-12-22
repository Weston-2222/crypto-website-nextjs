'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Email is not valid',
  }),
  password: z.string().min(8, {
    message: '密碼至少8個字',
  }),
  confirmPassword: z.string().min(8, {
    message: '確認密碼至少8個字',
  }),
});

const Page = () => {
  const router = useRouter();
  const { toast } = useToast();

  const httpStatusToMessage = (status: number): void => {
    switch (status) {
      case 201:
        toast({
          title: '註冊成功',
          description: '請登入',
        });
        break;
      case 400:
        toast({
          title: '註冊失敗',
          description: 'Email 或 Password 格式錯誤，請重新註冊',
        });
        break;
      case 409:
        toast({
          title: '註冊失敗',
          description: '該 Email 已被註冊',
        });
        break;
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //兩次密碼是否相同
    if (data.password !== data.confirmPassword) {
      setIsPasswordMatch(false);
    } else {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      httpStatusToMessage(response.status);
      if (response.status === 201) {
        router.push('/?isOpenLoginDialog=true');
      }
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md rounded-lg shadow-lg p-8'>
        {/* 標題 */}
        <h1 className='text-2xl font-bold text-center mb-6'>註冊</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>信箱</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='example@email.com'
                      {...field}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  {/* <FormDescription>email用作登入</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>密碼</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      {...field}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      onChange={(e) => {
                        field.onChange(e);
                        setIsPasswordMatch(
                          e.target.value === form.getValues('password')
                        );
                      }}
                    />
                  </FormControl>
                  {/* <FormDescription>
                    Your password must be at least 8 characters.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>確認密碼</FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='********'
                      {...field}
                      className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                      onChange={(e) => {
                        field.onChange(e);
                        setIsPasswordMatch(
                          e.target.value === form.getValues('confirmPassword')
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription className='text-red-500'>
                    {!isPasswordMatch && '密碼不一致'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit 按鈕 */}
            <Button
              type='submit'
              className='w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300'
            >
              註冊
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Page;
