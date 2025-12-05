import React from 'react';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

const CartScreen: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cart.length > 0 ? 1500 : 0;
  const total = subtotal + deliveryFee;

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col pb-20">
        {/* Header */}
        <div className="screen-padding pb-4 sticky top-0 bg-background/80 backdrop-blur-lg z-20 border-b border-border flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Cart</h1>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-destructive text-sm font-medium"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="card-elevated p-4 flex gap-4">
                  <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground line-clamp-2 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-primary font-bold">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Your cart is empty</h3>
              <p className="text-muted-foreground text-sm">Add items to get started</p>
            </div>
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="px-5 pb-4 border-t border-border pt-4 space-y-4 bg-background">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className="font-medium">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
            <Button size="lg" className="w-full">
              Checkout
            </Button>
          </div>
        )}

        <BottomNav />
      </div>
    </MobileLayout>
  );
};

export default CartScreen;
