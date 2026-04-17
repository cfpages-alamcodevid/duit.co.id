import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';

const EXPERTS = [
  {
    name: "Budi Santoso",
    title: "Tax Consultant (Brevet C)",
    specialty: "Corporate Tax & Restructuring",
    rating: 4.9,
    clients: 150,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Siska Amelia",
    title: "Notary & Legal Advisor",
    specialty: "Holding Company Setup",
    rating: 5.0,
    clients: 85,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    name: "Hendra Wijaya",
    title: "Financial Strategist",
    specialty: "Debt Liquidation Expert",
    rating: 4.8,
    clients: 320,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const Experts: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-heading">Verified <span className="text-aureum-gold">Experts</span></h1>
        <p className="text-body text-lg">Direct access to the professionals who can execute your sovereign strategy.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EXPERTS.map((expert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="p-8 flex flex-col items-center text-center hover:border-aureum-gold/15 transition-all">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-aureum-gold/15 p-1">
                <img src={expert.image} alt={expert.name} className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="text-xl font-bold mb-1 text-heading">{expert.name}</h3>
              <p className="text-aureum-gold text-sm mb-4 font-semibold">{expert.title}</p>

              <GlassCard className="w-full rounded-xl p-4 mb-6 text-sm bg-aureum-gold/5">
                <p className="text-body mb-2">Specialty</p>
                <p className="text-heading font-medium">{expert.specialty}</p>
              </GlassCard>

              <div className="flex justify-between w-full mb-8 px-4">
                <div>
                  <p className="text-xs text-body uppercase">Rating</p>
                  <p className="font-bold text-aureum-gold">★ {expert.rating}</p>
                </div>
                <div>
                  <p className="text-xs text-body uppercase">Clients</p>
                  <p className="font-bold text-heading">{expert.clients}+</p>
                </div>
              </div>

              <GoldShineButton className="w-full">Book Consultation</GoldShineButton>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experts;
