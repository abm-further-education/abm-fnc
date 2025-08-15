import { z } from 'zod';
import { router, publicProcedure } from '../index';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// 사용자 정보 스키마 정의
const userInfoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  additionalRequest: z.string(),
  packageName: z.string(),
  numberOfGuests: z.number(),
  totalAmount: z.number(),
});

export const stripeRouter = router({
  createCheckoutSession: publicProcedure
    .input(
      z.object({
        amount: z.number().min(1),
        currency: z.string().default('aud'),
        userInfo: userInfoSchema,
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
                  name: `${input.userInfo.packageName} - ${input.userInfo.numberOfGuests} guests`,
                  description: `Catering package for ${input.userInfo.name}`,
                },
                unit_amount: Math.round(input.amount * 100),
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${SITE_URL}`,
          metadata: {
            userName: input.userInfo.name,
            userEmail: input.userInfo.email,
            userPhone: input.userInfo.phone,
            packageName: input.userInfo.packageName,
            numberOfGuests: input.userInfo.numberOfGuests.toString(),
            additionalRequest: input.userInfo.additionalRequest,
            totalAmount: input.userInfo.totalAmount.toString(),
          },
        });
        console.log('✅ Stripe Session Created:', session.id, session.url);
        return { url: session.url };
      } catch (error) {
        console.error('❌ Stripe Error:', error);
        throw new Error('Failed to create Stripe checkout session');
      }
    }),

  // 결제 완료 후 이메일 발송을 위한 새로운 프로시저
  sendPaymentConfirmationEmail: publicProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Stripe에서 세션 정보 조회
        const session = await stripe.checkout.sessions.retrieve(
          input.sessionId
        );

        if (session.payment_status !== 'paid') {
          throw new Error('Payment not completed');
        }

        const userInfo = session.metadata;

        if (!userInfo) {
          throw new Error('User information not found');
        }

        // 이메일 발송 설정
        const transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        // 고객에게 보내는 확인 이메일
        const customerMailOptions = {
          from: `"ABM FNC" <fnc@abm.edu.au>`,
          to: userInfo.userEmail,
          subject: `Payment Confirmation - ${userInfo.packageName}`,
          html: `
<div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">        
  <div style="text-align: center; margin-bottom: 20px;"> 
    <img style="margin: 0 auto;" src="https://abm.edu.au/wp-content/uploads/2024/10/Screenshot-2024-10-28-at-3.03.30 PM.png" alt="logo">             
    <h2 style="margin: 0; color: #2c3e50;">Payment Confirmation</h2>        
  </div>        
  <div style="font-size: 16px; line-height: 1.8;">              
    <p>Dear <strong>${userInfo.userName}</strong>,</p>                    
    <p>Thank you for your payment! Your booking has been confirmed.</p>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #2c3e50;">Booking Details:</h3>
      <p><strong>Package:</strong> ${userInfo.packageName}</p>
      <p><strong>Number of Guests:</strong> ${userInfo.numberOfGuests}</p>
      <p><strong>Total Paid:</strong> AUD $${userInfo.totalAmount}</p>
      <p><strong>Contact Phone:</strong> ${userInfo.userPhone}</p>
      ${
        userInfo.additionalRequest
          ? `<p><strong>Additional Requests:</strong> ${userInfo.additionalRequest}</p>`
          : ''
      }
    </div>
    
    <p>We will contact you shortly to discuss the details of your event.</p>
    <p>If you have any questions, please don't hesitate to contact us.</p>
    
    <br>
    <p>Best regards,<br>ABM Functions and Catering Team</p>    
  </div>        
  <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">              
    <p>© 2025 ABM Further Education. All rights reserved.</p>        
  </div>  
</div>
          `,
        };

        // 관리자에게 보내는 알림 이메일
        const adminMailOptions = {
          from: `"ABM FNC" <fnc@abm.edu.au>`,
          to: 'fnc@abm.edu.au',
          subject: `New Payment Received - ${userInfo.packageName}`,
          html: `
<div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">        
  <div style="text-align: center; margin-bottom: 20px;"> 
    <img style="margin: 0 auto;" src="https://abm.edu.au/wp-content/uploads/2024/10/Screenshot-2024-10-28-at-3.03.30 PM.png" alt="logo">             
    <h2 style="margin: 0; color: #2c3e50;">New Payment Received</h2>        
  </div>        
  <div style="font-size: 16px; line-height: 1.8;">              
    <p>Dear <strong>ABM FNC Team</strong>,</p>                    
    <p>A new payment has been received for a catering booking.</p>
    
    <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <h3 style="margin-top: 0; color: #2c3e50;">Customer Details:</h3>
      <p><strong>Name:</strong> ${userInfo.userName}</p>
      <p><strong>Email:</strong> ${userInfo.userEmail}</p>
      <p><strong>Phone:</strong> ${userInfo.userPhone}</p>
      
      <h3 style="color: #2c3e50;">Booking Details:</h3>
      <p><strong>Package:</strong> ${userInfo.packageName}</p>
      <p><strong>Number of Guests:</strong> ${userInfo.numberOfGuests}</p>
      <p><strong>Total Paid:</strong> AUD $${userInfo.totalAmount}</p>
      ${
        userInfo.additionalRequest
          ? `<p><strong>Additional Requests:</strong> ${userInfo.additionalRequest}</p>`
          : ''
      }
      
      <h3 style="color: #2c3e50;">Payment Info:</h3>
      <p><strong>Session ID:</strong> ${input.sessionId}</p>
    </div>
    
    <p>Please follow up with the customer to finalize the event details.</p>
  </div>        
  <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">              
    <p>© 2025 ABM Further Education. All rights reserved.</p>        
  </div>  
</div>
          `,
        };

        // 이메일 발송
        await transporter.sendMail(customerMailOptions);
        await transporter.sendMail(adminMailOptions);

        return { success: true };
      } catch (error) {
        console.error('❌ Email sending error:', error);
        throw new Error('Failed to send confirmation email');
      }
    }),
});
