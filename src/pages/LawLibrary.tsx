import React, { useState, useMemo } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Search, BookOpen, Shield, Scale, TrendingUp, FileText, Lock, RefreshCcw, AlertCircle } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface LawEntry {
  id: number;
  title: string;
  subject: string;
  category: string;
  year: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const DUMMY_LAWS: LawEntry[] = [
  {
    id: 1,
    title: 'UU No. 4 Tahun 2023',
    subject: 'Pengembangan dan Penguatan Sektor Keuangan (P2SK)',
    category: 'Keuangan',
    year: 2023,
  },
  {
    id: 2,
    title: 'UU No. 7 Tahun 2021',
    subject: 'Harmonisasi Peraturan Perpajakan (HPP)',
    category: 'Pajak',
    year: 2021,
  },
  {
    id: 3,
    title: 'UU No. 11 Tahun 2020',
    subject: 'Cipta Kerja',
    category: 'Bisnis',
    year: 2020,
  },
  {
    id: 4,
    title: 'POJK No. 10/POJK.05/2022',
    subject: 'Layanan Pendanaan Bersama Berbasis Teknologi Informasi (LPBBTI)',
    category: 'Fintech',
    year: 2022,
  },
  {
    id: 5,
    title: 'UU No. 1 Tahun 2023',
    subject: 'Kitab Undang-Undang Hukum Pidana (KUHP)',
    category: 'Pidana',
    year: 2023,
  },
  {
    id: 6,
    title: 'UU No. 27 Tahun 2022',
    subject: 'Perlindungan Data Pribadi (PDP)',
    category: 'Keuangan',
    year: 2022,
  },
  {
    id: 7,
    title: 'POJK No. 6/POJK.07/2022',
    subject: 'Tata Kelola dan Organisasi Otoritas Jasa Keuangan',
    category: 'Keuangan',
    year: 2022,
  },
  {
    id: 8,
    title: 'PP No. 55 Tahun 2022',
    subject: 'Pajak atas Perdagangan Melalui Sistem Elektronik (Pajak Digital)',
    category: 'Pajak',
    year: 2022,
  },
  {
    id: 9,
    title: 'UU No. 8 Tahun 1999',
    subject: 'Perlindungan Konsumen',
    category: 'Bisnis',
    year: 1999,
  },
  {
    id: 10,
    title: 'POJK No. 12/POJK.05/2023',
    subject: 'Penyelenggaraan Usaha Asuransi dan Asuransi Syariah',
    category: 'Fintech',
    year: 2023,
  },
  {
    id: 11,
    title: 'UU No. 40 Tahun 2007',
    subject: 'Perseroan Terbatas',
    category: 'Bisnis',
    year: 2007,
  },
  {
    id: 12,
    title: 'PP No. 41 Tahun 2023',
    subject: 'Restrukturisasi Utang Pajak bagi Wajib Pajak Terdampak Keadaan Kahar',
    category: 'Pajak',
    year: 2023,
  },
];

const CATEGORIES = ['Semua', 'Pajak', 'Keuangan', 'Bisnis', 'Fintech', 'Pidana'] as const;

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Pajak: <FileText size={16} />,
  Keuangan: <TrendingUp size={16} />,
  Bisnis: <Scale size={16} />,
  Fintech: <Lock size={16} />,
  Pidana: <Shield size={16} />,
};

// ─── Component ───────────────────────────────────────────────────────────────

export const LawLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedYear, setSelectedYear] = useState('Semua Tahun');

  // Unique years sorted descending
  const availableYears = useMemo(() => {
    const years = [...new Set(DUMMY_LAWS.map((law) => law.year))].sort((a, b) => b - a);
    return ['Semua Tahun', ...years.map(String)];
  }, []);

  // Category stats
  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    DUMMY_LAWS.forEach((law) => {
      stats[law.category] = (stats[law.category] || 0) + 1;
    });
    return stats;
  }, []);

  // Filtered results
  const filteredLaws = useMemo(
    () =>
      DUMMY_LAWS.filter(
        (law) =>
          (law.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            law.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedCategory === 'Semua' || law.category === selectedCategory) &&
          (selectedYear === 'Semua Tahun' || law.year.toString() === selectedYear)
      ),
    [searchTerm, selectedCategory, selectedYear]
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4 text-heading text-etched-heading">
          Perpustakaan <span className="text-aureum-gold">Hukum</span>
        </h1>
        <p className="text-body text-etched text-lg max-w-2xl">
          Akses dan cari fondasi hukum dalam landscape finansial dan bisnis Indonesia.
        </p>
      </header>

      {/* ── Intro Section ──────────────────────────────────────────────── */}
      <GlassCard className="p-8 mb-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-aureum-gold/10 flex items-center justify-center">
                <BookOpen size={20} className="text-aureum-gold" />
              </div>
              <h2 className="text-xl font-bold text-heading text-etched-heading">Mengapa Perpustakaan Hukum Ini Ada?</h2>
            </div>
            <p className="text-body text-etched leading-relaxed mb-4">
              Lanskap regulasi keuangan Indonesia terus berkembang. Perpustakaan ini menyediakan akses terpusat
              ke undang-undang, peraturan OJK, dan ketentuan pajak yang relevan bagi pelaku bisnis, investor,
              dan masyarakat umum. Kami menyajikan informasi hukum secara ringkas agar Anda dapat memahami
              hak dan kewajiban finansial Anda.
            </p>
            <p className="text-body text-etched leading-relaxed">
              Diperbarui secara berkala oleh tim hukum kami — sehingga Anda selalu mendapatkan informasi yang
              relevan dan terkini.
            </p>
          </div>

          <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto">
            <div className="glass-card rounded-xl p-4 text-center backdrop-blur-md">
              <p className="text-3xl font-bold text-aureum-gold">50+</p>
              <p className="text-sm text-body text-etched mt-1">Regulasi Penting Indonesia</p>
            </div>
            <div className="glass-card rounded-xl p-4 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-1">
                <RefreshCcw size={16} className="text-money-green" />
                <p className="text-3xl font-bold text-money-green">Aktif</p>
              </div>
              <p className="text-sm text-body text-etched mt-1">Diperbarui Berkala</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── Main Layout ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ── Sidebar Filters ──────────────────────────────────────────── */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Category Filter */}
          <GlassCard className="p-6">
            <h3 className="font-bold mb-4 text-heading text-etched-heading">Filter berdasarkan Kategori</h3>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                const count = cat === 'Semua' ? DUMMY_LAWS.length : (categoryStats[cat] || 0);

                return (
                  <label
                    key={cat}
                    className={`flex items-center justify-between gap-3 cursor-pointer group rounded-lg px-3 py-2 transition-all ${
                      isActive ? 'bg-aureum-gold/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isActive}
                        onChange={() => setSelectedCategory(cat)}
                        className="sr-only"
                      />
                      <div
                        className={`flex items-center justify-center w-7 h-7 rounded-md transition-colors ${
                          isActive
                            ? 'bg-aureum-gold/20 text-aureum-gold'
                            : 'bg-white/5 text-body group-hover:text-aureum-gold'
                        }`}
                      >
                        {cat !== 'Semua' ? CATEGORY_ICONS[cat] : <BookOpen size={16} />}
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          isActive ? 'text-aureum-gold font-medium' : 'text-body group-hover:text-white'
                        }`}
                      >
                        {cat}
                      </span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                        isActive ? 'bg-aureum-gold/20 text-aureum-gold' : 'bg-white/5 text-body'
                      }`}
                    >
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </GlassCard>

          {/* Year Filter */}
          <GlassCard className="p-6">
            <h3 className="font-bold mb-4 text-heading text-etched-heading">Tahun</h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-body text-etched text-sm focus:outline-none focus:border-aureum-gold/50 transition-all backdrop-blur-md appearance-none cursor-pointer"
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </GlassCard>
        </aside>

        {/* ── Main Content ─────────────────────────────────────────────── */}
        <main className="lg:col-span-3 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Cari berdasarkan nomor UU atau topik..."
              className="w-full py-4 px-6 text-body text-etched focus:outline-none focus:border-aureum-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-body text-etched">
              <Search size={20} />
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {filteredLaws.map((law, index) => (
              <motion.div
                key={law.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="p-6 hover:bg-white/5 transition-all cursor-pointer group border border-white/10 hover:border-aureum-gold/15">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-heading text-etched-heading group-hover:text-aureum-gold transition-colors">
                        {law.title}
                      </h3>
                      <p className="text-body text-etched mt-1 text-sm leading-relaxed">{law.subject}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs text-body text-etched">{law.year}</span>
                      <span className="px-3 py-1 rounded-full glass-card text-xs text-body text-etched flex items-center gap-1.5">
                        {CATEGORY_ICONS[law.category]}
                        {law.category}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}

            {/* Empty State */}
            {filteredLaws.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-body text-etched" />
                </div>
                <p className="text-body text-etched text-lg">Tidak ada hukum yang sesuai dengan pencarian Anda.</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Disclaimer ─────────────────────────────────────────────────── */}
      <div className="mt-12">
        <GlassCard className="p-6 border border-amber-500/10 bg-amber-500/5">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mt-0.5">
              <AlertCircle size={20} className="text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-heading text-etched-heading mb-1">Penting untuk Diketahui</h4>
              <p className="text-body text-etched text-sm leading-relaxed">
                Informasi ini bukan nasihat hukum. Konten di Perpustakaan Hukum Duit.co.id disediakan hanya untuk
                tujuan edukasi dan referensi. Konsultasikan dengan ahli hukum untuk kasus spesifik atau keputusan
                hukum yang mengikat.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LawLibrary;
