import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GreenButton } from '@/components/ui/GreenButton';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Account <span className="text-gold">Settings</span></h1>
        <p className="text-slate-400">Manage your sovereign identity and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <aside className="md:col-span-1 space-y-4">
          <GlassCard className="p-6">
            <nav className="flex flex-col gap-2">
              <button className="text-left px-4 py-2 rounded-lg bg-white/10 text-white font-bold">Personal Info</button>
              <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all">Subscription</button>
              <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all">Security</button>
              <button className="text-left px-4 py-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all">Notifications</button>
            </nav>
          </GlassCard>
          
          <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all font-bold">
            Logout
          </button>
        </aside>

        <main className="md:col-span-2 space-y-8">
          <GlassCard className="p-8">
            <h3 className="text-xl font-bold mb-6">Personal Information</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none" defaultValue="Sovereign User" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none" defaultValue="user@duit.co.id" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-400 ml-1">Current Tier</label>
                <div className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-gold font-bold flex justify-between items-center">
                  <span>Tier 1: Hustler</span>
                  <button type="button" className="text-xs underline text-slate-500 hover:text-gold transition-colors">Retake Quiz</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Gender</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Rather not say</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-400 ml-1">Age Bracket</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-gold/50 outline-none">
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

          <GlassCard className="p-8 border-gold/20">
            <h3 className="text-xl font-bold mb-4 text-gold">Premium Benefits</h3>
            <p className="text-slate-400 mb-6">You are currently on the <span className="text-white font-bold">Standard Sovereign</span> plan.</p>
            <div className="flex gap-4">
              <button className="flex-1 py-3 rounded-xl bg-gold text-black font-bold hover:opacity-90 transition-all">Upgrade to Elite</button>
              <button className="flex-1 py-3 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-all">View Plans</button>
            </div>
          </GlassCard>
        </main>
      </div>
    </div>
  );
};

export default Profile;
