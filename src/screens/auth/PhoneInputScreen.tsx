import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { ChevronDown, Phone, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { africanCountries, AfricanCountry } from '@/types/app';
import { cn } from '@/lib/utils';

const PhoneInputScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry, setSelectedCountry, phoneNumber, setPhoneNumber } = useApp();
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const handleContinue = () => {
    if (phoneNumber.length >= 8) {
      navigate('/auth/otp');
    }
  };

  const selectCountry = (country: AfricanCountry) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col screen-padding relative">
        {/* Header decoration */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-primary opacity-10 rounded-b-[3rem]" />
        
        {/* Content */}
        <div className="flex-1 flex flex-col pt-16 relative z-10">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 animate-scale-up">
            <Phone className="w-10 h-10 text-primary" />
          </div>

          {/* Title */}
          <div className='flex flex-col gap-6'>
          <h1 className="text-3xl font-bold text-foreground mb-3 animate-slide-up">
            Enter your phone number
          </h1>
          <p className="text-muted-foreground mb-10 animate-slide-up stagger-1">
            We'll send you a verification code to confirm your identity
          </p>
          </div>

          {/* Phone input */}
          <div className="space-y-4 animate-slide-up stagger-2">
            <label className="text-sm font-medium text-foreground">Phone Number</label>
            <div className="flex gap-3">
              {/* Country selector */}
              <button
                onClick={() => setShowCountryPicker(true)}
                className="flex items-center gap-2 px-4 py-4 bg-muted rounded-xl min-w-[120px] transition-all hover:bg-muted/80"
              >
                <span className="text-2xl">{selectedCountry.flag}</span>
                <span className="text-sm font-medium text-foreground">{selectedCountry.dialCode}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
              </button>

              {/* Phone input */}
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                placeholder="000 000 0000"
                className="input-field flex-1 text-lg tracking-wide"
                maxLength={15}
              />
            </div>
          </div>

          {/* Info text */}
          <p className="text-xs text-muted-foreground mt-4 animate-slide-up stagger-3">
            By continuing, you agree to receive SMS messages for verification purposes.
          </p>
        </div>

        {/* Continue button */}
        <div className="pb-8 animate-slide-up stagger-4">
          <Button
            onClick={handleContinue}
            disabled={phoneNumber.length < 8}
            className="w-full"
            size="lg"
          >
            Continue
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Country picker modal */}
        {showCountryPicker && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setShowCountryPicker(false)}
            />
            <div className="relative w-full max-w-md bg-card rounded-t-3xl max-h-[70vh] overflow-hidden animate-slide-in-bottom">
              <div className="sticky top-0 bg-card border-b border-border p-4">
                <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground">Select Country</h3>
              </div>
              <div className="overflow-y-auto max-h-[60vh] p-2">
                {africanCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => selectCountry(country)}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                      selectedCountry.code === country.code
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <span className="text-2xl">{country.flag}</span>
                    <span className="flex-1 text-left font-medium">{country.name}</span>
                    <span className="text-muted-foreground">{country.dialCode}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default PhoneInputScreen;
