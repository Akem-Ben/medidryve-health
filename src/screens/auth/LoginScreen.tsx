import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, EyeOff, ChevronDown, LogIn } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { africanCountries, AfricanCountry } from "@/types/app";
import { cn } from "@/lib/utils";

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { selectedCountry, setSelectedCountry, setPhoneNumber } = useApp();

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const isFormValid = formData.phone && formData.password;

  const handleLogin = () => {
    if (isFormValid) {
      setPhoneNumber(formData.phone);
      navigate("/auth/otp", { state: { fromLogin: true } });
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
        <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-primary opacity-10 rounded-b-[3rem]" />

        {/* Back button */}
        <button
          onClick={() => navigate("/auth/phone")}
          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-8 transition-all hover:bg-muted/80 active:scale-95 relative z-10"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col relative z-10">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 animate-scale-up">
            <LogIn className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-2 animate-slide-up">
            Welcome back
          </h1>
          <p className="text-muted-foreground mb-8 animate-slide-up stagger-1">
            Log in to continue to Zamda
          </p>

          <div className="space-y-5 animate-slide-up stagger-2">
            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Phone Number *
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCountryPicker(true)}
                  className="flex items-center gap-2 px-4 py-4 bg-muted rounded-xl min-w-[120px] transition-all hover:bg-muted/80"
                >
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="text-sm font-medium text-foreground">
                    {selectedCountry.dialCode}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground ml-auto" />
                </button>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  placeholder="000 000 0000"
                  className="input-field flex-1"
                />
              </div>
            </div>

            {/* Email (optional) */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="john@example.com"
                className="input-field"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="Enter your password"
                  className="input-field pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <button className="text-primary text-sm font-medium hover:underline self-end">
              Forgot password?
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="pb-8 space-y-4 animate-slide-up stagger-3">
          <Button
            onClick={handleLogin}
            disabled={!isFormValid}
            className="w-full"
            size="lg"
          >
            Log In
          </Button>

          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/auth/phone")}
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
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
                <h3 className="text-lg font-semibold text-foreground">
                  Select Country
                </h3>
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
                    <span className="flex-1 text-left font-medium">
                      {country.name}
                    </span>
                    <span className="text-muted-foreground">
                      {country.dialCode}
                    </span>
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

export default LoginScreen;
