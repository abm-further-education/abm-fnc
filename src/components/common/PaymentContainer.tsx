'use client';
import React from 'react';
import Button from './Button';
import { trpc } from '@/trpc-client/client';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import Dialog from './Dialog';
import UserInfoDialog, { UserInfo } from './UserInfoDialog';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

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
  const [isUserInfoDialogOpen, setIsUserInfoDialogOpen] = React.useState(false);

  // 사용자 정보 상태
  const [userInfo, setUserInfo] = React.useState<UserInfo>({
    firstName: '',
    lastName: '',
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

  const handleUserInfoConfirm = (newUserInfo: UserInfo) => {
    setUserInfo(newUserInfo);
    setIsConfirmModalOpen(true); // 사용자 정보 입력 후 바로 결제 확인으로 이동
  };

  const purchasePackage = async () => {
    if (
      !selectedpackage ||
      !userInfo.firstName ||
      !userInfo.lastName ||
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
          name: `${userInfo.firstName} ${userInfo.lastName}`,
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

  return (
    <div
      className={cn(
        `z-20 fixed bottom-0 items-center justify-center left-0 right-0 p-20 bg-paymentBg flex md:flex-row flex-col md:gap-40`
      )}
    >
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
                min={0}
                max={100}
                value={numbers}
                className="w-300 bg-darkBg border border-secondary text-primary text-sm focus:ring-secondary focus:border-secondary p-2.5"
              />
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
              setIsUserInfoDialogOpen(true); // 사용자 정보 Dialog 열기
            }
          }
        }}
      >
        <span>
          {paymentStep === 0 ? 'Start Planning' : 'Continue to order'}
        </span>
      </Button>

      {/* 사용자 정보 입력 Dialog */}
      <UserInfoDialog
        isOpen={isUserInfoDialogOpen}
        setIsOpen={setIsUserInfoDialogOpen}
        onConfirm={handleUserInfoConfirm}
        initialData={userInfo}
        selectedPackage={selectedpackage}
        numberOfGuests={numbers}
        totalAmount={amount * numbers * 0.1}
      />

      {/* 결제 확인 Dialog */}
      {isConfirmModalOpen && (
        <Dialog
          isOpen={isConfirmModalOpen}
          setIsOpen={setIsConfirmModalOpen}
          title="Payment Process"
          content={`You are about to pay AUD $${(
            amount *
            numbers *
            0.1
          ).toFixed(
            2
          )} for ${selectedpackage} (${numbers} guests). Do you want to proceed with the payment?`}
          confirmText="Confirm Payment"
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
