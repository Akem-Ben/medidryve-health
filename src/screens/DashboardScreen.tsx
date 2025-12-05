import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/MobileLayout';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Bell, MapPin, ChevronRight, Heart, Plus, Calendar, FileText, X, Stethoscope, Pill, Syringe, TestTube, Brain, Bone, Eye as EyeIcon, Baby } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';
import { Product, Category } from '@/types/app';
import paraImg from '../assets/para.jpg';
import vitC from '../assets/vitamin-c.webp';
import ibruImg from '../assets/ibru.jpg';
import multivImg from '../assets/multi.webp';
import coughImg from '../assets/cough.jpg';
import handSanitzImg from '../assets/sanitizer.webp';

const bannerSlides = [
  {
    title: "Your Health Matters",
    subtitle: "Book an appointment today",
    gradient: "from-primary to-primary/70",
  },
  {
    title: "24/7 Care Available",
    subtitle: "Telemedicine consultations",
    gradient: "from-secondary to-secondary/70",
  },
  {
    title: "Save Up to 30%",
    subtitle: "On prescription medications",
    gradient: "from-primary via-secondary to-primary",
  },
];

const categories: Category[] = [
  { id: '1', name: 'General', icon: 'stethoscope', color: 'bg-primary/10 text-primary' },
  { id: '2', name: 'Pharmacy', icon: 'pill', color: 'bg-secondary/10 text-secondary' },
  { id: '3', name: 'Vaccines', icon: 'syringe', color: 'bg-success/10 text-success' },
  { id: '4', name: 'Lab Tests', icon: 'test-tube', color: 'bg-warning/10 text-warning' },
  { id: '5', name: 'Mental', icon: 'brain', color: 'bg-accent text-accent-foreground' },
  { id: '6', name: 'Orthopedic', icon: 'bone', color: 'bg-destructive/10 text-destructive' },
  { id: '7', name: 'Optical', icon: 'eye', color: 'bg-primary/10 text-primary' },
  { id: '8', name: 'Pediatric', icon: 'baby', color: 'bg-secondary/10 text-secondary' },
];

const products: Product[] = [
  { id: '1', name: 'Paracetamol 500mg', price: 2500, image: paraImg, category: 'Pain Relief', isLiked: false },
  { id: '2', name: 'Vitamin C 1000mg', price: 4500, image: vitC, category: 'Vitamins', isLiked: true },
  { id: '3', name: 'Ibuprofen 400mg', price: 3200, image: ibruImg, category: 'Pain Relief', isLiked: false },
  { id: '4', name: 'Multivitamins', price: 8500, image: multivImg, category: 'Vitamins', isLiked: false },
  { id: '5', name: 'Cough Syrup', price: 3800, image: coughImg, category: 'Cold & Flu', isLiked: true },
  { id: '6', name: 'Hand Sanitizer', price: 1500, image: handSanitzImg, category: 'Hygiene', isLiked: false },
];

const CategoryIcon: React.FC<{ icon: string; className?: string }> = ({ icon, className }) => {
  const icons: Record<string, React.ReactNode> = {
    'stethoscope': <Stethoscope className={className} />,
    'pill': <Pill className={className} />,
    'syringe': <Syringe className={className} />,
    'test-tube': <TestTube className={className} />,
    'brain': <Brain className={className} />,
    'bone': <Bone className={className} />,
    'eye': <EyeIcon className={className} />,
    'baby': <Baby className={className} />,
  };
  return <>{icons[icon] || <Stethoscope className={className} />}</>;
};

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, addToCart, isAuthenticated } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: p.isLiked || false }), {})
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const toggleLike = (productId: string) => {
    setLikedProducts(prev => ({ ...prev, [productId]: !prev[productId] }));
  };

  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };

  return (
    <MobileLayout>
      <div className="h-full min-h-[932px] flex flex-col pb-20 overflow-y-auto">
        {/* Header */}
        <div className="screen-padding pb-4 sticky top-0 bg-background/80 backdrop-blur-lg z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                {user?.firstName?.[0] || 'U'}
              </div>
              <div className='flex items-center gap-2'>
                <p className="text-sm text-muted-foreground">Hi,</p>
                <h2 className="font-semibold text-foreground">{user?.firstName || 'User'}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center relative">
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-destructive rounded-full" />
              </button>
            </div>
          </div>
          
          {/* Address */}
          <button className="flex items-center gap-2 mt-3 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{user?.address || '123 Health Street, Lagos'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Banner Carousel */}
        <div className="px-5 mb-6">
          <div className="relative overflow-hidden rounded-2xl h-40">
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {bannerSlides.map((slide, index) => (
                <div
                  key={index}
                  className={cn(
                    "min-w-full h-full p-6 flex flex-col justify-center bg-gradient-to-r",
                    slide.gradient
                  )}
                >
                  <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                    {slide.title}
                  </h3>
                  <p className="text-primary-foreground/80">{slide.subtitle}</p>
                </div>
              ))}
            </div>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {bannerSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentSlide === index
                      ? "bg-primary-foreground w-6"
                      : "bg-primary-foreground/40"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Primary Actions */}
        <div className="px-5 mb-6 space-y-3">
          <Button variant="gradient" size="xl" className="w-full justify-between group">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6" />
              <span>Book Appointment</span>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button variant="outline" size="lg" className="w-full justify-between group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              <span>Submit Prescription</span>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Categories */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Categories</h3>
            <button 
              onClick={() => setShowCategoriesModal(true)}
              className="text-primary text-sm font-medium flex items-center gap-1"
            >
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {categories.slice(0, 4).map((category) => (
              <button key={category.id} className="category-card">
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", category.color)}>
                  <CategoryIcon icon={category.icon} className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-foreground">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="px-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Popular Products</h3>
            <button className="text-primary text-sm font-medium flex items-center gap-1">
              See All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <div key={product.id} className="product-card shadow-lg">
                <div className="relative aspect-square bg-muted p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                  <button
                    onClick={() => toggleLike(product.id)}
                    className={cn(
                      "absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all",
                      likedProducts[product.id]
                        ? "bg-destructive/10"
                        : "bg-card/80"
                    )}
                  >
                    <Heart
                      className={cn(
                        "w-4 h-4 transition-all",
                        likedProducts[product.id]
                          ? "text-destructive fill-destructive"
                          : "text-muted-foreground"
                      )}
                    />
                  </button>
                </div>
                <div className="p-2">
                  <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                  <h4 className="text-sm font-medium text-foreground line-clamp-2 mb-1 min-h-[2.5rem]">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center transition-all hover:bg-primary/90 active:scale-95"
                    >
                      <Plus className="w-4 h-4 text-primary-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav />

        {/* Categories Modal */}
        {showCategoriesModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div 
              className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
              onClick={() => setShowCategoriesModal(false)}
            />
            <div className="relative w-full max-w-md bg-card rounded-t-3xl max-h-[80vh] overflow-hidden animate-slide-in-bottom">
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                <div>
                  <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground">All Categories</h3>
                </div>
                <button
                  onClick={() => setShowCategoriesModal(false)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4 grid grid-cols-3 gap-4">
                {categories.map((category) => (
                  <button key={category.id} className="category-card">
                    <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", category.color)}>
                      <CategoryIcon icon={category.icon} className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{category.name}</span>
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

export default DashboardScreen;
