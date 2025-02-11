'use client';
import { tinos } from '@/app/[locale]/layout';
import { cn } from '@/utils/utils';
import React from 'react';
import Button from '../common/Button';
import Divider from '../common/Divider';
import { useForm, SubmitHandler } from 'react-hook-form';
import { trpc } from '@/trpc-client/client';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function Contact({
  isFromSteps,
  eventType,
  numbers,
  budget,
}: {
  isFromSteps?: boolean;
  eventType?: string;
  numbers?: string;
  budget?: string;
}) {
  const { register, handleSubmit } = useForm<ContactFormData>();
  const sendEmailMutation = trpc.contact.sendEmail.useMutation();

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    if (!data.email) alert('Please enter your email address.');
    else {
      try {
        await sendEmailMutation.mutateAsync({
          ...data,
          eventType,
          numbers,
          budget,
        });
        alert('Email sent successfully!');
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again.');
      }
    }
  };

  return (
    <section className={cn('px-16 md:px-0', isFromSteps ? 'my-30' : 'my-120')}>
      {!isFromSteps && (
        <>
          <h2
            className={cn(
              tinos.className,
              'text-4xl text-center text-secondary'
            )}
          >
            Let&apos;s get in touch
          </h2>
          <Divider />
        </>
      )}
      <form
        className="flex flex-col max-w-500 gap-15 mx-auto mt-20 text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Name"
          {...register('name')}
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <input
          type="text"
          placeholder="Email"
          {...register('email')}
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <input
          type="text"
          placeholder="Phone"
          {...register('phone')}
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <textarea
          placeholder="Message"
          {...register('message')}
          className="rounded-sm bg-inputBg/30 placeholder:text-black placeholder:text-sm p-6"
        />
        <Button className="mt-16" type="submit">
          Send a Message
        </Button>
      </form>
    </section>
  );
}

export default Contact;
