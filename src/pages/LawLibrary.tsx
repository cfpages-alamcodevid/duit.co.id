import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input'; // Assuming shadcn Input or similar exists
import { motion } from 'framer-motion';

const DUMMY_LAWS = [
  { id: 1, title: "UU No. 4 Tahun 2023", subject: "Pengembangan dan Penguatan Sektor Keuangan (P2SK)", category: "Keuangan", year: 2023 },
  { id: 2, title: "UU No. 7 Tahun 2021", subject: "Harmonisasi Peraturan Perpajakan (HPP)", category: "Pajak", year: 2021 },
  { id: 3, title: "UU No. 11 Tahun 2020", subject: "Cipta Kerja", category: "Bisnis", year: 2020 },
  { id: 4, title: "POJK No. 10/POJK.05/2022", subject: "Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI)", category: "Fintech", year: 2022 },
  { id: 5, title: "UU No. 1 Tahun 2023", subject: "Kitab Undang-Undang Hukum Pidana (KUHP)", category: "Pidana", year: 2023 },
];

export const LawLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLaws = DUMMY_LAWS.filter(law => 
    law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    law.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Law <span className="text-gold">Library</span></h1>
        <p className="text-slate-400 text-lg">Access and search through the legal foundations of Indonesia's financial and business landscape.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-bold mb-4">Filter by Category</h3>
            <div className="space-y-2">
              {["All", "Pajak", "Keuangan", "Bisnis", "Fintech", "Pidana"].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-4 h-4 rounded border border-white/20 group-hover:border-gold transition-colors"></div>
                  <span className="text-slate-400 group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold mb-4">Year</h3>
            <select className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-gold">
              <option>All Years</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </select>
          </GlassCard>
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search by Law number or subject..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-gold/50 transition-all backdrop-blur-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </div>
          </div>

          <div className="space-y-4">
            {filteredLaws.map((law, index) => (
              <motion.div
                key={law.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-6 hover:bg-white/5 transition-all cursor-pointer group border-l-4 border-l-transparent hover:border-l-gold">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-gold transition-colors">{law.title}</h3>
                      <p className="text-slate-400 mt-1">{law.subject}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 border border-white/10">
                      {law.category}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {filteredLaws.length === 0 && (
              <div className="text-center py-20 text-slate-500">
                No laws found matching your search.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default LawLibrary;
