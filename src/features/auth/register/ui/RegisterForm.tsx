import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

import EyeIcon from '@assets/icons/eye.svg?react';
import EyeOffIcon from '@assets/icons/eye-off.svg?react';
import LockIcon from '@assets/icons/lock.svg?react';
import UserIcon from '@assets/icons/user.svg?react';

import { useAuth } from '@/app/providers';
import { Button } from '@/shared/ui/Button';
import { FormInput } from '@/shared/ui/FormInput';
import { AuthForm } from '@/widgets/auth-form';

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register: registerUser, error } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    defaultValues: { firstName: '', lastName: '', username: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = ({ firstName, lastName, username, email, password }: RegisterFormValues) =>
    registerUser({ firstName, lastName, username, email, password });

  return (
    <AuthForm
      className="max-w-md"
      title="Create account"
      subtitle="Fill in the details to get started"
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-[1fr_1fr] gap-3">
        <FormInput
          {...register('firstName', { required: 'Enter your first name' })}
          label="First name"
          type="text"
          placeholder="John"
          error={errors.firstName?.message}
          leftElement={<UserIcon className="text-gray-400" />}
        />
        <FormInput
          {...register('lastName', { required: 'Enter your last name' })}
          label="Last name"
          type="text"
          placeholder="Doe"
          error={errors.lastName?.message}
        />
      </div>

      <FormInput
        {...register('username', { required: 'Enter a username' })}
        label="Username"
        type="text"
        placeholder="johndoe"
        error={errors.username?.message}
        leftElement={<UserIcon className="text-gray-400" />}
      />

      <FormInput
        {...register('email', {
          required: 'Enter your email',
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
        })}
        label="Email"
        type="email"
        placeholder="john@example.com"
        error={errors.email?.message}
      />

      <FormInput
        {...register('password', {
          required: 'Enter a password',
          minLength: { value: 6, message: 'At least 6 characters' },
        })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        error={errors.password?.message}
        leftElement={<LockIcon className="text-gray-400" />}
        rightElement={
          <Button type="button" variant="ghost" size="inline" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        }
      />

      <FormInput
        {...register('confirmPassword', {
          required: 'Confirm your password',
          validate: val => val === getValues('password') || 'Passwords do not match',
        })}
        label="Confirm password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Repeat your password"
        error={errors.confirmPassword?.message}
        leftElement={<LockIcon className="text-gray-400" />}
        rightElement={
          <Button type="button" variant="ghost" size="inline" onClick={() => setShowConfirm(!showConfirm)}>
            {showConfirm ? <EyeIcon /> : <EyeOffIcon />}
          </Button>
        }
      />

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <Button className="w-full" type="submit">
        Sign up
      </Button>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{' '}
        <Link className="font-medium text-sky-600 hover:underline" to="/login">
          Sign in
        </Link>
      </p>
    </AuthForm>
  );
}
