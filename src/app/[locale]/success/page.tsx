'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { trpc } from '@/trpc-client/client';
import { tinos } from '../layout';
import { cn } from '@/lib/utils';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [emailSent, setEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const sendConfirmationEmail =
    trpc.stripe.sendPaymentConfirmationEmail.useMutation();

  useEffect(() => {
    const sendEmail = async () => {
      if (sessionId && !emailSent) {
        try {
          await sendConfirmationEmail.mutateAsync({ sessionId });
          setEmailSent(true);
        } catch (error) {
          console.error('Failed to send confirmation email:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    sendEmail();
  }, [sessionId, emailSent, sendConfirmationEmail]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-darkBg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-primary">Processing your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-2xl rounded-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className={cn(tinos.className, 'text-2xl text-primary mb-2')}>
            Payment Successful!
          </h1>
          <p className="text-white/70 mb-6">
            Thank you for your booking. Your payment has been processed
            successfully.
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6">
          {emailSent ? (
            <div className="text-green-400 text-sm">
              ✅ Confirmation email has been sent to your email address.
            </div>
          ) : (
            <div className="text-yellow-400 text-sm">
              ⚠️ We&lsquo;re processing your confirmation email.
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-white/60 text-sm">
            We will contact you shortly to discuss the details of your event.
          </p>
          <p className="text-white/60 text-sm">
            A confirmation email with your booking details has been sent to you.
          </p>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            onClick={() => router.push('/')}
            className="w-full bg-primary hover:bg-primary/80 text-white py-3"
          >
            Return to Home
          </Button>
          <Button
            onClick={() => router.push('/contact')}
            className="w-full bg-transparent border border-primary text-primary hover:bg-primary hover:text-white py-3"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}
