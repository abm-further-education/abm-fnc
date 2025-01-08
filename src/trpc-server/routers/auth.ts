// src/server/routers/auth.ts
import { z } from 'zod';
import { publicProcedure, router } from '../index';
import { User } from '@/models/user-model';
import bcrypt from 'bcrypt';
import dbConnect from '@/db/mongoose';

export const authRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      })
    )
    .mutation(async ({ input }) => {
      await dbConnect();

      const existingUser = await User.findOne({ email: input.email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(input.password, 10);

      const user = await User.create({
        name: input.name,
        email: input.email,
        password: hashedPassword,
      });

      return { success: true, user };
    }),
});
