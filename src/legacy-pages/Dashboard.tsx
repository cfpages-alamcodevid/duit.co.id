import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArticleCard } from '@/components/ui/ArticleCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';
import {
  Users,
  Wrench,
  FileText,
  Shield,
  Calculator,
  ArrowRight,
  Star,
  ChevronRight
} from 'lucide-react';
import type { TierType, CategoryType } from '@/utils/content';

// ─── Types ───────────────────────────────────────────────────────────────────

interface TierInfo {
  name: string;
  label: string;
  nextTier: string;
  progress: number;
  description: string;
}

interface Article {
  title: string;
  description: string;
  slug: string;
  tier: TierType;
  category: CategoryType[];
  readTime: string;
  image: string;
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  accent: 'green' | 'gold' | 'neutral';
}

// ─── Data ────────────────────────────────────────────────────────────────────

const CURRENT_TIER: TierInfo = {
  name: 'Tier 1',
  label: 'The Hustler',
  nextTier: 'Tier 2 — The Scaler',
  progress: 65,
  description: 'Fokus: Keterampilan berpenghasilan tinggi, side hustle, model bisnis nol risiko'
};

const DUMMY_ARTICLES: Article[] = [
  {
    title: "The Art of Debt Liquidation",
    description: "Pelajari strategi hukum spesifik untuk menavigasi utang berbunga tinggi dan tekanan pinjol di Indonesia.",
    slug: "the-art-of-debt-liquidation",
    tier: "tier-0-survival",
    category: ["keuangan"],
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Side Hustles for the Digital Age",
    description: "Cara memanfaatkan platform global untuk menghasilkan USD sambil tinggal di Indonesia.",
    slug: "side-hustles-for-the-digital-age",
    tier: "tier-1-hustler",
    category: ["karir"],
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Scaling Your SOPs",
    description: "Transisi dari operator menjadi pemilik dengan membangun sistem yang berjalan tanpa Anda.",
    slug: "scaling-your-sops",
    tier: "tier-2-scaler",
    category: ["bisnis"],
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Panduan Lengkap BPJS Kesehatan & Ketenagakerjaan",
    description: "Memahami hak, manfaat, dan cara mengoptimalkan BPJS untuk perlindungan finansial keluarga Anda.",
    slug: "panduan-lengkap-bpjs-kesehatan-ketenagakerjaan",
    tier: "tier-1-hustler",
    category: ["keuangan"],
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Investasi Reksa Dana untuk Pemula",
    description: "Langkah pertama membangun portofolio dari nol: jenis reksa dana, platform, dan strategi DCA.",
    slug: "investasi-reksa-dana-untuk-pemula",
    tier: "tier-1-hustler",
    category: ["investasi"],
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Membangun Bisnis F&B Modal Under 10 Juta",
    description: "Studi kasus nyata: dari gerobak kopi ke 3 outlet dalam 18 bulan dengan manajemen arus kas ketat.",
    slug: "membangun-bisnis-fb-modal-under-10-juta",
    tier: "tier-1-hustler",
    category: ["bisnis"],
    readTime: "14 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Pajak UMKM: Dari 0,5% ke PPh Final",
    description: "Everything you need to know tentang kewajiban pajak UMKM dan cara legal mengoptimalkan beban pajak.",
    slug: "pajak-umkm-dari-05-ke-pph-final",
    tier: "tier-2-scaler",
    category: ["legal"],
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Emergency Fund: Berapa Idealnya dan Di Mana Menyimpannya",
    description: "Panduan praktis menghitung dana darurat berdasarkan profil risiko dan instrumen penyimpanan terbaik.",
    slug: "emergency-fund-berapa-idealnya-dan-di-mana-menyimpannya",
    tier: "tier-0-survival",
    category: ["keuangan"],
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800"
  }
];

const TIER_FILTERS = ['Semua', 'tier-0-survival', 'tier-1-hustler', 'tier-2-scaler'] as const;

// ─── Tier Banner ─────────────────────────────────────────────────────────────

const TierBanner: React.FC<{ tier: TierInfo }> = ({ tier }) => (
  <GlassCard className="relative overflow-hidden border-aureum-gold/15 bg-aureum-gold/5 mb-8">
    <div className="absolute -right-16 -top-16 w-48 h-48 bg-aureum-gold/5 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <Star className="w-5 h-5 text-aureum-gold fill-aureum-gold" />
          <span className="text-xs font-semibold uppercase tracking-wider text-aureum-gold/80">
            Status Ekonomi Anda
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-1">
          {tier.name} <span className="text-aureum-gold">— {tier.label}</span>
        </h2>
        <p className="text-body text-etched text-sm">{tier.description}</p>
      </div>

      <div className="flex flex-col items-end gap-2 min-w-[200px]">
        <div className="flex items-center gap-2 text-sm text-body text-etched">
          <span>Progress ke {tier.nextTier}</span>
          <span className="font-semibold text-aureum-gold">{tier.progress}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${tier.progress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-money-green to-aureum-gold"
          />
        </div>
        <span className="text-xs text-body text-etched/60">
          {100 - tier.progress}% lagi untuk naik tier
        </span>
      </div>
    </div>
  </GlassCard>
);

// ─── Welcome Stats ───────────────────────────────────────────────────────────

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, accent }) => {
  const accentBorder =
    accent === 'green'
      ? 'border-money-green/15'
      : accent === 'gold'
        ? 'border-aureum-gold/15'
        : 'border-white/10';

  const accentText =
    accent === 'green'
      ? 'text-money-green'
      : accent === 'gold'
        ? 'text-aureum-gold'
        : 'text-heading';

  return (
    <GlassCard className={`flex items-center gap-4 p-5 ${accentBorder}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${accentText} bg-white/5`}>
        {icon}
      </div>
      <div>
        <p className={`text-xl font-bold ${accentText}`}>{value}</p>
        <p className="text-body text-etched text-xs">{label}</p>
      </div>
    </GlassCard>
  );
};

const WelcomeStats: React.FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
    <StatCard
      icon={<FileText className="w-6 h-6" />}
      value="12"
      label="Artikel Baru Minggu Ini"
      accent="green"
    />
    <StatCard
      icon={<Wrench className="w-6 h-6" />}
      value="5"
      label="Alat Keuangan Tersedia"
      accent="gold"
    />
    <StatCard
      icon={<Users className="w-6 h-6" />}
      value="3"
      label="Ahli Online Sekarang"
      accent="neutral"
    />
  </div>
);

// ─── Recommendation Section ──────────────────────────────────────────────────

const RecommendationSection: React.FC = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-heading text-etched-heading">
      <span className="w-2 h-8 bg-aureum-gold rounded-full block" />
      Rekomendasi untuk Anda
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <GlassCard className="p-6 border-aureum-gold/15 bg-aureum-gold/5 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <Star className="w-5 h-5 text-aureum-gold" />
          <h3 className="text-lg font-bold text-aureum-gold text-etched-heading">Lengkapi Profil Anda</h3>
        </div>
        <p className="text-body text-etched text-sm mb-6 flex-grow">
          Buka strategi keuangan yang lebih personal dengan melengkapi detail profil: usia, lokasi, pendidikan, dan tujuan finansial Anda.
        </p>
        <GoldShineButton className="w-full flex items-center justify-center gap-2">
          Mulai <ArrowRight className="w-4 h-4" />
        </GoldShineButton>
      </GlassCard>

      <GlassCard className="p-6 border-money-green/15 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <Calculator className="w-5 h-5 text-money-green" />
          <h3 className="text-lg font-bold text-money-green text-etched-heading">Kalkulator Utang</h3>
        </div>
        <p className="text-body text-etched text-sm mb-6 flex-grow">
          Rencanakan jalan Anda menuju kebebasan finansial dengan alat pembayaran utang canggih kami. Hitung strategi snowball vs avalanche.
        </p>
        <button className="w-full py-2.5 rounded-lg border border-money-green/15 text-money-green hover:bg-money-green/10 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
          Buka Alat <ChevronRight className="w-4 h-4" />
        </button>
      </GlassCard>

      <GlassCard className="p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="w-5 h-5 text-heading" />
          <h3 className="text-lg font-bold text-heading text-etched-heading">Perpustakaan Hukum</h3>
        </div>
        <p className="text-body text-etched text-sm mb-6 flex-grow">
          Jelajahi regulasi terbaru yang mempengaruhi bisnis dan aset Anda. Dari UU Perlindungan Konsumen hingga aturan OJK terkini.
        </p>
        <button className="w-full py-2.5 rounded-lg border border-white/15 text-heading hover:bg-white/5 transition-colors text-sm font-semibold flex items-center justify-center gap-2">
          Jelajahi Hukum <ChevronRight className="w-4 h-4" />
        </button>
      </GlassCard>
    </div>
  </section>
);

// ─── Dashboard Page ──────────────────────────────────────────────────────────

export const Dashboard: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');

  const filteredArticles =
    activeFilter === 'Semua'
      ? DUMMY_ARTICLES
      : DUMMY_ARTICLES.filter((a) => a.tier === activeFilter);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Welcome Header */}
      <header className="mb-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-3 text-heading text-etched-heading"
        >
          Selamat Datang, <span className="text-aureum-gold">Sovereign</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-body text-etched text-lg"
        >
          Jalur personal Anda menuju kemandirian finansial dan warisan generasi.
        </motion.p>
      </header>

      {/* Tier Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <TierBanner tier={CURRENT_TIER} />
      </motion.div>

      {/* Welcome Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <WelcomeStats />
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        <RecommendationSection />
      </motion.div>

      {/* My Feed */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-heading text-etched-heading">
            <span className="w-2 h-8 bg-money-green rounded-full block" />
            Feed Anda
          </h2>

          <div className="flex flex-wrap gap-2">
            {TIER_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-aureum-gold text-black shadow-lg shadow-aureum-gold/20'
                    : 'glass-card text-body hover:text-heading hover:border-aureum-gold/20'
                }`}
                aria-pressed={activeFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <ArticleCard {...article} />
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <GlassCard className="py-16 text-center">
            <p className="text-body text-etched text-lg">Tidak ada artikel untuk filter ini.</p>
            <button
              onClick={() => setActiveFilter('Semua')}
              className="mt-4 text-aureum-gold text-sm font-semibold hover:underline"
            >
              Tampilkan semua artikel
            </button>
          </GlassCard>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
