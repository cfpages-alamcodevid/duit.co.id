import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const DUMMY_LAWS = [
  { id: 1, title: "UU No. 4 Tahun 2023", subject: "Pengembangan dan Penguatan Sektor Keuangan (P2SK)", category: "Keuangan", year: 2023 },
  { id: 2, title: "UU No. 7 Tahun 2021", subject: "Harmonisasi Peraturan Perpajakan (HPP)", category: "Pajak", year: 2021 },
  { id: 3, title: "UU No. 11 Tahun 2020", subject: "Cipta Kerja", category: "Bisnis", year: 2020 },
  { id: 4, title: "POJK No. 10/POJK.05/2022", subject: "Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI)", category: "Fintech", year: 2022 },
  { id: 5, title: "UU No. 1 Tahun 2023", subject: "Kitab Undang-Undang Hukum Pidana (KUHP)", category: "Pidana", year: 2023 },
];

export const LawLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All Years");

  const filteredLaws = DUMMY_LAWS.filter(law =>
    (law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    law.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedCategory === "All" || law.category === selectedCategory) &&
    (selectedYear === "All Years" || law.year.toString() === selectedYear)
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-heading">Law <span className="text-aureum-gold">Library</span></h1>
        <p className="text-body text-lg">Access and search through the legal foundations of Indonesia's financial and business landscape.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-bold mb-4 text-heading">Filter by Category</h3>
            <div className="space-y-2">
              {["All", "Pajak", "Keuangan", "Bisnis", "Fintech", "Pidana"].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 rounded border transition-colors ${selectedCategory === cat ? 'border-aureum-gold bg-aureum-gold/20' : 'border-white/20 group-hover:border-aureum-gold'}`}></div>
                  <span className="text-body group-hover:text-white transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-bold mb-4 text-heading">Year</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2 text-body focus:outline-none focus:border-aureum-gold/50 transition-all backdrop-blur-md"
            >
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
            <Input
              type="text"
              placeholder="Search by Law number or subject..."
              className="w-full py-4 px-6 text-body focus:outline-none focus:border-aureum-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-body">
              <Search size={20} />
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
                <GlassCard className="p-6 hover:bg-white/5 transition-all cursor-pointer group border border-white/10 hover:border-aureum-gold/15">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-heading group-hover:text-aureum-gold transition-colors">{law.title}</h3>
                      <p className="text-body mt-1">{law.subject}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full glass-card text-xs text-body">
                      {law.category}
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
            {filteredLaws.length === 0 && (
              <div className="text-center py-20 text-body">
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
