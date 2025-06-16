import Image from 'next/image';
import React, { memo } from 'react';

interface ProductCardProps {
  name: string;
  price: string;
  category: string;
  image: string;
  rating: number;
  badge: string;
  badgeColor: string;
  id: string;
}

// Pre-generate star rating component for better performance
const StarRating = memo(({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-xs ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
      ))}
    </div>
  );
});
StarRating.displayName = 'StarRating';

// Extract Badge component for memo optimization
const ProductBadge = memo(({ text, color }: { text: string; color: string }) => {
  if (!text) return null;
  
  return (
    <span className={`${color} text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-lg animate-pulse`}>
      {text}
    </span>
  );
});
ProductBadge.displayName = 'ProductBadge';

// Extract QuickActions component for memo optimization
const QuickActions = memo(() => (
  <div className="flex gap-4">
    <button className="bg-white/95 backdrop-blur-sm text-gray-900 p-4 rounded-full font-bold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    </button>
    <button className="bg-blue-600 text-white p-4 rounded-full font-bold transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
      </svg>
    </button>
  </div>
));
QuickActions.displayName = 'QuickActions';

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  category,
  image,
  rating,
  badge,
  badgeColor,
}) => {
  return (
    <div className="group w-[280px]">
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 transform hover:-translate-y-4 relative h-[400px]">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
        
        <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl overflow-hidden h-full">
          <div className="relative h-[200px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
              className="object-cover group-hover:scale-125 transition-transform duration-1000 filter group-hover:brightness-110"
            />
            
            {/* Enhanced Badges */}
            {badge && (
              <div className="absolute top-4 left-4">
                <ProductBadge text={badge} color={badgeColor} />
              </div>
            )}
            
            {/* Rating Badge */}
            {rating > 0 && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-black text-gray-800 flex items-center gap-2 shadow-lg">
                <StarRating rating={rating} />
                <span>{rating}</span>
              </div>
            )}
            
            {/* Animated Quick Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
              <QuickActions />
            </div>
          </div>
          
          <div className="p-6">
            <div className="text-xs text-blue-600 font-bold mb-2 uppercase tracking-wider">{category}</div>
            <h3 className="font-black text-xl mb-3 group-hover:text-blue-600 transition-colors leading-tight">{name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-900 font-black text-2xl">{price}</p>
                <p className="text-gray-500 text-xs">Free shipping</p>
              </div>
              <button 
                className="text-gray-400 hover:text-red-500 transition-colors transform hover:scale-150 duration-300 p-2"
                aria-label="Add to favorites"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ProductCard, (prevProps, nextProps) => {
  // Only re-render if product details change
  return (
    prevProps.id === nextProps.id && 
    prevProps.price === nextProps.price && 
    prevProps.rating === nextProps.rating
  );
}); 