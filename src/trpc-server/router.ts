// trpc-server/router.ts

import { router, publicProcedure } from './index';
import { z } from 'zod';
import userModel, { TUser } from '@/models/user-model';
import dbConnect from '@/db/mongoose';

export const appRouter = router({
  createUser: publicProcedure
    .input((v) => {
      const schema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      });
      const result = schema.safeParse(v);
      if (!result.success) {
        throw result.error;
      }
      return result.data;
    })
    .mutation(async (params) => {
      await dbConnect();
      const user: TUser = await userModel.create({
        ...params.input,
      });

      return {
        user,
      };
    }),

  getUser: publicProcedure.query(async () => {
    await dbConnect();
    const users: TUser[] = await userModel.aggregate([
      {
        $project: {
          name: 1,
          email: 1,
          _id: {
            $toString: '$_id',
          },
        },
      },
    ]);
    return users;
  }),
});

export type AppRouter = typeof appRouter;
