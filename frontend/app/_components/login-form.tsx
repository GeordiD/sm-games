'use client'

import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const { register, handleSubmit } = useForm();

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="self-center">Login</h3>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex gap-2">
          <label>Email</label>
          <input
            type="email"
            {...register('email')}
            required
          />
        </div>
        <div className="flex gap-2">
          <label>Password</label>
          <input
            type="password"
            {...register('password')}
            required
          />
        </div>
        <button className="border p-2 cursor-pointer">Login</button>
      </form>
    </div>
  )
}