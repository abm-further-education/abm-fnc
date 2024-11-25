import { tinos } from '@/app/layout';
import { cn } from '@/utils/utils';
import React from 'react';
import Button from '../common/Button';
import Divider from '../common/Divider';

function Contact() {
  return (
    <section className="my-120">
      <h2
        className={cn(tinos.className, 'text-4xl text-center text-secondary')}
      >
        Let&apos;s get in touch
      </h2>
      <Divider />
      <form className="flex flex-col max-w-500 gap-15 mx-auto mt-20">
        <input
          type="text"
          placeholder="Name"
          className="rounded-sm bg-inputBg/30 placeholder:text-bg placeholder:text-sm p-6"
        />
        <input
          type="text"
          placeholder="Email"
          className="rounded-sm bg-inputBg/30 placeholder:text-bg placeholder:text-sm p-6"
        />
        <input
          type="text"
          placeholder="Phone"
          className="rounded-sm bg-inputBg/30 placeholder:text-bg placeholder:text-sm p-6"
        />
        <textarea
          placeholder="Message"
          className="rounded-sm bg-inputBg/30 placeholder:text-bg placeholder:text-sm p-6"
        />
        <Button className="mt-16" type="submit">
          Send a Message
        </Button>
      </form>
    </section>
  );
}

export default Contact;
