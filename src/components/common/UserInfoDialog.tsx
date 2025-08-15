import React, { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import Button from './Button';
import { X } from 'lucide-react';

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  additionalRequest: string;
}

interface ValidationErrors {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserInfoDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (userInfo: UserInfo) => void;
  initialData?: Partial<UserInfo>;
  // Order Summary를 위한 props 추가
  selectedPackage?: string;
  numberOfGuests?: number;
  totalAmount?: number;
}

function UserInfoDialog({
  isOpen,
  setIsOpen,
  onConfirm,
  initialData,
  selectedPackage,
  numberOfGuests,
  totalAmount,
}: UserInfoDialogProps) {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: initialData?.firstName || '',
    lastName: initialData?.lastName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    additionalRequest: initialData?.additionalRequest || '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // 입력 시 해당 필드의 에러 메시지 제거
    if (field in errors) {
      setErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateField = (
    field: keyof ValidationErrors,
    value: string
  ): string => {
    switch (field) {
      case 'firstName':
        return !value.trim() ? 'First name is required' : '';
      case 'lastName':
        return !value.trim() ? 'Last name is required' : '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? 'Please enter a valid email address'
          : '';
      case 'phone':
        return !value.trim() ? 'Phone number is required' : '';
      default:
        return '';
    }
  };

  const validateAndSubmit = () => {
    const newErrors: ValidationErrors = {
      firstName: validateField('firstName', userInfo.firstName),
      lastName: validateField('lastName', userInfo.lastName),
      email: validateField('email', userInfo.email),
      phone: validateField('phone', userInfo.phone),
    };

    setErrors(newErrors);

    // 에러가 있는지 확인
    const hasErrors = Object.values(newErrors).some((error) => error !== '');

    if (hasErrors) {
      return;
    }

    onConfirm(userInfo);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    // 닫을 때 에러 메시지 초기화
    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={handleClose}
    >
      <div className="bg-neutral-900/80 fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-4xl rounded-xl bg-white/5 p-20 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <div className="flex justify-between items-center mb-6">
              <DialogTitle as="h3" className="text-xl font-medium text-white">
                Contact Information & Order Summary
              </DialogTitle>
              <X
                className="text-white cursor-pointer hover:text-gray-300"
                onClick={handleClose}
                size={24}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Information */}
              <div>
                <h4 className="text-lg font-medium text-primary mb-4">
                  Contact Information
                </h4>
                <p className="text-sm text-white/70 mb-6">
                  Please provide your contact information to proceed with the
                  booking.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col">
                    <label className="text-sm text-primary mb-2">
                      First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={userInfo.firstName}
                      onChange={(e) =>
                        handleInputChange('firstName', e.target.value)
                      }
                      className={`h-40 bg-white/10 border text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary p-3 placeholder:text-white/50 ${
                        errors.firstName
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-white/20'
                      }`}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-primary mb-2">
                      Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={userInfo.lastName}
                      onChange={(e) =>
                        handleInputChange('lastName', e.target.value)
                      }
                      className={`h-40 bg-white/10 border text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary p-3 placeholder:text-white/50 ${
                        errors.lastName
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-white/20'
                      }`}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.lastName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-primary mb-2">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        handleInputChange('email', e.target.value)
                      }
                      className={`h-40 bg-white/10 border text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary p-3 placeholder:text-white/50 ${
                        errors.email
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-white/20'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-primary mb-2">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) =>
                        handleInputChange('phone', e.target.value)
                      }
                      className={`h-40 bg-white/10 border text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary p-3 placeholder:text-white/50 ${
                        errors.phone
                          ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                          : 'border-white/20'
                      }`}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && (
                      <span className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-sm text-primary mb-2">
                    Additional Requests
                  </label>
                  <textarea
                    value={userInfo.additionalRequest}
                    onChange={(e) =>
                      handleInputChange('additionalRequest', e.target.value)
                    }
                    className="h-60 bg-white/10 border border-white/20 text-white text-sm focus:ring-2 focus:ring-primary focus:border-primary p-3 resize-none placeholder:text-white/50"
                    placeholder="Any special requests or dietary requirements?"
                  />
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <h4 className="text-lg font-medium text-primary mb-4">
                  Order Summary
                </h4>
                <div className="bg-white/10 border border-white/20 p-6 rounded-lg">
                  {selectedPackage &&
                  numberOfGuests &&
                  totalAmount !== undefined ? (
                    <>
                      <div className="flex justify-between mb-3 text-white">
                        <span className="text-white/70">Package:</span>
                        <span className="font-medium">{selectedPackage}</span>
                      </div>
                      <div className="flex justify-between mb-3 text-white">
                        <span className="text-white/70">Number of Guests:</span>
                        <span className="font-medium">{numberOfGuests}</span>
                      </div>
                      <div className="border-t border-white/20 pt-3 mt-3">
                        <div className="flex justify-between text-white">
                          <span className="text-white/70">
                            Deposit Amount (10%):
                          </span>
                          <span className="font-semibold text-lg text-primary">
                            AUD ${totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-white/5 rounded text-sm text-white/80">
                        <span className="text-yellow-400">*</span> You only need
                        to pay a 10% deposit for now. The remaining balance will
                        be settled on the event day.
                      </div>
                    </>
                  ) : (
                    <div className="text-white/50 text-center py-8">
                      <p>Please select a package and number of guests first.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-20">
              <Button
                onClick={handleClose}
                className="px-6 py-2 bg-transparent border !border-white/30 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={validateAndSubmit}
                className={`px-6 py-2 hover:bg-primary/80 text-white ${
                  !selectedPackage ||
                  !numberOfGuests ||
                  totalAmount === undefined
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
              >
                Continue to Payment
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

export default UserInfoDialog;
