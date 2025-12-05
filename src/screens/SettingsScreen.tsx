import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import { Bell, Shield, Globe, HelpCircle, FileText, ChevronRight, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const settingsGroups = [
  {
    title: 'Preferences',
    items: [
      { icon: Bell, label: 'Notifications', description: 'Manage push notifications' },
      { icon: Moon, label: 'Appearance', description: 'Dark mode & themes' },
      { icon: Globe, label: 'Language', description: 'English (US)' },
    ],
  },
  {
    title: 'Security',
    items: [
      { icon: Shield, label: 'Privacy', description: 'Manage your data' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Center', description: 'Get help with the app' },
      { icon: FileText, label: 'Terms of Service', description: 'Read our terms' },
    ],
  },
];

const SettingsScreen: React.FC = () => {
  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col pb-20">
        {/* Header */}
        <div className="screen-padding pb-4 sticky top-0 bg-background/80 backdrop-blur-lg z-20 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        {/* Settings groups */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {group.title}
              </h3>
              <div className="card-elevated divide-y divide-border">
                {group.items.map((item, itemIndex) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* App version */}
          <p className="text-center text-sm text-muted-foreground">
            Version 1.0.0
          </p>
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default SettingsScreen;
