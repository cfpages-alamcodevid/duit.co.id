import React from 'react';
import { GlassCard } from './GlassCard';
import { Badge } from '@/components/ui/badge'; // I'll check if badge exists, if not I'll use a div

interface ArticleCardProps {
  title: string;
  excerpt: string;
  tier: string;
  category: string;
  readTime: string;
  image?: string;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  excerpt,
  tier,
  category,
  readTime,
  image
}) => {
  return (
    <GlassCard className="group overflow-hidden flex flex-col h-full hover:border-gold/30 transition-all duration-500">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 rounded-full bg-money-green/10 text-money-green text-[10px] font-bold uppercase tracking-wider">
            {tier}
          </span>
          <span className="text-slate-400 text-xs">
            {category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-slate-500">{readTime}</span>
          <button className="text-money-green text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read More <span className="text-lg">→</span>
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
