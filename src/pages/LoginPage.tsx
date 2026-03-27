import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import EyeIcon from '@assets/icons/eye.svg?react';
import EyeOffIcon from '@assets/icons/eye-off.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import UserIcon from '@assets/icons/user.svg?react';

import { Button } from '@/components/Button';
import { Checkbox } from '@/components/Checkbox';
import { CloseButton } from '@/components/CloseButton';
import { FormInput } from '@/components/FormInput';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/hooks/useAuth';

const DEMO_ACCOUNT = {
  username: import.meta.env.VITE_DEMO_USERNAME,
  password: import.meta.env.VITE_DEMO_PASSWORD,
};

interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { login, error } = useAuth();

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

  const hasDemoAccount = Boolean(DEMO_ACCOUNT.username && DEMO_ACCOUNT.password);

  const handleDemoLogin = () => {
    setValue('username', DEMO_ACCOUNT.username);
    setValue('password', DEMO_ACCOUNT.password);
    handleSubmit(login)();
  };

  return (
    <form onSubmit={handleSubmit(login)} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6 flex justify-center">
        <Logo className="h-14 w-14" />
      </div>

      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">Добро пожаловать!</h1>
      <p className="mb-6 text-center text-sm text-gray-400">Пожалуйста, авторизируйтесь</p>

      <fieldset disabled={isSubmitting} className="flex flex-col gap-4">
        <FormInput
          {...register('username', { required: 'Введите логин' })}
          size="lg"
          label="Логин"
          type="text"
          placeholder="Введите логин"
          error={errors.username?.message}
          leftElement={<UserIcon className="text-gray-400" />}
          rightElement={username && <CloseButton onClick={() => setValue('username', '')} />}
        />

        <FormInput
          {...register('password', { required: 'Введите пароль' })}
          size="lg"
          label="Пароль"
          type={showPassword ? 'text' : 'password'}
          placeholder="Введите пароль"
          error={errors.password?.message}
          leftElement={<LockIcon className="text-gray-400" />}
          rightElement={
            <Button
              className="p-0"
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          }
        />

        <Checkbox {...register('rememberMe')} label="Запомнить данные" />

        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        <Button className="w-full" size="lg" type="submit">
          Войти
        </Button>

        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400">или</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {hasDemoAccount && (
          <Button className="w-full" size="lg" type="button" variant="secondary" onClick={handleDemoLogin}>
            Демо-аккаунт
          </Button>
        )}

        <p className="text-center text-sm text-gray-500">
          Нет аккаунта?{' '}
          <a className="font-medium text-sky-600 hover:underline" href="/login" onClick={e => e.preventDefault()}>
            Создать
          </a>
        </p>
      </fieldset>
    </form>
  );
}
