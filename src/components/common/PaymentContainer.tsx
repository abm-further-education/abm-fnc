'use client';
import React from 'react';
import Button from './Button';
import { trpc } from '@/trpc-client/client';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import Dialog from './Dialog';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
// import { packagesInfo } from '../view/Catering/Menu';

// 사용자 정보 타입 정의
interface UserInfo {
  name: string;
  email: string;
  phone: string;
  additionalRequest: string;
}

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

  // 사용자 정보 상태 추가
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    name: '',
    email: '',
    phone: '',
    additionalRequest: '',
  });

  const createCheckoutSession = trpc.stripe.createCheckoutSession.useMutation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedPackage(value);

    setAmount(priceMatch[value as Packages]);
  };

  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const purchasePackage = async () => {
    if (
      !selectedpackage ||
      !userInfo.name ||
      !userInfo.email ||
      !userInfo.phone
    )
      return;
    try {
      const response = await createCheckoutSession.mutateAsync({
        amount: amount * numbers * 0.1,
        currency: 'aud',
        userInfo: {
          ...userInfo,
          packageName: selectedpackage,
          numberOfGuests: numbers,
          totalAmount: amount * numbers * 0.1,
        },
      });

      if (response.url) {
        const newWindow = window.open(
          response.url,
          '_blank',
          'noopener,noreferrer'
        );

        if (newWindow) {
          newWindow.location.href = response.url;
        } else {
          window.location.href = response.url;
        }
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
    }
  };

  const validateUserInfo = () => {
    if (!userInfo.name) {
      toast.warning('Please enter your name');
      return false;
    }
    if (!userInfo.email) {
      toast.warning('Please enter your email');
      return false;
    }
    if (!userInfo.phone) {
      toast.warning('Please enter your phone number');
      return false;
    }
    return true;
  };

  return (
    <div
      className={cn(
        `z-20 fixed bottom-0 items-center justify-center left-0 right-0 p-20 bg-paymentBg flex md:flex-row flex-col md:gap-40`,
        paymentStep === 2 || paymentStep === 3 ? 'md:h-200' : ''
      )}
    >
      {!selectedpackage && <></>}

      {/* Step 1: Package Selection */}
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

      {/* Step 2: User Information */}
      {paymentStep === 2 && (
        <>
          <ArrowLeft
            className="text-primary my-10 ml-10 md:ml-0 md:mt-22 cursor-pointer self-start"
            onClick={() => setPaymentStep(1)}
          />
          <div className="flex gap-10 md:flex-row flex-col w-full max-w-800">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col">
                <label className="text-sm text-primary mb-2">Name *</label>
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => handleUserInfoChange('name', e.target.value)}
                  className="w-full h-40 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-primary mb-2">Email *</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    handleUserInfoChange('email', e.target.value)
                  }
                  className="w-full h-40 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col">
                <label className="text-sm text-primary mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) =>
                    handleUserInfoChange('phone', e.target.value)
                  }
                  className="w-full h-40 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
                  placeholder="Enter your phone number"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-primary mb-2">
                  Additional Requests
                </label>
                <textarea
                  value={userInfo.additionalRequest}
                  onChange={(e) =>
                    handleUserInfoChange('additionalRequest', e.target.value)
                  }
                  className="w-full h-20 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5 resize-none"
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 3: Payment Summary */}
      {paymentStep === 3 && (
        <>
          <ArrowLeft
            className="text-primary my-10 ml-10 md:ml-0 md:mt-22 cursor-pointer self-start"
            onClick={() => setPaymentStep(2)}
          />
          <div className="flex flex-col gap-4 w-full max-w-600">
            <h3 className="text-primary text-lg font-semibold">
              Order Summary
            </h3>
            <div className="bg-darkBg border border-secondary p-4 rounded text-primary">
              <div className="flex justify-between mb-2">
                <span>Package:</span>
                <span>{selectedpackage}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Number of Guests:</span>
                <span>{numbers}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Name:</span>
                <span>{userInfo.name}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Email:</span>
                <span>{userInfo.email}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Phone:</span>
                <span>{userInfo.phone}</span>
              </div>
              {userInfo.additionalRequest && (
                <div className="flex justify-between mb-2">
                  <span>Additional Requests:</span>
                  <span className="text-right max-w-300">
                    {userInfo.additionalRequest}
                  </span>
                </div>
              )}
              <div className="border-t border-secondary pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>AUD ${(amount * numbers * 0.1).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Button
        id="payment-button"
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
            if (validateUserInfo()) {
              setPaymentStep(paymentStep + 1);
            }
          }
          if (paymentStep === 3) {
            setIsConfirmModalOpen(true);
          }
        }}
      >
        <span>
          {paymentStep === 0
            ? 'Start Planning'
            : paymentStep === 3
            ? 'Proceed to Payment'
            : 'Continue to order'}
        </span>
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

const options = ['Package 1', 'Package 2', 'Package 3'] as const;

type Packages = (typeof options)[number];

const priceMatch: Record<Packages, number> = {
  'Package 1': 28,
  'Package 2': 35,
  'Package 3': 42,
};
