import { router, publicProcedure } from '../index';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const contactRouter = router({
  sendEmail: publicProcedure
    .input(
      z.object({
        eventType: z.string().optional(),
        numbers: z.string().optional(),
        budget: z.string().optional(),
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, phone, message } = input;

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: `"Hannah Yoon" <Hannah.Yoon@abm.edu.au>`,
        to: email,
        subject: `New Inquiry from Contact Form_${name}_${phone}`,
        text: `${message}\n\n*phone number: ${phone}`,
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <p style="font-size: 16px;">This is test email.</p>
      <p style="font-size: 16px;">${message}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
      <p><strong>📞 Phone Number:</strong> ${phone}</p>
    </div>
  `,
      };

      await transporter.sendMail(mailOptions);

      return { success: true };
    }),
});
