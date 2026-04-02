import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router';

import EyeIcon from '@assets/icons/eye.svg?react';
import EyeOffIcon from '@assets/icons/eye-off.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import UserIcon from '@assets/icons/user.svg?react';

import { useAuth } from '@/app/providers';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { CloseButton } from '@/shared/ui/CloseButton';
import { FormInput } from '@/shared/ui/FormInput';
import { AuthForm } from '@/widgets/auth-form';

const DEMO_ACCOUNT = {
  username: import.meta.env.VITE_DEMO_USERNAME,
  password: import.meta.env.VITE_DEMO_PASSWORD,
};

interface LoginFormValues {
  username: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm() {
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
    <AuthForm
      className="max-w-sm"
      title="Welcome!"
      subtitle="Please sign in to continue"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(login)}
    >
      <FormInput
        {...register('username', { required: 'Enter your username' })}
        size="lg"
        label="Username"
        type="text"
        placeholder="Enter your username"
        error={errors.username?.message}
        leftElement={<UserIcon className="text-gray-400" />}
        rightElement={username && <CloseButton onClick={() => setValue('username', '')} />}
      />

      <FormInput
        {...register('password', { required: 'Enter your password' })}
        size="lg"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
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

      <Checkbox {...register('rememberMe')} label="Remember me" />

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <Button className="w-full" size="lg" type="submit">
        Sign in
      </Button>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-gray-400">or</span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {hasDemoAccount && (
        <Button className="w-full" size="lg" type="button" variant="secondary" onClick={handleDemoLogin}>
          Demo account
        </Button>
      )}

      <p className="text-center text-sm text-gray-500">
        Don't have an account?{' '}
        <Link className="font-medium text-sky-600 hover:underline" to="/register">
          Sign up
        </Link>
      </p>
    </AuthForm>
  );
}
