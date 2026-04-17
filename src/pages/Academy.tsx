import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const COURSES = [
  {
    title: "Debt Free Blueprint",
    instructor: "Duit.co.id Team",
    price: "Rp 499.000",
    tier: "Tier 0",
    image: "https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "High-Ticket Freelancing",
    instructor: "Andi Wijaya",
    price: "Rp 1.200.000",
    tier: "Tier 1",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "SOP Systemization",
    instructor: "Business Mastery",
    price: "Rp 2.500.000",
    tier: "Tier 2",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Holding Company Structure",
    instructor: "Legal Pro",
    price: "Rp 5.000.000",
    tier: "Tier 4",
    image: "https://images.unsplash.com/photo-1454165833762-0165c03f901a?auto=format&fit=crop&q=80&w=800"
  }
];

export const Academy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-heading">Duit <span className="text-money-green">Academy</span></h1>
        <p className="text-body text-lg max-w-2xl mx-auto">Master the skills of the elite. Structured courses to accelerate your movement through the financial tiers.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {COURSES.map((course, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="overflow-hidden h-full flex flex-col group border border-white/10 hover:border-money-green/15 transition-all">
              <div className="h-48 overflow-hidden relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all backdrop-blur-sm" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="tier">{course.tier}</Badge>
                  <span className="text-aureum-gold font-bold">{course.price}</span>
                </div>
                <h3 className="text-lg font-bold mb-1 text-heading">{course.title}</h3>
                <p className="text-body text-sm mb-6">by {course.instructor}</p>
                <GreenButton className="w-full mt-auto">Enroll Now</GreenButton>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Academy;
