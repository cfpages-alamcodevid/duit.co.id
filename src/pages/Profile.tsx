import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';
import {
  User,
  Camera,
  Shield,
  Bell,
  CreditCard,
  BookOpen,
  Wrench,
  GraduationCap,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Star,
} from 'lucide-react';

/* ────────────────────────────────────────────
   Tier Badge Component
──────────────────────────────────────────── */
interface TierBadgeProps {
  tier: string;
  size?: 'sm' | 'md' | 'lg';
}

const TierBadge: React.FC<TierBadgeProps> = ({ tier, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2',
  };

  const tierColors: Record<string, string> = {
    'Tier 0': 'bg-red-500/20 text-red-400 border-red-500/30',
    'Tier 1': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Tier 2': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'Tier 3': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Tier 4': 'bg-aureum-gold/20 text-aureum-gold border-aureum-gold/30',
  };

  const colorClass = tierColors[tier] || tierColors['Tier 1'];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-semibold',
        sizeClasses[size],
        colorClass
      )}
    >
      <Star className={size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} fill="currentColor" />
      {tier}: {tier.replace('Tier ', '') === '0' ? 'Survival' : tier.replace('Tier ', '') === '1' ? 'Hustler' : tier.replace('Tier ', '') === '2' ? 'Scaler' : tier.replace('Tier ', '') === '3' ? 'Asset Builder' : 'Legacy'}
    </span>
  );
};

/* ────────────────────────────────────────────
   Profile Page
──────────────────────────────────────────── */
type NavSection = 'personal' | 'subscription' | 'security' | 'notifications';

export const Profile: React.FC = () => {
  const [activeSection, setActiveSection] = useState<NavSection>('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navItems: { key: NavSection; label: string; icon: React.ReactNode }[] = [
    { key: 'personal', label: 'Info Pribadi', icon: <User className="w-4 h-4" /> },
    { key: 'subscription', label: 'Langganan', icon: <CreditCard className="w-4 h-4" /> },
    { key: 'security', label: 'Keamanan', icon: <Shield className="w-4 h-4" /> },
    { key: 'notifications', label: 'Notifikasi', icon: <Bell className="w-4 h-4" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* ── Page Header ── */}
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-heading text-etched-heading mb-2">
          Pengaturan <span className="text-aureum-gold">Akun</span>
        </h1>
        <p className="text-body text-etched">Kelola identitas dan preferensi Anda.</p>
      </header>

      {/* ── Profile Avatar + Stats Hero ── */}
      <GlassCard className="p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="relative group">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-money-green/30 to-aureum-gold/30 border-2 border-white/10 flex items-center justify-center overflow-hidden">
              <User className="w-14 h-14 sm:w-16 sm:h-16 text-body/60" />
            </div>
            {/* Change Photo Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-money-green text-white flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-money-green-light"
              aria-label="Ubah Foto Profil"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              aria-hidden="true"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-2xl font-bold text-heading text-etched-heading mb-1">Sovereign User</h2>
            <p className="text-body text-etched text-sm mb-3">user&#64;duit.co.id</p>
            <TierBadge tier="Tier 1" size="lg" />
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 sm:gap-6">
            {[
              { icon: <BookOpen className="w-5 h-5" />, value: '12', label: 'Artikel Dibaca' },
              { icon: <Wrench className="w-5 h-5" />, value: '5', label: 'Alat Digunakan' },
              { icon: <GraduationCap className="w-5 h-5" />, value: '3', label: 'Kursus Aktif' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center text-aureum-gold mb-2 mx-auto">
                  {stat.icon}
                </div>
                <p className="text-xl font-bold text-heading">{stat.value}</p>
                <p className="text-xs text-body text-etched">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* ── Main Layout: Sidebar + Content ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar Navigation */}
        <aside className="md:col-span-4 lg:col-span-3 space-y-4">
          <GlassCard className="p-4">
            <nav className="flex flex-col gap-1" role="navigation" aria-label="Pengaturan Akun">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all font-medium',
                    activeSection === item.key
                      ? 'bg-white/10 text-heading font-bold'
                      : 'text-body hover:bg-white/5 hover:text-heading'
                  )}
                  aria-current={activeSection === item.key ? 'page' : undefined}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </GlassCard>

          {/* Logout */}
          <button
            type="button"
            className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-bold text-sm"
          >
            Keluar
          </button>
        </aside>

        {/* Content Area */}
        <main className="md:col-span-8 lg:col-span-9 space-y-8">
          {/* ═══════════════════════════════════
              SECTION: Info Pribadi
             ═══════════════════════════════════ */}
          {activeSection === 'personal' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-heading text-etched-heading mb-6">Informasi Pribadi</h3>
                <form className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="text-sm text-body text-etched ml-1">Nama Lengkap</label>
                      <input
                        id="fullName"
                        type="text"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-heading focus:border-aureum-gold/50 outline-none transition-colors placeholder:text-body/40"
                        defaultValue="Sovereign User"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm text-body text-etched ml-1">Alamat Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-heading focus:border-aureum-gold/50 outline-none transition-colors placeholder:text-body/40"
                        defaultValue="user@duit.co.id"
                        placeholder="email@contoh.com"
                      />
                    </div>
                  </div>

                  {/* Tier Display */}
                  <div className="space-y-2">
                    <label className="text-sm text-body text-etched ml-1">Tier Saat Ini</label>
                    <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 flex justify-between items-center">
                      <TierBadge tier="Tier 1" size="md" />
                      <button
                        type="button"
                        className="text-xs underline text-body hover:text-aureum-gold transition-colors"
                      >
                        Ulangi Quiz
                      </button>
                    </div>
                  </div>

                  {/* Gender & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="gender" className="text-sm text-body text-etched ml-1">Gender</label>
                      <select
                        id="gender"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-heading focus:border-aureum-gold/50 outline-none transition-colors appearance-none cursor-pointer"
                        defaultValue="unisex"
                      >
                        <option value="male">Laki-laki</option>
                        <option value="female">Perempuan</option>
                        <option value="unisex">Lebih suka tidak menjawab</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="ageGroup" className="text-sm text-body text-etched ml-1">Kelompok Usia</label>
                      <select
                        id="ageGroup"
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-heading focus:border-aureum-gold/50 outline-none transition-colors appearance-none cursor-pointer"
                        defaultValue="produktif"
                      >
                        <option value="muda">&lt; 20 tahun</option>
                        <option value="produktif">20-34 tahun</option>
                        <option value="skalier">35-44 tahun</option>
                        <option value="pensiun">45+ tahun</option>
                      </select>
                    </div>
                  </div>

                  <GreenButton type="submit" className="px-8">
                    Simpan Perubahan
                  </GreenButton>
                </form>
              </GlassCard>

              {/* Content Preferences */}
              <GlassCard className="p-6 sm:p-8 mt-8">
                <h3 className="text-xl font-bold text-heading text-etched-heading mb-2">Preferensi Konten</h3>
                <p className="text-body text-etched text-sm mb-6">Topik yang ingin Anda pelajari lebih lanjut.</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label: 'Karir & Gaji', active: true },
                    { label: 'Side Hustle', active: true },
                    { label: 'Investasi Saham', active: false },
                    { label: 'Reksa Dana', active: false },
                    { label: 'Properti', active: false },
                    { label: 'Bisnis Offline', active: true },
                    { label: 'Franchise', active: false },
                    { label: 'Pajak & Legal', active: false },
                    { label: 'Perencanaan Pensiun', active: false },
                    { label: 'Warisan & Keluarga', active: false },
                  ].map((topic) => (
                    <button
                      key={topic.label}
                      type="button"
                      className={cn(
                        'px-4 py-2 rounded-full text-sm font-medium border transition-all',
                        topic.active
                          ? 'bg-money-green/20 border-money-green/40 text-money-green-light'
                          : 'bg-white/5 border-white/10 text-body hover:border-white/20 hover:text-heading'
                      )}
                    >
                      {topic.active && <CheckCircle2 className="w-3.5 h-3.5 inline mr-1.5" />}
                      {topic.label}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ═══════════════════════════════════
              SECTION: Langganan
             ═══════════════════════════════════ */}
          {activeSection === 'subscription' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Current Plan */}
              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-heading text-etched-heading mb-4">Paket Saat Ini</h3>
                <div className="flex items-center justify-between p-5 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-lg font-bold text-heading">Sovereign Standar</p>
                    <p className="text-sm text-body text-etched mt-1">Akses ke artikel Tier 0-1, alat dasar, dan newsletter mingguan.</p>
                  </div>
                  <TierBadge tier="Tier 1" size="md" />
                </div>
              </GlassCard>

              {/* Premium Benefits */}
              <GlassCard className="p-6 sm:p-8 border-aureum-gold/20">
                <h3 className="text-xl font-bold text-aureum-gold text-etched-heading mb-2">Benefit Premium</h3>
                <p className="text-body text-etched text-sm mb-6">Upgrade untuk membuka semua fitur eksklusif Duit.co.id.</p>

                <div className="space-y-4 mb-8">
                  {[
                    'Akses penuh ke semua Tier (0-4)',
                    'Kalkulator finansial premium tanpa batas',
                    'Konsultasi 1-on-1 dengan ahli keuangan',
                    'Kursus eksklusif di Academy',
                    'Early access ke fitur baru',
                    'Komunitas Elite WhatsApp',
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-aureum-gold flex-shrink-0 mt-0.5" />
                      <span className="text-body text-etched text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <GoldShineButton className="flex-1 py-3.5 text-center">
                    Upgrade ke Elite
                  </GoldShineButton>
                  <button
                    type="button"
                    className="flex-1 py-3.5 rounded-full border border-white/20 text-heading font-bold hover:bg-white/5 transition-all text-center"
                  >
                    Lihat Paket
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ═══════════════════════════════════
              SECTION: Keamanan
             ═══════════════════════════════════ */}
          {activeSection === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-heading text-etched-heading mb-6">Keamanan Akun</h3>
                <form className="space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label htmlFor="currentPassword" className="text-sm text-body text-etched ml-1">Password Saat Ini</label>
                    <div className="relative">
                      <input
                        id="currentPassword"
                        type={showPassword ? 'text' : 'password'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pr-12 text-heading focus:border-aureum-gold/50 outline-none transition-colors placeholder:text-body/40"
                        placeholder="Masukkan password lama"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-body hover:text-heading transition-colors"
                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm text-body text-etched ml-1">Password Baru</label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 pr-12 text-heading focus:border-aureum-gold/50 outline-none transition-colors placeholder:text-body/40"
                        placeholder="Masukkan password baru"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-body hover:text-heading transition-colors"
                        aria-label={showConfirmPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Strength Indicator */}
                  <div className="space-y-2">
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4].map((level) => (
                        <div
                          key={level}
                          className={cn(
                            'h-1.5 flex-1 rounded-full transition-colors',
                            level <= 2 ? 'bg-yellow-500/60' : 'bg-white/10'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-body text-etched ml-1">Kekuatan: Sedang — tambahkan huruf besar dan angka</p>
                  </div>

                  <GreenButton type="submit" className="px-8">
                    <Lock className="w-4 h-4 mr-2 inline" />
                    Ubah Password
                  </GreenButton>
                </form>
              </GlassCard>

              {/* Two-Factor Auth Stub */}
              <GlassCard className="p-6 sm:p-8 mt-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-heading text-etched-heading mb-1">Autentikasi Dua Faktor</h4>
                    <p className="text-sm text-body text-etched">Tambahkan lapisan keamanan ekstra pada akun Anda.</p>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-full border border-money-green/40 text-money-green-light font-semibold text-sm hover:bg-money-green/10 transition-all"
                  >
                    Aktifkan
                  </button>
                </div>
              </GlassCard>

              {/* Active Sessions Stub */}
              <GlassCard className="p-6 sm:p-8 mt-8">
                <h4 className="text-lg font-bold text-heading text-etched-heading mb-4">Sesi Aktif</h4>
                <div className="space-y-3">
                  {[
                    { device: 'Chrome · Windows', location: 'Jakarta, Indonesia', current: true },
                    { device: 'Safari · iPhone', location: 'Jakarta, Indonesia', current: false },
                  ].map((session, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-2.5 h-2.5 rounded-full',
                          session.current ? 'bg-money-green' : 'bg-body/40'
                        )} />
                        <div>
                          <p className="text-sm font-medium text-heading">{session.device}</p>
                          <p className="text-xs text-body text-etched">{session.location}</p>
                        </div>
                      </div>
                      {session.current && (
                        <span className="text-xs text-money-green-light font-semibold">Saat Ini</span>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {/* ═══════════════════════════════════
              SECTION: Notifikasi
             ═══════════════════════════════════ */}
          {activeSection === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 sm:p-8">
                <h3 className="text-xl font-bold text-heading text-etched-heading mb-6">Pengaturan Notifikasi</h3>
                <p className="text-body text-etched text-sm mb-8">Pilih cara Anda ingin menerima update dari Duit.co.id.</p>

                <div className="space-y-6">
                  {[
                    { label: 'Newsletter Mingguan', desc: 'Ringkasan artikel dan tips keuangan setiap minggu.', defaultChecked: true },
                    { label: 'Update Tier Baru', desc: 'Notifikasi saat konten untuk tier Anda tersedia.', defaultChecked: true },
                    { label: 'Promo & Penawaran', desc: 'Info diskon kursus dan produk premium.', defaultChecked: false },
                    { label: 'Reminder Quiz Tahunan', desc: 'Ingatkan saya untuk mengulang quiz setiap tahun.', defaultChecked: true },
                    { label: 'Update Hukum & Regulasi', desc: 'Perubahan UU yang berdampak pada keuangan pribadi.', defaultChecked: false },
                  ].map((pref, i) => (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-heading">{pref.label}</p>
                        <p className="text-xs text-body text-etched mt-0.5">{pref.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                        <input type="checkbox" className="sr-only peer" defaultChecked={pref.defaultChecked} />
                        <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-money-green" />
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <GreenButton type="button" className="px-8">
                    Simpan Preferensi
                  </GreenButton>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Profile;
