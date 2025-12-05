import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye, EyeOff, Calendar, Check, Pencil } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const RegisterScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry, phoneNumber, setUser, setIsAuthenticated } = useApp();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
    age: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return hasMinLength && hasUppercase && hasLowercase && hasNumber;
  };

  const passwordCriteria = [
    { label: 'At least 6 characters', met: formData.password.length >= 6 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'Number', met: /\d/.test(formData.password) },
  ];

  const allAgreementsChecked = agreements.privacy && agreements.terms && agreements.age;
  
  const isFormValid = 
    formData.firstName && 
    formData.lastName && 
    validatePassword(formData.password) &&
    formData.password === formData.confirmPassword &&
    formData.dateOfBirth &&
    allAgreementsChecked;

  const handleSubmit = () => {
    if (isFormValid) {
      setUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: `${selectedCountry.dialCode}${phoneNumber}`,
        email: formData.email || undefined,
        dateOfBirth: formData.dateOfBirth,
      });
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  };

  const handleGoogleSignUp = () => {
    if (allAgreementsChecked) {
      // Simulate Google sign up
      setUser({
        firstName: 'Google',
        lastName: 'User',
        phone: `${selectedCountry.dialCode}${phoneNumber}`,
        email: 'user@gmail.com',
      });
      setIsAuthenticated(true);
      navigate('/dashboard');
    }
  };

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-background/80 backdrop-blur-lg z-10 screen-padding pb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-all hover:bg-muted/80 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-6">Fill in your details to get started</p>

          <div className="space-y-5">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  placeholder="John"
                  className="input-field"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  placeholder="Doe"
                  className="input-field"
                />
              </div>
            </div>

            {/* Phone (read-only) */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Phone Number</label>
              <div className="flex items-center gap-2">
                <div className="input-field flex-1 flex items-center gap-2 bg-muted/50">
                  <span className="text-lg">{selectedCountry.flag}</span>
                  <span className="text-muted-foreground">{selectedCountry.dialCode} {phoneNumber}</span>
                </div>
                <button
                  onClick={() => navigate('/auth/phone')}
                  className="p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email (Optional)</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
                className="input-field"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Create a strong password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password criteria */}
              {formData.password && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {passwordCriteria.map((criteria, i) => (
                    <div key={i} className="flex items-center gap-1 text-xs">
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center",
                        criteria.met ? "bg-success" : "bg-muted"
                      )}>
                        <Check className={cn("w-2.5 h-2.5", criteria.met ? "text-success-foreground" : "text-muted-foreground")} />
                      </div>
                      <span className={criteria.met ? "text-success" : "text-muted-foreground"}>
                        {criteria.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  className={cn(
                    "input-field pr-12",
                    formData.confirmPassword && formData.password !== formData.confirmPassword && "ring-2 ring-destructive"
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwords don't match</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Date of Birth *</label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                  className="input-field"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Agreements */}
            <div className="space-y-3 pt-2">
              {[
                { key: 'privacy', label: 'I agree to the Privacy Policy' },
                { key: 'terms', label: 'I agree to the Terms & Conditions' },
                { key: 'age', label: 'I confirm that I am above 18 years old' },
              ].map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setAgreements(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 mt-0.5",
                      agreements[item.key as keyof typeof agreements]
                        ? "bg-primary border-primary"
                        : "border-border"
                    )}
                  >
                    {agreements[item.key as keyof typeof agreements] && (
                      <Check className="w-4 h-4 text-primary-foreground" />
                    )}
                  </button>
                  <span className="text-sm text-foreground">{item.label}</span>
                </label>
              ))}
            </div>

            {/* Google Sign Up */}
            <div className="pt-4">
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-border flex-1" />
                <span className="px-4 text-sm text-muted-foreground">or</span>
                <div className="border-t border-border flex-1" />
              </div>
              
              <Button
                onClick={handleGoogleSignUp}
                disabled={!allAgreementsChecked}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign up with Google
              </Button>
              {!allAgreementsChecked && (
                <p className="text-xs text-center text-muted-foreground mt-2">
                  Please accept all agreements to continue with Google
                </p>
              )}
            </div>

            {/* Submit button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full"
              size="lg"
            >
              Create Account
            </Button>

            {/* Login link */}
            <p className="text-center text-muted-foreground">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/auth/login')}
                className="text-primary font-semibold hover:underline"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default RegisterScreen;
