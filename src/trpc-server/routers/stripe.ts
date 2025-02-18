import { z } from 'zod';
import { router, publicProcedure } from '../index';
import Stripe from 'stripe';
import { getBaseUrl } from '@/lib/reactQuery-provider';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1), // 최소 1원 이상 결제
        currency: z.string().default('aud'),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: input.currency,
                product_data: {
                  name: 'Custom paymentS',
                  description: 'One-time payment',
                },
                unit_amount: Math.round(input.amount * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
          cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        });
        console.log('✅ Stripe Session Created:', session.id, session.url);
        return { url: session.url };
      } catch (error) {
        console.error('❌ Stripe Error:', error);
        throw new Error('Failed to create Stripe checkout session');
      }
    }),
});
