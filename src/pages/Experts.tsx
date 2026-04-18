import React, { useState, useMemo } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, Users, Shield, Award, Clock, MessageCircle, Video, CheckCircle } from 'lucide-react';

interface Expert {
  id: number;
  name: string;
  title: string;
  specialty: string;
  category: string;
  rating: number;
  clients: number;
  experience: string;
  image: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Budi Santoso, SE., BKP.",
    title: "Konsultan Pajak",
    specialty: "Pajak Korporasi & Restrukturisasi",
    category: "Pajak",
    rating: 4.9,
    clients: 150,
    experience: "12 tahun",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 2,
    name: "Siska Amelia, S.H., M.Kn.",
    title: "Notaris & Pendiri Holding Company",
    specialty: "Pendirian & Struktur Holding",
    category: "Hukum",
    rating: 5.0,
    clients: 85,
    experience: "8 tahun",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 3,
    name: "Hendra Wijaya, CFP.",
    title: "Perencana Keuangan Bersertifikat",
    specialty: "Likuidasi Utang & Perencanaan Dana",
    category: "Perencanaan",
    rating: 4.8,
    clients: 320,
    experience: "15 tahun",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 4,
    name: "Dewi Sartika, M.M.",
    title: "Spesialis Waralaba & Bisnis",
    specialty: "Skalabilitas Waralaba & Ekspansi",
    category: "Bisnis",
    rating: 4.9,
    clients: 120,
    experience: "10 tahun",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 5,
    name: "Ahmad Rizki, S.E., M.Ak.",
    title: "Auditor & Akuntan Publik",
    specialty: "Audit Keuangan & Kepatuhan",
    category: "Pajak",
    rating: 4.7,
    clients: 200,
    experience: "11 tahun",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: 6,
    name: "Ratna Kusuma, LL.M.",
    title: "Pengacara Bisnis Internasional",
    specialty: "Hukum Bisnis & Investasi Lintas Negara",
    category: "Hukum",
    rating: 5.0,
    clients: 95,
    experience: "9 tahun",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

const CATEGORIES = ["Semua", "Pajak", "Hukum", "Bisnis", "Investasi", "Perencanaan"];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Andi Pratama",
    role: "Pengusaha, Tier 3",
    quote: "Konsultasi dengan Pak Budi Santoso membantu saya menghemat hingga 30% pajak korporasi. Prosesnya transparan dan profesional. Sangat worth it!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
  },
  {
    name: "Maria Gunawan",
    role: "Investor Properti, Tier 4",
    quote: "Bu Ratna Kusuma memberikan panduan hukum yang sangat detail untuk investasi properti saya di Singapura. Tanpa beliau, saya mungkin menghadapi risiko hukum yang serius.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100&h=100"
  }
];

const ExpertCard: React.FC<{ expert: Expert; index: number }> = ({ expert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      layout
    >
      <GlassCard className="p-8 flex flex-col items-center text-center hover:border-aureum-gold/20 transition-all duration-300 h-full">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden mb-5 border-2 border-aureum-gold/20 p-1 bg-white/5">
          <img
            src={expert.image}
            alt={expert.name}
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        </div>

        {/* Name & Title */}
        <h3 className="text-lg font-bold text-etched-heading mb-1 leading-tight">{expert.name}</h3>
        <p className="text-aureum-gold text-sm mb-4 font-semibold">{expert.title}</p>

        {/* Specialty */}
        <GlassCard className="w-full rounded-xl p-4 mb-5 text-sm bg-aureum-gold/5">
          <p className="text-body text-etched mb-1 text-xs uppercase tracking-wider">Spesialisasi</p>
          <p className="text-heading font-medium leading-snug">{expert.specialty}</p>
        </GlassCard>

        {/* Stats Row */}
        <div className="flex justify-between w-full mb-6 px-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-aureum-gold fill-aureum-gold" />
            <div>
              <p className="text-xs text-body text-etched uppercase">Rating</p>
              <p className="font-bold text-heading text-sm">{expert.rating}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-money-green" />
            <div>
              <p className="text-xs text-body text-etched uppercase">Klien</p>
              <p className="font-bold text-heading text-sm">{expert.clients}+</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-body text-etched" />
            <div>
              <p className="text-xs text-body text-etched uppercase">Pengalaman</p>
              <p className="font-bold text-heading text-sm">{expert.experience}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <GoldShineButton className="w-full">
          Booking Konsultasi
        </GoldShineButton>
      </GlassCard>
    </motion.div>
  );
};

const IntroStatCard: React.FC<{ icon: React.ReactNode; value: string; label: string }> = ({ icon, value, label }) => (
  <GlassCard className="p-5 flex items-center gap-4 text-center">
    <div className="w-12 h-12 rounded-xl bg-aureum-gold/10 flex items-center justify-center flex-shrink-0">
      {icon}
    </div>
    <div className="text-left">
      <p className="text-heading font-bold text-lg">{value}</p>
      <p className="text-body text-etched text-sm">{label}</p>
    </div>
  </GlassCard>
);

const TrustCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <GlassCard className="p-6 text-center flex flex-col items-center">
    <div className="w-14 h-14 rounded-full bg-money-green/10 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-heading text-etched-heading font-bold mb-2">{title}</h4>
    <p className="text-body text-etched text-sm leading-relaxed">{description}</p>
  </GlassCard>
);

export const Experts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredExperts = useMemo(() => {
    return EXPERTS.filter((expert) => {
      const matchesCategory = activeCategory === "Semua" || expert.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        expert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expert.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Header */}
      <header className="mb-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-heading text-etched-heading"
        >
          Ahli <span className="text-aureum-gold">Terverifikasi</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-body text-etched text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Akses langsung ke profesional yang bisa mengeksekusi strategi finansial Anda.
        </motion.p>
      </header>

      {/* Intro Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
      >
        <IntroStatCard
          icon={<Shield className="w-6 h-6 text-aureum-gold" />}
          value="50+"
          label="Ahli Terverifikasi"
        />
        <IntroStatCard
          icon={<Award className="w-6 h-6 text-aureum-gold" />}
          value="100%"
          label="Proses Vetting Ketat"
        />
        <IntroStatCard
          icon={<MessageCircle className="w-6 h-6 text-money-green" />}
          value="Chat & VC"
          label="Konsultasi via Chat atau Video Call"
        />
        <IntroStatCard
          icon={<CheckCircle className="w-6 h-6 text-money-green" />}
          value="Garansi"
          label="Kepuasan 100%"
        />
      </motion.div>

      {/* Search & Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-10"
      >
        {/* Search Bar */}
        <GlassCard className="p-2 mb-6 flex items-center gap-3">
          <Search className="w-5 h-5 text-body text-etched ml-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Cari berdasarkan spesialisasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-heading placeholder:text-body/60 outline-none text-base py-2"
            aria-label="Cari ahli berdasarkan spesialisasi"
          />
        </GlassCard>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-aureum-gold text-black shadow-lg shadow-aureum-gold/20"
                  : "bg-white/5 text-body hover:bg-white/10 hover:text-heading border border-white/10"
              }`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Experts Grid */}
      <AnimatePresence mode="popLayout">
        {filteredExperts.length > 0 ? (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {filteredExperts.map((expert, index) => (
              <ExpertCard key={expert.id} expert={expert} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-16"
          >
            <GlassCard className="p-10 inline-block">
              <Search className="w-12 h-12 text-body/40 mx-auto mb-4" />
              <p className="text-heading font-semibold text-lg text-etched-heading mb-2">Tidak ada ahli ditemukan</p>
              <p className="text-body text-etched text-sm">Coba ubah kata kunci atau kategori pencarian Anda.</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-heading text-etched-heading mb-3">
            Bagaimana Kami Memilih <span className="text-aureum-gold">Ahli?</span>
          </h2>
          <p className="text-body text-etched max-w-xl mx-auto">
            Setiap ahli di platform kami telah melewati proses seleksi ketat untuk memastikan kualitas dan keamanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TrustCard
            icon={<Shield className="w-7 h-7 text-money-green" />}
            title="Vetting Ketat"
            description="Setiap ahli menjalani verifikasi latar belakang, kualifikasi profesional, dan wawancara mendalam oleh tim Duit.co.id."
          />
          <TrustCard
            icon={<Star className="w-7 h-7 text-money-green" />}
            title="Rating Minimal 4.5"
            description="Hanya ahli dengan rating kepuasan klien minimal 4.5 dari 5.0 yang dapat bertahan di platform kami."
          />
          <TrustCard
            icon={<Clock className="w-7 h-7 text-money-green" />}
            title="Pengalaman 5+ Tahun"
            description="Seluruh ahli memiliki pengalaman praktik minimal 5 tahun di bidangnya masing-masing dengan track record terbukti."
          />
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-20"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-heading text-etched-heading mb-3">
            Apa Kata <span className="text-aureum-gold">Mereka?</span>
          </h2>
          <p className="text-body text-etched max-w-xl mx-auto">
            Pengalaman nyata dari pengguna yang telah berkonsultasi dengan ahli kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <GlassCard key={index} className="p-8 flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-aureum-gold/15 flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-heading font-semibold">{testimonial.name}</p>
                  <p className="text-body text-etched text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute -top-2 -left-1 text-aureum-gold/30 text-5xl font-serif leading-none">"</span>
                <p className="text-body text-etched leading-relaxed pl-6 italic">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-aureum-gold fill-aureum-gold" />
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-20 text-center"
      >
        <GlassCard className="p-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-heading text-etched-heading mb-3">
            Butuh Bantuan yang Lebih Spesifik?
          </h2>
          <p className="text-body text-etched mb-8 max-w-md mx-auto">
            Ceritakan kebutuhan finansial Anda dan kami akan mencocokkan Anda dengan ahli yang paling tepat.
          </p>
          <GoldShineButton>
            Hubungi Tim Kami
          </GoldShineButton>
        </GlassCard>
      </motion.section>
    </div>
  );
};

export default Experts;
