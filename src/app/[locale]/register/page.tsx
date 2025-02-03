'use client';
import React from 'react';
import { useState } from 'react';
import { trpc } from '@/trpc-client/client';
import { useRouter } from 'next/navigation';

function Page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const registerMutation = trpc.auth.register.useMutation();
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerMutation.mutateAsync(formData);
    router.push('/auth/signin');
  };

  return (
    <div className="h-screen items-center flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Page;
