// component/createUser.tsx

'use client';
import { trpc } from '@/trpc-client/client';

const CreateUser = () => {
  const { data, mutate } = trpc.createUser.useMutation();

  console.log(data);

  return (
    <button
      onClick={() =>
        mutate({ name: 'test', email: 'test12@gmail.com', password: '123456' })
      }
    >
      Create User
    </button>
  );
};

export default CreateUser;
