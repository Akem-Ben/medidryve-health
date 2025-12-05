import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import { useApp } from '@/contexts/AppContext';
import { User, Mail, Phone, Calendar, MapPin, ChevronRight, Edit2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AccountScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, setIsAuthenticated, setUser } = useApp();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
  };

  const accountItems = [
    { icon: User, label: 'Full Name', value: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Not set' },
    { icon: Phone, label: 'Phone', value: user?.phone || 'Not set' },
    { icon: Mail, label: 'Email', value: user?.email || 'Not set' },
    { icon: Calendar, label: 'Date of Birth', value: user?.dateOfBirth || 'Not set' },
    { icon: MapPin, label: 'Address', value: user?.address || 'Not set' },
  ];

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col pb-20">
        {/* Header */}
        <div className="screen-padding pb-4 sticky top-0 bg-background/80 backdrop-blur-lg z-20 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Account</h1>
        </div>

        {/* Profile section */}
        <div className="px-5 py-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {user?.firstName?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground">
                {user?.firstName || 'User'} {user?.lastName || ''}
              </h2>
              <p className="text-muted-foreground">{user?.email || 'No email set'}</p>
            </div>
            <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Edit2 className="w-5 h-5 text-primary" />
            </button>
          </div>

          {/* Account details */}
          <div className="card-elevated divide-y divide-border">
            {accountItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              );
            })}
          </div>

          {/* Logout button */}
          <div className="mt-8">
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="w-full"
              size="lg"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Log Out
            </Button>
          </div>
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default AccountScreen;
