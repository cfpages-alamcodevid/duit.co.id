import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';
import { Share2, Bookmark, BookOpen } from 'lucide-react';

const YouTubeLockGate = () => (
  <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-aureum-gold/15">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-10">
      <div className="w-16 h-16 bg-aureum-gold/20 rounded-full flex items-center justify-center mb-4 border border-aureum-gold/50">
        <span className="text-3xl text-aureum-gold">🔒</span>
      </div>
      <h3 className="text-2xl font-bold text-heading text-etched-heading mb-2">Konten Video Premium</h3>
      <p className="text-body text-etched max-w-md mb-6">
        Masterclass ini terkunci untuk member Tier 1 ke atas. Subscribe YouTube kami dan hubungkan akun Anda untuk membuka.
      </p>
      <GoldShineButton>Subscribe & Buka</GoldShineButton>
    </div>
    <img
      src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1200"
      alt="Thumbnail Video"
      className="w-full h-full object-cover opacity-30"
    />
  </div>
);

interface ArticleStub {
  title: string;
  tier: string;
  readTime: string;
  image: string;
  slug: string;
}

const relatedArticles: ArticleStub[] = [
  {
    title: 'Panduan Lengkap Membangun Dana Darurat 6 Bulan',
    tier: 'Tier 1: Hustler',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400',
    slug: '/knowledge/panduan-dana-darurat',
  },
  {
    title: 'Strategi Alokasi Aset untuk Profesional Muda',
    tier: 'Tier 2: Scaler',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
    slug: '/knowledge/alokasi-aset-profesional',
  },
  {
    title: 'Memahami Obligasi Negara & Surat Berharga',
    tier: 'Tier 2: Scaler',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1604594849809-dfedbc827105?auto=format&fit=crop&q=80&w=400',
    slug: '/knowledge/obligasi-negara',
  },
];

const tableOfContents = [
  { id: 'pilar-sop', label: '1. Pilar SOP' },
  { id: 'operator-ke-arsitek', label: '2. Dari Operator ke Arsitek' },
  { id: 'struktur-hukum', label: '3. Struktur Hukum yang Diperlukan' },
];

export const KnowledgeDetail: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-money-green/10 text-money-green text-xs font-bold uppercase">
              Tier 2: Scaler
            </span>
            <span className="text-body text-etched">•</span>
            <span className="text-body text-etched text-sm">15 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-heading text-etched-heading mb-6 leading-tight">
            Arsitektur Otonomi: Membangun Sistem yang Bisa Scale
          </h1>
          <div className="flex items-center gap-4 border-b border-white/[0.08] pb-10">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex-shrink-0" />
            <div>
              <p className="font-bold text-heading">Duit.co.id Editorial</p>
              <p className="text-sm text-body text-etched">Diperbarui 24 Okt 2023</p>
            </div>
          </div>
        </header>

        {/* Main Content + Sidebar Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Article Body */}
          <div className="flex-1 min-w-0">
            <div className="prose prose-invert prose-gold max-w-none">
              <p className="text-xl text-body text-etched leading-relaxed mb-8">
                Jebakan terbesar bagi setiap pengusaha adalah &quot;Hustle Paradox.&quot; Anda membangun bisnis untuk mendapatkan kebebasan, hanya untuk menemukan diri Anda bekerja lebih banyak jam daripada saat Anda menjadi karyawan. Untuk keluar dari jebakan ini, Anda harus bertransisi dari seorang <em>operator</em> menjadi seorang <em>architect</em>.
              </p>

              <YouTubeLockGate />

              {/* Section 1: Pilar SOP */}
              <section id="pilar-sop" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-aureum-gold text-etched-heading mt-12 mb-4">
                  3 Pilar SOP
                </h2>
                <p className="mb-6 text-body text-etched">
                  Standard Operating Procedures (SOP) adalah DNA dari bisnis Anda. Tanpa SOP, bisnis Anda hanyalah sekumpulan kebiasaan pribadi Anda sendiri. Sebuah sistem yang benar-benar <em>scalable</em> bergantung pada:
                </p>
                <ul className="list-disc pl-6 space-y-4 mb-8">
                  <li className="text-body text-etched">
                    <strong className="text-heading">Kejelasan (Clarity):</strong> Setiap langkah harus tidak ambigu sehingga bisa dieksekusi oleh junior sekalipun.
                  </li>
                  <li className="text-body text-etched">
                    <strong className="text-heading">Akuntabilitas (Accountability):</strong> Setiap proses harus memiliki satu pemilik tunggal yang bertanggung jawab.
                  </li>
                  <li className="text-body text-etched">
                    <strong className="text-heading">Evolusi (Evolution):</strong> Sistem harus ditinjau ulang setiap 90 hari untuk memastikan relevansi.
                  </li>
                </ul>
              </section>

              {/* Sovereign Tip */}
              <GlassCard className="p-8 my-10 bg-money-green/5 border-money-green/20">
                <h3 className="text-xl font-bold text-money-green text-etched-heading mb-4">💡 Tips Sovereign</h3>
                <p className="m-0 italic text-body text-etched">
                  &quot;Don&apos;t write what you do. Record yourself doing it, then have someone else write the SOP based on the recording. This ensures nothing is missed.&quot;
                </p>
              </GlassCard>

              {/* Section 2: Dari Operator ke Arsitek */}
              <section id="operator-ke-arsitek" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-aureum-gold text-etched-heading mt-12 mb-4">
                  Dari Operator ke Arsitek
                </h2>
                <p className="mb-6 text-body text-etched">
                  Seorang <em>operator</em> bertanya: &quot;Apa yang harus saya kerjakan hari ini?&quot; Seorang <em>architect</em> bertanya: &quot;Sistem apa yang bisa mengerjakan ini tanpa saya?&quot;
                </p>
                <p className="mb-6 text-body text-etched">
                  Pergeseran mental ini adalah fondasi dari kekayaan sejati. Ketika Anda bisa membuat keputusan strategis alih-alih mengeksekusi tugas-tugas operasional, bisnis Anda mulai <em>scale</em> secara organik.
                </p>
                <ul className="list-disc pl-6 space-y-4 mb-8">
                  <li className="text-body text-etched"><strong className="text-heading">Delegasi Strategis:</strong> Serahkan tugas yang bisa dilakukan orang lain dengan 80% kualitas Anda.</li>
                  <li className="text-body text-etched"><strong className="text-heading">Otomasi Proses:</strong> Gunakan teknologi untuk menggantikan pekerjaan repetitif.</li>
                  <li className="text-body text-etched"><strong className="text-heading">Investasi Waktu:</strong> Waktu yang Anda hemat harus diinvestasikan kembali ke pertumbuhan bisnis.</li>
                </ul>
              </section>

              {/* Section 3: Struktur Hukum */}
              <section id="struktur-hukum" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-aureum-gold text-etched-heading mt-12 mb-4">
                  Struktur Hukum yang Diperlukan
                </h2>
                <p className="mb-6 text-body text-etched">
                  Sistem yang Anda bangun harus dilindungi secara hukum. Tanpa struktur yang tepat, aset intelektual Anda rentan terhadap penyalahgunaan dan sengketa.
                </p>
                <ul className="list-disc pl-6 space-y-4 mb-8">
                  <li className="text-body text-etched"><strong className="text-heading">Badan Hukum (PT/CV):</strong> Memisahkan aset pribadi dari aset bisnis untuk perlindungan liability.</li>
                  <li className="text-body text-etched"><strong className="text-heading">Hak Kekayaan Intelektual:</strong> Daftarkan merek, paten, dan hak cipta untuk melindungi inovasi Anda.</li>
                  <li className="text-body text-etched"><strong className="text-heading">Perjanjian Kerahasiaan (NDA):</strong> Pastikan SOP dan rahasia dagang Anda tidak bocor ke kompetitor.</li>
                </ul>
                <p className="text-body text-etched">
                  Di bagian selanjutnya, kita akan mengeksplorasi struktur hukum yang diperlukan untuk melindungi sistem ini melalui pendaftaran kekayaan intelektual...
                </p>
              </section>
            </div>

            {/* Footer Actions */}
            <footer className="mt-20 pt-10 border-t border-white/[0.08]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex gap-4">
                  <button
                    className="flex items-center gap-2 text-body text-etched hover:text-white transition-colors"
                    aria-label="Bagikan artikel ini"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Bagikan</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-body text-etched hover:text-white transition-colors"
                    aria-label="Simpan artikel ini"
                  >
                    <Bookmark className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <span className="text-body text-etched text-sm italic">#Sistem</span>
                  <span className="text-body text-etched text-sm italic">#Scaling</span>
                  <span className="text-body text-etched text-sm italic">#Kekayaan</span>
                </div>
              </div>
            </footer>
          </div>

          {/* Sidebar: Table of Contents */}
          <aside className="lg:w-72 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <GlassCard className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-aureum-gold" />
                  <h3 className="text-lg font-bold text-heading text-etched-heading">Daftar Isi</h3>
                </div>
                <nav aria-label="Daftar isi artikel">
                  <ul className="space-y-3">
                    {tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="text-body text-etched text-sm hover:text-aureum-gold transition-colors block py-1"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </GlassCard>
            </div>
          </aside>
        </div>

        {/* Related Articles */}
        <section className="mt-20 pt-10 border-t border-white/[0.08]" aria-label="Artikel Terkait">
          <h2 className="text-2xl font-bold text-heading text-etched-heading mb-8">Artikel Terkait</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <GlassCard
                key={article.slug}
                className="p-0 overflow-hidden cursor-pointer hover:border-aureum-gold/30 transition-all group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 px-2 py-1 rounded-full bg-money-green/20 text-money-green text-[10px] font-bold uppercase backdrop-blur-sm">
                    {article.tier}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-heading text-etched-heading text-sm leading-snug mb-2 group-hover:text-aureum-gold transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-body text-etched">{article.readTime}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>
      </motion.article>
    </div>
  );
};

export default KnowledgeDetail;
