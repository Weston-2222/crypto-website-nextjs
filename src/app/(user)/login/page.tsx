'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { useToast } from '@/hooks/use-toast';
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

// 1. 透過 .refine() 驗證兩次輸入的密碼是否一致
const FormSchema = z
  .object({
    email: z.string().email({ message: 'Email is not valid' }),
    password: z.string().min(8, { message: '密碼至少8個字' }),
    confirmPassword: z.string().min(8, { message: '確認密碼至少8個字' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: '密碼不一致',
  });

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();

  // 2. 依照不同 http status 回應不同訊息
  const httpStatusToMessage = (status: number) => {
    switch (status) {
      case 201:
        toast({ title: '註冊成功', description: '請登入' });
        break;
      case 400:
        toast({
          title: '註冊失敗',
          description: 'Email 或 Password 格式錯誤，請重新註冊',
        });
        break;
      case 409:
        toast({ title: '註冊失敗', description: '該 Email 已被註冊' });
        break;
      default:
        toast({ title: '註冊失敗', description: '伺服器錯誤' });
        break;
    }
  };

  // 3. 設定表單初始值並綁定 Zod 驗證
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  // 4. 提交表單後請求後端 API，並依回應處理對應邏輯
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    httpStatusToMessage(response.status);

    if (response.status === 201) {
      router.push('/login');
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center p-4'>
      <div className='w-full max-w-md rounded-lg shadow-lg p-8'>
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
                      {...field}
                      placeholder='example@email.com'
                      className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
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
                      {...field}
                      type='password'
                      placeholder='********'
                      className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
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
                      {...field}
                      type='password'
                      placeholder='********'
                      className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                  </FormControl>
                  {/* 提示文字直接由 Zod 驗證錯誤顯示 */}
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 提交按鈕 */}
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
}
