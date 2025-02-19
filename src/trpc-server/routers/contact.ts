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
      const { name, email, phone, message, eventType, numbers, budget } = input;

      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // 🎯 첫 번째 수신자 (사용자에게 전송)
      const userMailOptions = {
        from: `"ABM FNC" <fnc@abm.edu.au>`,
        to: email,
        subject: `Thank you for your inquiry, ${name}!`,
        text: `Hello ${name},\n\nThank you for reaching out. We have received your inquiry and will get back to you soon.\n\nBest,\nABM FNC`,
        html: `
        <div style="max-width: 700px; margin: 20px auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">        
  <div style="text-align: center; margin-bottom: 20px;"> 
    <img style="margin: 0 auto;" src="https://abm.edu.au/wp-content/uploads/2024/10/Screenshot-2024-10-28-at-3.03.30 PM.png" alt="logo">             
    <h2 style="margin: 0;">Thank you for your inquiry.</h2>        
  </div>        
  <div style="font-size: 16px; line-height: 1.8; text-align:center">              
    <p>Dear             
      <strong>${name}</strong>,        
    </p>        
    <br>                    
    <p>Thank you for reaching out.<br/>We have received your inquiry and will get back to you soon.</p> 
    <br>           
    <p>If you have any questions or need assistance, please don't hesitate to contact us.            
      <br>            
      <br>Thank you for choosing ABM FNC.        
    </p>        
  </div>        
  <div style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">              
  <a href="https://abmfnc.com.au/">abmfnc.com.au</a>
  <p>fnc@abm.edu.au</p>
  <p>+61 (02) 9160 4507 M (WhatsApp) + 61 482 796 010</p>
  <p>Shop 22, The Quay Haymarket, 61-79 Quay Street, Haymarket, 2000</p>
    <p>© 2025 ABM Further Education. All rights reserved.</p>        
  </div>  
</div>
        `,
      };

      // 🎯 두 번째 수신자 (관리자에게 전송)
      const adminMailOptions = {
        from: `"ABM FNC" <fnc@abm.edu.au>`,
        to: 'fnc@abm.edu.au', // 📌 관리자 이메일 입력
        subject: `New Inquiry from ${name} (${phone})`,
        text: `You have received a new inquiry from ${name}.\n\nMessage: ${message}\n\nContact: ${phone}, ${email}`,
        html: `
<div style="max-width: 600px; margin: 20px auto; background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">        
<div style="text-align: center; margin-bottom: 20px;"> 
  <img style="margin: 0 auto;" src="https://abm.edu.au/wp-content/uploads/2024/10/Screenshot-2024-10-28-at-3.03.30 PM.png" alt="logo">             
  <h2 style="margin: 0;">New Inquiry</h2>        
</div>        
<div style="font-size: 16px; line-height: 1.8;">              
  <p>Dear             
    <strong>ABM FNC</strong>,        
  </p>                    
    <p><strong>New Inquiry Received</strong></p>
            <p><strong>Event Type:</strong> ${eventType || '-'}</p>
            <p><strong>Numbers:</strong> ${numbers || '-'}</p>
            <p><strong>Budget:</strong> ${budget || '-'}</p> <hr>
            <p><strong>Name:</strong> ${name || '-'}</p>
            <p><strong>Email:</strong> ${email || '-'}</p>
            <p><strong>Phone:</strong> ${phone || '-'}</p> <hr>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
    
  <br>    
</div>        
<div style="margin-top: 20px; text-align: center; font-size: 14px; color: #777;">              
  <p>© 2025 ABM Further Education. All rights reserved.</p>        
</div>  
</div>
        `,
      };

      // ✅ 이메일 두 개 발송 (각각 다른 내용)
      await transporter.sendMail(userMailOptions);
      await transporter.sendMail(adminMailOptions);

      return { success: true };
    }),
});
