import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MobileLayout from "@/components/MobileLayout";
import { Heart, Plus, Activity } from "lucide-react";

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowContent(true), 500);
    const timer2 = setTimeout(() => navigate("/auth/phone"), 5000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <MobileLayout showGradientBg>
      <div className="h-full min-h-[932px] w-full min-w-[200px] flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating medical icons */}
          <div className="absolute top-20 left-10 opacity-20 animate-float">
            <Heart className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="absolute top-40 right-16 opacity-15 animate-float stagger-2">
            <Plus className="w-12 h-12 text-primary-foreground" />
          </div>
          <div className="absolute bottom-40 left-20 opacity-20 animate-float stagger-3">
            <Activity className="w-10 h-10 text-primary-foreground" />
          </div>
          <div className="absolute top-60 left-1/2 opacity-10 animate-float stagger-4">
            <Heart className="w-6 h-6 text-primary-foreground" />
          </div>

          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-primary-foreground/10 rounded-full blur-3xl animate-pulse-soft stagger-2" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-secondary/30 rounded-full blur-2xl animate-pulse-soft stagger-3" />
        </div>

        {/* Main content */}
        <div
          className={`flex flex-col items-center z-10 transition-all duration-1000 ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo container */}
          <div className="relative mb-8">
            {/* Pulsing rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-2 border-primary-foreground/20 animate-pulse-ring" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-primary-foreground/10 animate-pulse-ring stagger-2" />
            </div>

            {/* Logo circle */}
            <div className="w-28 h-28 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center shadow-glow">
              <div className="w-20 h-20 rounded-full bg-primary-foreground flex items-center justify-center">
                <Plus className="w-10 h-10 text-primary" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Brand name */}
          <h1 className="text-5xl font-bold text-primary-foreground tracking-tight mb-3">
            Zamda
          </h1>
          <p className="text-primary-foreground/70 text-lg font-medium tracking-wide">
            Your Health, Our Priority
          </p>

          {/* Loading indicator */}
          <div className="mt-16 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce-soft" />
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce-soft stagger-1" />
            <div className="w-2 h-2 rounded-full bg-primary-foreground/60 animate-bounce-soft stagger-2" />
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          className={`absolute text-center bottom-12 transition-all duration-1000 delay-500 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-primary-foreground/50 text-sm">
            Premium Healthcare at Your Fingertips
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SplashScreen;
