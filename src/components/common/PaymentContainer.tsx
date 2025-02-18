'use client';
import React from 'react';
import Button from './Button';
import { trpc } from '@/trpc-client/client';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import Dialog from './Dialog';
import { useParams, useRouter } from 'next/navigation';

function PaymentContainer({
  isCatering,
  scrollToSection,
}: {
  scrollToSection?: () => void;
  isCatering?: boolean;
}) {
  const params = useParams();
  const router = useRouter();
  const [paymentStep, setPaymentStep] = React.useState(0);
  const [selectedpackage, setSelectedPackage] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [numbers, setNumbers] = React.useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);

  const createCheckoutSession = trpc.stripe.createCheckoutSession.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPackage(value);

    setAmount(priceMatch[value as Packages]);
  };

  const purchasePackage = async () => {
    if (!selectedpackage) return;
    try {
      const response = await createCheckoutSession.mutateAsync({
        amount: amount * numbers,
        currency: 'aud',
      });

      if (response.url) {
        const newWindow = window.open(
          response.url,
          '_blank',
          'noopener,noreferrer'
        );

        if (newWindow) {
          newWindow.location.href = response.url; // ✅ Open in new tab safely
        } else {
          window.location.href = response.url; // ✅ Redirect normally if blocked
        }
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    }
  };

  return (
    <div className="z-20 fixed bottom-0 items-center justify-center left-0 right-0 p-20 bg-paymentBg flex md:flex-row flex-col md:gap-40">
      {!selectedpackage && <></>}
      {paymentStep === 1 && (
        <>
          <ArrowLeft
            className="text-primary my-10 ml-10 md:ml-0 md:mt-22 cursor-pointer self-start"
            onClick={() => setPaymentStep(0)}
          />
          <div className="flex gap-10 md:flex-row flex-col">
            <div className="flex flex-col items-start">
              <label className="text-sm text-primary mb-4">
                Which package would you like to choose?
              </label>
              <select
                onChange={handleChange}
                id="select-packages"
                value={selectedpackage}
                className="w-300 h-40 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
              >
                <option value="">Select Packages</option>
                {options.map((option, index) => (
                  <option key={index} value={option} className="bg-darkBg">
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-primary mb-4">
                How many guests will attend your event?
              </label>
              <input
                type="number"
                onChange={(e) => setNumbers(Number(e.target.value))}
                max={100}
                value={numbers}
                className="w-300 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
              />
            </div>
          </div>
        </>
      )}

      {paymentStep === 2 && (
        <>
          <ArrowLeft
            className="text-primary my-10 ml-10 md:ml-0 md:mt-22 cursor-pointer self-start"
            onClick={() => setPaymentStep(1)}
          />

          <div className="text-primary">
            {selectedpackage && (
              <>
                <div className="font-semibold pb-3">{selectedpackage}</div>
                <div className="w-full bg-neutral-600 h-1 mb-3" />
                <div className="text-sm">
                  ${priceMatch[selectedpackage as Packages]} * {numbers} guests
                  =<span className="text-lg ml-5">${amount * numbers}</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
      <Button
        id="Seated Dining"
        className="w-160 h-42 items-center flex justify-center mt-22"
        onClick={() => {
          if (paymentStep === 0) {
            if (!isCatering) return router.push(`/${params.locale}/catering`);
            if (scrollToSection) scrollToSection();
            setPaymentStep(paymentStep + 1);
          }
          if (paymentStep === 1) {
            if (!selectedpackage || !numbers) {
              toast.warning('Please select a package and number of guests');
            } else {
              setPaymentStep(paymentStep + 1);
            }
          }
          if (paymentStep === 2) {
            setIsConfirmModalOpen(true);
          }
        }}
      >
        <span>{paymentStep > 0 ? 'Continue to order' : 'Start Planning'}</span>
      </Button>
      {isConfirmModalOpen && (
        <Dialog
          isOpen={isConfirmModalOpen}
          setIsOpen={setIsConfirmModalOpen}
          title="Payment Process"
          content="Do you want to proceed with the payment?"
          confirmText="Confirm"
          confirmFunction={() => purchasePackage()}
        />
      )}
    </div>
  );
}

export default PaymentContainer;

const options = ['Package 1', 'Package 2', 'Package 3'];

type Packages = 'Package 1' | 'Package 2' | 'Package 3';

const priceMatch: Record<Packages, number> = {
  'Package 1': 28,
  'Package 2': 35,
  'Package 3': 42,
};
