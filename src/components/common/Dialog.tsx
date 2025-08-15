import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Button from './Button';
import { X } from 'lucide-react';

function DialogContainer({
  isOpen,
  setIsOpen,
  title,
  content,
  confirmText,
  confirmFunction,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  content: string;
  confirmText: string;
  confirmFunction: () => void;
}) {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-20 focus:outline-none"
      onClose={() => setIsOpen(false)}
    >
      <div className="bg-neutral-900/80 px-32 fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/5 p-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <X
              className="float-right text-white"
              onClick={() => setIsOpen(false)}
            />
            <DialogTitle as="h3" className="text-base/7 font-medium text-white">
              {title}
            </DialogTitle>
            <p className="mt-2 text-sm/6 text-white/50">{content}</p>
            <div className="mt-4">
              <Button
                className="flex items-center gap-2 hover:bg-darkBg mt-10 px-6 text-sm/6 font-semibold text-white focus:outline-none "
                onClick={confirmFunction}
              >
                {confirmText}
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default DialogContainer;
