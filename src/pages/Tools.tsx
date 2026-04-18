import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';
import {
  Shield,
  Rocket,
  TrendingUp,
  Building2,
  Users,
  Zap,
  Target,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface Tool {
  name: string;
  description: string;
}

interface ToolCategory {
  title: string;
  description: string;
  tier: string;
  tierBadge: string;
  tools: Tool[];
  color: string;
  icon: React.ElementType;
  iconColor: string;
}

const TOOL_CATEGORIES: ToolCategory[] = [
  {
    title: "Alat Survival",
    description:
      "Alat darurat keuangan untuk Anda yang sedang berjuang melawan hutang, pinjol, dan tekanan ekonomi harian. Kalkulator pelunasan pinjol membantu Anda menyusun strategi bayar hutang dengan metode avalanche atau snowball. Budget Survival Bulanan memberikan template anggaran ketat agar pengeluaran tidak melebihi pemasukan. Template Surat Hukum Pinjol siap pakai untuk menghadapi ancaman debt collector yang melanggar UU Perlindungan Konsumen.",
    tier: "Tier 0 — Survival",
    tierBadge: "Tier 0",
    tools: [
      {
        name: "Kalkulator Pelunasan Pinjol",
        description: "Hitung strategi bayar hutang pinjol dengan metode avalanche/snowball, estimasi waktu lunas, dan total bunga yang harus dibayar."
      },
      {
        name: "Budget Survival Bulanan",
        description: "Template anggaran ketat 50/30/20 yang disesuaikan untuk kondisi UMR — prioritaskan makan, transportasi, dan cicilan wajib."
      },
      {
        name: "Template Surat Hukum Pinjol",
        description: "Surat somasi dan laporan resmi berdasarkan UU ITE dan OJK untuk menghadapi debt collector ilegal atau tagihan di atas ketentuan."
      },
      {
        name: "Debt Payoff Calculator",
        description: "Kalkulator umum untuk semua jenis hutang — KTA, kartu kredit, atau pinjaman bank — dengan proyeksi timeline pelunasan."
      },
      {
        name: "Survival Budgeter",
        description: "Alat perencanaan anggaran harian/mingguan untuk memastikan kebutuhan pokok terpenuhi meski pendapatan terbatas."
      },
      {
        name: "Legal Defense Template",
        description: "Kumpulan template dokumen hukum untuk perlindungan diri dari praktik pinjaman online ilegal dan ancaman pidana."
      }
    ],
    color: "border-money-green/15",
    icon: Shield,
    iconColor: "text-money-green"
  },
  {
    title: "Alat Hustler",
    description:
      "Alat untuk fresh graduate, pekerja UMR, dan pelaku UMKM yang ingin menambah penghasilan. Kalkulator Tarif Freelance membantu Anda menentukan harga jasa yang layak berdasarkan biaya operasional dan target pendapatan bulanan. Generator Script Sales menghasilkan template pesan WhatsApp dan email yang terbukti meningkatkan konversi penjualan. Tracker ROI Side Hustle menghitung apakah usaha sampingan Anda benar-benar menguntungkan setelah dikurangi modal, waktu, dan biaya tersembunyi.",
    tier: "Tier 1 — The Hustler",
    tierBadge: "Tier 1",
    tools: [
      {
        name: "Kalkulator Tarif Freelance",
        description: "Tentukan harga jasa freelance Anda berdasarkan target gaji bulanan, biaya operasional, jam kerja, dan margin profit yang diinginkan."
      },
      {
        name: "Generator Script Sales",
        description: "Buat template pesan WhatsApp, DM Instagram, dan email penjualan yang persuasif — cocok untuk jastip, reseller, dan UMKM online."
      },
      {
        name: "Tracker ROI Side Hustle",
        description: "Hitung keuntungan bersih usaha sampingan setelah dikurangi modal, biaya operasional, dan nilai waktu Anda — apakah side hustle ini worth it?"
      },
      {
        name: "Freelance Rate Calculator",
        description: "Kalkulator cepat untuk menentukan rate per jam atau per proyek berdasarkan standar pasar Indonesia dan pengalaman Anda."
      },
      {
        name: "Sales Script Generator",
        description: "AI-powered generator untuk membuat skrip penjualan yang disesuaikan dengan produk, target audiens, dan platform yang Anda gunakan."
      },
      {
        name: "ROI Tracker",
        description: "Dashboard sederhana untuk memantau pendapatan, pengeluaran, dan profit margin dari semua side hustle Anda dalam satu tempat."
      }
    ],
    color: "border-money-green/15",
    icon: Rocket,
    iconColor: "text-money-green"
  },
  {
    title: "Alat Scaler",
    description:
      "Alat untuk manajer, profesional, dan pemilik bisnis yang siap meningkatkan skala usaha. Pembuat Template SOP membantu Anda mendokumentasikan proses bisnis agar operasional berjalan konsisten tanpa bergantung pada satu orang. Dashboard KPI Tim memungkinkan Anda menetapkan dan memantau target kinerja tim secara real-time. Kalkulator Biaya Hire menghitung total biaya merekrut karyawan baru — dari proses rekrutmen, training, hingga break-even point produktivitas.",
    tier: "Tier 2 — The Scaler",
    tierBadge: "Tier 2",
    tools: [
      {
        name: "Pembuat Template SOP",
        description: "Buat Standard Operating Procedure yang terstruktur untuk operasional bisnis — dari customer service, inventory, hingga quality control."
      },
      {
        name: "Dashboard KPI Tim",
        description: "Tetapkan, pantau, dan evaluasi Key Performance Indicator untuk setiap anggota tim — cocok untuk bisnis dengan 5-50 karyawan."
      },
      {
        name: "Kalkulator Biaya Hire",
        description: "Hitung total biaya rekrutmen: iklan lowongan, waktu interview, onboarding, training, dan estimasi waktu sampai karyawan produktif."
      },
      {
        name: "SOP Template Builder",
        description: "Wizard interaktif yang memandu Anda membuat SOP langkah demi langkah — export ke PDF atau Google Docs untuk distribusi tim."
      },
      {
        name: "KPI Dashboard",
        description: "Visualisasi performa bisnis dengan chart real-time — revenue, customer acquisition cost, retention rate, dan metrik kunci lainnya."
      },
      {
        name: "Hiring Cost Calculator",
        description: "Analisis cost-per-hire dan time-to-productivity untuk mengoptimalkan anggaran rekrutmen dan mengurangi risiko salah hire."
      }
    ],
    color: "border-aureum-gold/15",
    icon: TrendingUp,
    iconColor: "text-aureum-gold"
  },
  {
    title: "Alat Investor",
    description:
      "Alat untuk investor yang serius membangun portofolio aset. Kalkulator ROI Properti menghitung return on investment untuk pembelian rumah, ruko, atau tanah — termasuk simulasi KPR, biaya notaris, dan pajak. Kalkulator Cap Rate membantu Anda menilai apakah properti sewaan layak dibeli berdasarkan pendapatan sewa tahunan versus harga beli. Rebalancer Portofolio memberikan rekomendasi alokasi aset ideal (saham, obligasi, reksa dana, properti) berdasarkan profil risiko dan tujuan keuangan Anda.",
    tier: "Tier 3 & 4 — Asset Builder & Legacy",
    tierBadge: "Tier 3-4",
    tools: [
      {
        name: "Kalkulator ROI Properti",
        description: "Simulasi lengkap investasi properti: harga beli, KPR, DP, biaya notaris & BPHTB, pajak, appreciation, dan estimasi profit 5-20 tahun."
      },
      {
        name: "Kalkulator Cap Rate",
        description: "Hitung Capitalization Rate untuk properti sewaan — ukur apakah rental income sebanding dengan harga properti dan biaya perawatan."
      },
      {
        name: "Rebalancer Portofolio",
        description: "Analisis dan rekomendasikan alokasi aset optimal antara saham, obligasi, reksa dana, emas, dan properti berdasarkan profil risiko Anda."
      },
      {
        name: "Property ROI Calculator",
        description: "Kalkulator cepat untuk membandingkan ROI beberapa properti sekaligus — identifikasi mana yang memberikan return terbaik."
      },
      {
        name: "Cap Rate Calculator",
        description: "Tool evaluasi properti investasi berdasarkan NOI (Net Operating Income) — cocok untuk investor ruko, apartemen, atau gudang."
      },
      {
        name: "Portfolio Rebalancer",
        description: "Dashboard portofolio yang memantau alokasi aset Anda dan memberikan alert ketika perlu rebalancing untuk mempertahankan target risiko."
      }
    ],
    color: "border-aureum-gold/15",
    icon: Building2,
    iconColor: "text-aureum-gold"
  }
];

const STATS = [
  {
    icon: Users,
    value: "1.200+",
    label: "Pengguna aktif telah menggunakan alat kami"
  },
  {
    icon: Target,
    value: "Rp 2,5 jt",
    label: "Rata-rata penghematan per bulan per pengguna"
  },
  {
    icon: Zap,
    value: "50.000+",
    label: "Kalkulasi keuangan telah dilakukan"
  },
  {
    icon: CheckCircle2,
    value: "100%",
    label: "Gratis — tanpa biaya tersembunyi"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

export const Tools: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <motion.header
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-etched-heading">
          Arsenal <span className="text-money-green">Finansial</span>
        </h1>
        <p className="text-body text-etched text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Koleksi alat keuangan interaktif yang dirancang khusus untuk konteks Indonesia —
          dari pertahanan melawan pinjol hingga strategi investasi properti dan reksa dana.
          Setiap alat dibuat untuk memberi Anda kendali penuh atas perjalanan finansial Anda.
        </p>
      </motion.header>

      {/* Intro Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <GlassCard className="p-8 md:p-12 border border-money-green/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-4">
                Mengapa Alat Ini Ada?
              </h2>
              <div className="space-y-4 text-body text-etched leading-relaxed">
                <p>
                  Indonesia memiliki tantangan keuangan yang unik: tingkat literasi finansial masih di bawah 50%,
                  pinjaman online ilegal marak, dan akses ke konsultan keuangan profesional terbatas bagi mayoritas masyarakat.
                </p>
                <p>
                  Arsenal Finansial Duit.co.id hadir untuk menjembatani kesenjangan itu. Setiap kalkulator, template,
                  dan dashboard dirancang berdasarkan:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-money-green mt-2.5 flex-shrink-0" />
                    <span><strong className="text-heading">Regulasi Indonesia</strong> — UU ITE, OJK, UU Perlindungan Konsumen, dan ketentuan pajak terbaru</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-money-green mt-2.5 flex-shrink-0" />
                    <span><strong className="text-heading">Konteks Ekonomi Lokal</strong> — UMR, biaya hidup kota vs desa, suku bunga KPR bank Indonesia</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-money-green mt-2.5 flex-shrink-0" />
                    <span><strong className="text-heading">Bahasa yang Mudah Dipahami</strong> — tanpa jargon Wall Street, fokus pada actionable advice</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="glass-card rounded-2xl p-8 text-center w-full max-w-sm">
                <div className="text-5xl font-bold text-money-green mb-2">100%</div>
                <div className="text-heading font-semibold text-lg mb-1">Gratis Selamanya</div>
                <p className="text-body text-etched text-sm">
                  Tidak ada biaya tersembunyi, tidak perlu kartu kredit.
                  Kami percaya setiap orang berhak mendapatkan alat keuangan berkualitas.
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <GlassCard
              key={index}
              className="p-6 text-center border border-white/5 hover:border-money-green/20 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-money-green mx-auto mb-3" />
              <div className="text-2xl md:text-3xl font-bold text-heading mb-1">
                {stat.value}
              </div>
              <div className="text-body text-etched text-sm leading-snug">
                {stat.label}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.section>

      {/* Tool Categories Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {TOOL_CATEGORIES.map((category, index) => (
          <motion.div key={index} variants={itemVariants}>
            <GlassCard className={`p-8 h-full border-2 ${category.color} hover:bg-white/5 transition-all duration-300`}>
              <category.icon className={`w-12 h-12 ${category.iconColor} mb-4`} />
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-heading text-etched-heading">{category.title}</h2>
                <span className="px-3 py-1 rounded-full glass-card text-xs uppercase font-bold text-body text-etched">
                  {category.tierBadge}
                </span>
              </div>
              <p className="text-body text-etched mb-8 leading-relaxed">{category.description}</p>

              <div className="space-y-4 mb-8">
                {category.tools.map((tool, tIndex) => (
                  <div key={tIndex} className="group">
                    <div className="flex items-start gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${category.iconColor} mt-2 flex-shrink-0`} />
                      <div>
                        <h3 className="text-heading text-etched-heading font-semibold group-hover:text-money-green transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-body text-etched text-sm mt-0.5 leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <GreenButton className="w-full group">
                <span className="flex items-center justify-center gap-2">
                  Akses Alat
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </GreenButton>
            </GlassCard>
          </motion.div>
        ))}
      </motion.section>

      {/* Bottom CTA */}
      <motion.section
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassCard className="p-8 md:p-12 border border-aureum-gold/10">
          <h2 className="text-2xl md:text-3xl font-bold text-heading text-etched-heading mb-4">
            Belum Tahu Mulai dari Mana?
          </h2>
          <p className="text-body text-etched text-lg max-w-2xl mx-auto mb-8">
            Ikuti Financial Quiz kami untuk menemukan tier ekonomi Anda dan mendapatkan rekomendasi alat
            yang paling sesuai dengan kondisi keuangan Anda saat ini.
          </p>
          <GoldShineButton>
            <span className="flex items-center gap-2">
              Mulai Financial Quiz
              <ArrowRight className="w-4 h-4" />
            </span>
          </GoldShineButton>
        </GlassCard>
      </motion.section>
    </div>
  );
};

export default Tools;
