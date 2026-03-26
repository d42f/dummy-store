import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router';

import CloseIcon from '@assets/icons/close.svg?react';
import EyeIcon from '@assets/icons/eye.svg?react';
import EyeOffIcon from '@assets/icons/eye-off.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import LogoIcon from '@assets/icons/logo.svg?react';
import UserIcon from '@assets/icons/user.svg?react';

import { useAuth } from '@/hooks/useAuth';

interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { username: '', password: '', rememberMe: false },
  });

  const username = useWatch({ control, name: 'username' });

  async function onSubmit(values: LoginFormValues) {
    await login(values);
    if (!error) navigate('/products', { replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm">
            <LogoIcon />
          </div>
        </div>

        <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Добро пожаловать!</h1>
        <p className="mb-6 text-center text-sm text-gray-400">Пожалуйста, авторизируйтесь</p>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-900">Логин</label>
          <div
            className={`flex items-center rounded-xl border bg-white px-3 py-2.5 ${errors.username ? 'border-red-400' : 'border-gray-200'}`}
          >
            <UserIcon className="mr-2.5 shrink-0 text-gray-400" />
            <input
              {...register('username', { required: 'Введите логин' })}
              type="text"
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Введите логин"
            />
            {username && (
              <button
                type="button"
                onClick={() => setValue('username', '')}
                className="ml-2 shrink-0 text-gray-400 hover:text-gray-600"
              >
                <CloseIcon />
              </button>
            )}
          </div>
          {errors.username && <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-900">Пароль</label>
          <div
            className={`flex items-center rounded-xl border bg-white px-3 py-2.5 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
          >
            <LockIcon className="mr-2.5 shrink-0 text-gray-400" />
            <input
              {...register('password', { required: 'Введите пароль' })}
              type={showPassword ? 'text' : 'password'}
              className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
              placeholder="Введите пароль"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 shrink-0 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          </div>
          {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
        </div>

        <div className="mb-5 flex items-center gap-2">
          <input
            {...register('rememberMe')}
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-blue-600"
          />
          <label htmlFor="remember" className="text-sm text-gray-500">
            Запомнить данные
          </label>
        </div>

        {error && <p className="mb-3 text-center text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mb-4 w-full rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Входим...' : 'Войти'}
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">или</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <p className="text-center text-sm text-gray-500">
          Нет аккаунта?{' '}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Создать
          </a>
        </p>
      </form>
    </div>
  );
}
