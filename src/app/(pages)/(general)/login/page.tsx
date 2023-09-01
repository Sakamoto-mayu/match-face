'use client';
import OrangeButton from '@/components/ui/button/OrangeButton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import SiteTitle from '@/components/ui/SiteTitle';
import { useForm, SubmitHandler } from 'react-hook-form';

// データの型はnumberだが、都合上stringに設定
type LoginForm = {
  userId: string;
  password: string;
};

// 仮のユーザーIDとパスワード
const userId = 1;
const password = 'testtest';

const LoginPage = () => {
  const router = useRouter();

  // フックフォーム
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    // 複数のエラーを保存する設定
    criteriaMode: 'all',
    // 2回目以降のバリデーションをかけるタイミングの設定。デフォルトは'onChange'。
    reValidateMode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data, event: any) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/api/login', {
      cache: 'no-store',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.userId,
        password: data.password,
      }),
    });
    const userData = await response.json();
    console.log('data', data);
    console.log('userData.user', userData.user);
    console.log('userData.user.userId', userData.user.id);
    console.log('userData.user.password', userData.user.password);

    if (
      isValid &&
      data.userId === `${userData.user.id}`
      // &&
      // data.password === `${userData.user.password}`
    ) {
      router.push('/');
    }
  };

  // 内容確認用(削除要)
  // const check = () => {
  //   console.log('errors', errors);
  //   console.log('errors.type', errors.userId?.type);
  // };
  //

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center h-screen">
        <SiteTitle className="m-6" />
        <div className="mt-2 mb-2">
          <label htmlFor="userId" className="">
            ユーザーID
            <div>
              <input
                id="userId"
                type="text"
                className=" w-96 h-10 mt-2 border border-black"
                {...register('userId', {
                  required: {
                    value: true,
                    message: '※ユーザーIDを入力してください。',
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: '※半角数字で入力してください。',
                  },
                  // validate: {
                  //   checkUserId: (value) =>
                  //     Number(value) !== correctUser.id
                  //       ? '※正しいユーザーIDを入力してください。'
                  //       : undefined,
                  // },
                })}
              />
            </div>
          </label>
          {errors.userId && <p className="text-red">{errors.userId.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="">
            パスワード
          </label>
          <div>
            <input
              id="password"
              type="password"
              className="w-96 h-10 mt-2 border border-black"
              {...register('password', {
                required: {
                  value: true,
                  message: '※パスワードを入力してください。',
                },
                // validate: {
                //   checkPassword: (value) =>
                //     value !== correctUser.password
                //       ? '※正しいパスワードを入力してください。'
                //       : undefined,
                // },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red">{errors.password.message}</p>
          )}
        </div>
        <OrangeButton
          label="ログイン"
          className="mt-10 mb-4 w-48 rounded-none"
          type="submit"
          // エラー確認用（削除要）
          // onClick={checkLogin}
          //
        />
        <Link href="/remind" className=" text-blue">
          パスワードを忘れた
        </Link>
        <Link href="/admin/login" className="text-blue pt-16">
          管理者ログイン
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
