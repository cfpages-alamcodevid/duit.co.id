import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  PlayCircle,
  Clock,
  Award,
  Users,
  BookOpen,
  RefreshCw,
  ShieldCheck,
  MessageSquare,
  ChevronRight,
  Star,
} from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Course {
  title: string;
  instructor: string;
  price: string;
  tier: string;
  duration: string;
  lessons: number;
  image: string;
  description: string;
}

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  name: string;
  city: string;
  tier: string;
  rating: number;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COURSES: Course[] = [
  {
    title: "Dasar-Dasar Bebas Utang",
    instructor: "Duit.co.id Team",
    price: "Rp 499.000",
    tier: "Tier 0",
    duration: "4 jam",
    lessons: 12,
    image: "https://images.unsplash.com/photo-1554224155-1696413575b9?auto=format&fit=crop&q=80&w=800",
    description: "Strategi praktis melunasi utang pinjol & kartu kredit. Bangun fondasi keuangan dari nol."
  },
  {
    title: "Freelancing Go Global: Dari Indonesia ke Dunia",
    instructor: "Andi Wijaya",
    price: "Rp 1.200.000",
    tier: "Tier 1",
    duration: "8 jam",
    lessons: 24,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
    description: "Skill high-income untuk freelancer. Tembus pasar internasional dari Indonesia."
  },
  {
    title: "Membangun UMKM Digital dari Nol",
    instructor: "Sari Dewi",
    price: "Rp 899.000",
    tier: "Tier 1",
    duration: "6 jam",
    lessons: 18,
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800",
    description: "Panduan lengkap memulai bisnis digital. Dari ide hingga profit pertama."
  },
  {
    title: "Investasi Reksa Dana & Saham untuk Karyawan",
    instructor: "Budi Hartono, CFP",
    price: "Rp 1.500.000",
    tier: "Tier 2",
    duration: "10 jam",
    lessons: 30,
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=800",
    description: "Portfolio paper assets untuk karyawan. Reksa dana, obligasi, dan blue-chip stocks."
  },
  {
    title: "SOP Bisnis: Dari Operator ke Owner",
    instructor: "Business Mastery",
    price: "Rp 2.500.000",
    tier: "Tier 2",
    duration: "12 jam",
    lessons: 36,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    description: "Systemize bisnis Anda. Tinggalkan peran operator, fokus sebagai owner."
  },
  {
    title: "Properti & Real Estate: Passive Income Strategy",
    instructor: "Properti.id Team",
    price: "Rp 3.000.000",
    tier: "Tier 3",
    duration: "14 jam",
    lessons: 42,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
    description: "Strategi investasi properti untuk passive income. Franchise & real estate mastery."
  },
  {
    title: "Tax Planning untuk High Net Worth Individuals",
    instructor: "Legal Pro",
    price: "Rp 4.500.000",
    tier: "Tier 3",
    duration: "8 jam",
    lessons: 20,
    image: "https://images.unsplash.com/photo-1454165833762-0165c03f901a?auto=format&fit=crop&q=80&w=800",
    description: "Optimasi pajak legal untuk HNWI. Struktur holding & efisiensi fiscal."
  },
  {
    title: "Family Office Setup & Management",
    instructor: "Legacy Advisors",
    price: "Rp 5.000.000",
    tier: "Tier 4",
    duration: "16 jam",
    lessons: 48,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    description: "Panduan lengkap Family Office. Wealth protection, succession planning & legacy."
  },
];

const STATS: Stat[] = [
  {
    icon: <PlayCircle className="w-6 h-6" />,
    value: "100+",
    label: "Video Pembelajaran",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    value: "Seumur Hidup",
    label: "Akses Selamanya",
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "Sertifikat",
    label: "Kelulusan Resmi",
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "1-on-1",
    label: "Konsultasi dengan Ahli",
  },
];

const FEATURES: Feature[] = [
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Belajar dari Praktisi",
    description: "Materi disusun oleh profesional berpengalaman di bidang keuangan, hukum, dan bisnis. Bukan teori, tapi strategi yang sudah terbukti.",
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Materi Update Berkala",
    description: "Kurikulum kami selalu diperbarui mengikuti regulasi terbaru, tren pasar, dan perubahan ekonomi di Indonesia.",
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Komunitas Eksklusif",
    description: "Akses ke grup privat sesama peserta. Networking, diskusi, dan kolaborasi dengan profesional dari berbagai tier.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Garansi Uang Kembali 30 Hari",
    description: "Tidak puas? Kami kembalikan 100% pembayaran Anda dalam 30 hari pertama. Tanpa syarat, tanpa ribet.",
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Setelah ikut kursus 'SOP Bisnis', saya berhasil keluar dari peran operator dan sekarang bisnis saya berjalan otomatis. Omzet naik 3x dalam 6 bulan. Ini investasi terbaik yang pernah saya ambil.",
    name: "Rina Susanti",
    city: "Surabaya",
    tier: "Tier 2",
    rating: 5,
  },
  {
    quote: "Dulu saya terjebak utang pinjol Rp 50 juta. Setelah ikut 'Dasar-Dasar Bebas Utang', dalam 8 bulan semua lunas. Sekarang saya sudah mulai investasi reksa dana. Terima kasih Duit.co.id!",
    name: "Dimas Pratama",
    city: "Jakarta",
    tier: "Tier 1",
    rating: 5,
  },
  {
    quote: "Kursus Family Office sangat komprehensif. Saya akhirnya punya struktur holding company yang proper dan rencana suksesi yang jelas untuk anak-anak saya.",
    name: "Hendra Wijaya",
    city: "Medan",
    tier: "Tier 4",
    rating: 5,
  },
];

// ─── Tier Color Mapping ─────────────────────────────────────────────────────

const TIER_COLORS: Record<string, string> = {
  "Tier 0": "bg-red-500/10 text-red-400 border-red-500/15",
  "Tier 1": "bg-orange-500/10 text-orange-400 border-orange-500/15",
  "Tier 2": "bg-money-green/10 text-money-green border-money-green/15",
  "Tier 3": "bg-aureum-gold/10 text-aureum-gold border-aureum-gold/15",
  "Tier 4": "bg-purple-500/10 text-purple-400 border-purple-500/15",
};

// ─── Sub-Components ──────────────────────────────────────────────────────────

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
  >
    <GlassCard className="overflow-hidden h-full flex flex-col group border border-white/10 hover:border-money-green/20 transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(0,77,64,0.08)]">
      <div className="h-48 overflow-hidden relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-4 left-4">
          <Badge
            variant="tier"
            className={`${TIER_COLORS[course.tier] || ""} border text-[10px] font-bold uppercase tracking-wider`}
          >
            {course.tier}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-white/90 text-xs">
          <Clock className="w-3.5 h-3.5" />
          <span>{course.duration}</span>
          <span className="text-white/50">•</span>
          <BookOpen className="w-3.5 h-3.5" />
          <span>{course.lessons} modul</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-etched-heading mb-2 leading-snug line-clamp-2">
          {course.title}
        </h3>
        <p className="text-body text-etched text-sm mb-4 leading-relaxed line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center gap-2 mb-6 text-xs text-body/70 text-etched">
          <Users className="w-3.5 h-3.5" />
          <span>oleh {course.instructor}</span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-3">
          <span className="text-aureum-gold font-bold text-lg">{course.price}</span>
          <GreenButton className="text-sm px-5 py-3 whitespace-nowrap">
            Daftar Sekarang
          </GreenButton>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

const StatItem: React.FC<{ stat: Stat; index: number }> = ({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
    className="flex flex-col items-center text-center"
  >
    <div className="w-14 h-14 rounded-full bg-money-green/10 border border-money-green/15 flex items-center justify-center text-money-green mb-4">
      {stat.icon}
    </div>
    <p className="text-2xl font-bold text-heading mb-1">{stat.value}</p>
    <p className="text-sm text-body text-etched">{stat.label}</p>
  </motion.div>
);

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <GlassCard className="h-full border border-white/10 hover:border-money-green/15 transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-money-green/10 to-money-green/5 border border-money-green/10 flex items-center justify-center text-money-green mb-5">
        {feature.icon}
      </div>
      <h3 className="text-lg font-bold text-heading text-etched-heading mb-3">{feature.title}</h3>
      <p className="text-body text-etched text-sm leading-relaxed">{feature.description}</p>
    </GlassCard>
  </motion.div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ delay: index * 0.12, duration: 0.5 }}
  >
    <GlassCard className="h-full border border-white/10">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-aureum-gold text-aureum-gold" />
        ))}
      </div>
      <blockquote className="text-body text-etched text-sm leading-relaxed mb-6 italic">
        "{testimonial.quote}"
      </blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-money-green to-money-green-light flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-heading">{testimonial.name}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-body/70 text-etched">{testimonial.city}</span>
            <span className="text-body/30">•</span>
            <Badge variant="tier" className="text-[9px] px-2 py-0">{testimonial.tier}</Badge>
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// ─── Main Page Component ─────────────────────────────────────────────────────

export const Academy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* ── Hero Header ─────────────────────────────────────────────── */}
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-heading text-etched-heading">
            Duit <span className="text-money-green">Akademi</span>
          </h1>
          <p className="text-body text-etched text-lg max-w-2xl mx-auto leading-relaxed">
            Kuasai skill elit. Kursus terstruktur untuk mempercepat perjalanan Anda melalui tier finansial.
          </p>
        </motion.div>
      </header>

      {/* ── Stats Bar ───────────────────────────────────────────────── */}
      <section className="mb-16" aria-label="Statistik Akademi">
        <GlassCard className="border border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <StatItem key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </GlassCard>
      </section>

      {/* ── Course Grid ─────────────────────────────────────────────── */}
      <section className="mb-20" aria-label="Daftar Kursus">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-2">
              Semua Kursus
            </h2>
            <p className="text-body text-etched text-sm">
              Pilih kursus sesuai tier finansial Anda
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COURSES.map((course, index) => (
            <CourseCard key={course.title} course={course} index={index} />
          ))}
        </div>
      </section>

      {/* ── Features Section ────────────────────────────────────────── */}
      <section className="mb-20" aria-label="Fitur Akademi">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-3">
            Kenapa Belajar di Duit Akademi?
          </h2>
          <p className="text-body text-etched text-sm max-w-xl mx-auto">
            Kami tidak hanya mengajarkan teori. Kami memberikan strategi yang sudah terbukti di lapangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="mb-20" aria-label="Testimoni">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-3">
            Kata Mereka yang Sudah Berhasil
          </h2>
          <p className="text-body text-etched text-sm max-w-xl mx-auto">
            Cerita nyata dari peserta yang sudah merasakan transformasi finansial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} index={i} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────── */}
      <section aria-label="Call to Action">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard className="border border-money-green/15 text-center py-16 px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-4">
              Belum Yakin Mulai?
            </h2>
            <p className="text-body text-etched text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Coba Quiz Gratis untuk Tahu Kursus yang Tepat untuk Anda
            </p>
            <Link to="/quiz">
              <GreenButton className="text-base px-8 py-4">
                Mulai Quiz Gratis
                <ChevronRight className="w-5 h-5 ml-2 inline" />
              </GreenButton>
            </Link>
          </GlassCard>
        </motion.div>
      </section>
    </div>
  );
};

export default Academy;
