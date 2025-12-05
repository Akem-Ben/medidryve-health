import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const OTPScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCountry, phoneNumber, setIsAuthenticated } = useApp();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const isFromLogin = location.state?.fromLogin;

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
  };

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      if (isFromLogin) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        navigate('/auth/register');
      }
    }
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col screen-padding">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-8 transition-all hover:bg-muted/80 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 animate-scale-up">
            <ShieldCheck className="w-10 h-10 text-secondary" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground mb-3 animate-slide-up">
            Verify your number
          </h1>
          <p className="text-muted-foreground mb-2 animate-slide-up stagger-1">
            We've sent a 6-digit code to
          </p>
          <p className="text-foreground font-semibold mb-10 animate-slide-up stagger-1">
            {selectedCountry.flag} {selectedCountry.dialCode} {phoneNumber}
          </p>

          {/* OTP inputs */}
          <div className="flex justify-center gap-3 mb-8 animate-slide-up stagger-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={cn(
                  "otp-box",
                  digit && "ring-2 ring-primary bg-primary/5"
                )}
              />
            ))}
          </div>

          {/* Resend */}
          <div className="text-center animate-slide-up stagger-3">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-primary font-semibold hover:underline"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-muted-foreground">
                Resend code in <span className="text-primary font-semibold">{countdown}s</span>
              </p>
            )}
          </div>
        </div>

        {/* Verify button */}
        <div className="pb-8 animate-slide-up stagger-4">
          <Button
            onClick={handleVerify}
            disabled={!isComplete}
            className="w-full"
            size="lg"
          >
            Verify
          </Button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default OTPScreen;
