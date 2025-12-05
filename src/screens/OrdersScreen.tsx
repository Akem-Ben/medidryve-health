import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import { Package, Clock, CheckCircle2, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const orders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: 3,
    total: 12500,
  },
  {
    id: 'ORD-002',
    date: '2024-01-18',
    status: 'in-transit',
    items: 2,
    total: 8200,
  },
  {
    id: 'ORD-003',
    date: '2024-01-20',
    status: 'processing',
    items: 5,
    total: 24300,
  },
];

const statusConfig = {
  'processing': { icon: Clock, color: 'text-warning', bg: 'bg-warning/10', label: 'Processing' },
  'in-transit': { icon: Truck, color: 'text-primary', bg: 'bg-primary/10', label: 'In Transit' },
  'delivered': { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Delivered' },
};

const OrdersScreen: React.FC = () => {
  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col pb-20">
        {/* Header */}
        <div className="screen-padding pb-4 sticky top-0 bg-background/80 backdrop-blur-lg z-20 border-b border-border">
          <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;
              
              return (
                <div key={order.id} className="card-elevated p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-foreground">{order.id}</span>
                    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full", status.bg)}>
                      <StatusIcon className={cn("w-3.5 h-3.5", status.color)} />
                      <span className={cn("text-xs font-medium", status.color)}>{status.label}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{order.items} items</span>
                    <span className="font-semibold text-primary">{formatPrice(order.total)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{order.date}</p>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <Package className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">No orders yet</h3>
              <p className="text-muted-foreground text-sm">Your orders will appear here</p>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default OrdersScreen;
