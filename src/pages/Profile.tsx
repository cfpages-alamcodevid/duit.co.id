import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { GoldShineButton } from '@/components/ui/GoldShineButton';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-heading mb-4">Account <span className="text-aureum-gold">Settings</span></h1>
        <p className="text-body">Manage your sovereign identity and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-4">
          <GlassCard className="p-6">
            <nav className="flex flex-col gap-2">
              <button className="text-left px-4 py-2 rounded-lg glass-card text-heading font-bold hover:bg-white/10 transition-all">Personal Info</button>
              <button className="text-left px-4 py-2 rounded-lg text-body hover:bg-white/5 hover:text-heading transition-all">Subscription</button>
              <button className="text-left px-4 py-2 rounded-lg text-body hover:bg-white/5 hover:text-heading transition-all">Security</button>
              <button className="text-left px-4 py-2 rounded-lg text-body hover:bg-white/5 hover:text-heading transition-all">Notifications</button>
            </nav>
          </GlassCard>

          <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-bold">
            Logout
          </button>
        </aside>

        <main className="md:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold text-heading mb-6">Personal Information</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-body ml-1">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-heading focus:border-aureum-gold/50 outline-none" defaultValue="Sovereign User" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-body ml-1">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-heading focus:border-aureum-gold/50 outline-none" defaultValue="user@duit.co.id" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-body ml-1">Current Tier</label>
                <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-aureum-gold font-bold flex justify-between items-center">
                  <span>Tier 1: Hustler</span>
                  <button type="button" className="text-xs underline text-body hover:text-aureum-gold transition-colors">Retake Quiz</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-body ml-1">Gender</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-heading focus:border-aureum-gold/50 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Rather not say</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-body ml-1">Age Bracket</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-heading focus:border-aureum-gold/50 outline-none">
                    <option>18-24</option>
                    <option>25-34</option>
                    <option>35-44</option>
                    <option>45+</option>
                  </select>
                </div>
              </div>

              <GreenButton className="px-8">Save Changes</GreenButton>
            </form>
          </GlassCard>

          <GlassCard className="p-8 border-aureum-gold/20">
            <h3 className="text-xl font-bold text-aureum-gold mb-4">Premium Benefits</h3>
            <p className="text-body mb-6">You are currently on the <span className="text-heading font-bold">Standard Sovereign</span> plan.</p>
            <div className="flex gap-4">
              <GoldShineButton className="flex-1 py-3">Upgrade to Elite</GoldShineButton>
              <button className="flex-1 py-3 rounded-xl border border-white/20 text-heading font-bold hover:bg-white/5 transition-all">View Plans</button>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
};

export default Profile;
