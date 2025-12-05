import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";

// Screens
import SplashScreen from "@/screens/SplashScreen";
import PhoneInputScreen from "@/screens/auth/PhoneInputScreen";
import OTPScreen from "@/screens/auth/OTPScreen";
import RegisterScreen from "@/screens/auth/RegisterScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import DashboardScreen from "@/screens/DashboardScreen";
import OrdersScreen from "@/screens/OrdersScreen";
import AccountScreen from "@/screens/AccountScreen";
import SettingsScreen from "@/screens/SettingsScreen";
import CartScreen from "@/screens/CartScreen";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/auth/phone" element={<PhoneInputScreen />} />
            <Route path="/auth/otp" element={<OTPScreen />} />
            <Route path="/auth/register" element={<RegisterScreen />} />
            <Route path="/auth/login" element={<LoginScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="/account" element={<AccountScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
