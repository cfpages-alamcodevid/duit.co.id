import os
import re

files_info = {
    "side-hustle-mahasiswa-research.md": {
        "course": "Mahasiswa Hustler Academy: Dari IPK ke Income",
        "partner": "Student Career Mentor atau Freelance Advisor",
        "brand": "Duit.co.id Student Ambassador/Expert"
    },
    "jastip-pemula-research.md": {
        "course": "Jastip Mastery: Keliling Kota Jadi Cuan",
        "partner": "Jastip Logistics & Sourcing Expert",
        "brand": "Trusted Shopping Partner"
    },
    "skill-otodidak-research.md": {
        "course": "Skill Sprint: Kuasai Skill Baru Tanpa Kuliah",
        "partner": "Specialized Technical Skill Mentor (sesuai skill yang dikuasai)",
        "brand": "Certified Self-Taught Authority di ekosistem Duit.co.id"
    },
    "online-shop-nol-research.md": {
        "course": "E-commerce Launchpad: Buka Toko dalam 7 Hari",
        "partner": "Marketplace Optimization Specialist",
        "brand": "E-commerce Business Expert yang direkomendasikan platform"
    },
    "klien-pertama-freelance-research.md": {
        "course": "Freelance Client Magnet: Closing Pertama & Seterusnya",
        "partner": "Business Development & Pitching Consultant",
        "brand": "Featured Freelance Success Mentor"
    },
    "dropship-vs-reseller-research.md": {
        "course": "Inventory Engine: Memilih Model Bisnis Tanpa Rugi",
        "partner": "Supply Chain & Vendor Selection Advisor",
        "brand": "Retail Strategy Strategist di komunitas Duit.co.id"
    },
    "jualan-makanan-online-research.md": {
        "course": "Cloud Kitchen Blueprint: Bisnis Kuliner dari Rumah",
        "partner": "F&B Business & Licensing Consultant",
        "brand": "Recognized Food-Entrepreneur Mentor"
    },
    "jastip-barang-mewah-research.md": {
        "course": "Elite Jastip: High-Ticket Personal Shopping",
        "partner": "Luxury Authentication & Global Sourcing Expert",
        "brand": "Premium Luxury Shopping Expert"
    },
    "content-creator-cuan-research.md": {
        "course": "Creator Economy: Monetisasi Konten Selain Adsense",
        "partner": "Digital Personal Branding Consultant",
        "brand": "Certified Content Strategist"
    },
    "admin-olshop-pro-research.md": {
        "course": "Pro-Admin Certification: Mengelola CS & Order Skala Besar",
        "partner": "Operational Efficiency Specialist for UMKM",
        "brand": "Certified Admin Expert yang terverifikasi Duit.co.id"
    },
    "hitung-harga-jual-research.md": {
        "course": "Pricing Strategy for Profit: Jangan Sampai Jual Rugi",
        "partner": "Financial Margin & Pricing Consultant",
        "brand": "Profitability Strategy Expert"
    },
    "bisnis-modal-1juta-research.md": {
        "course": "Micro-Business Mastery: Skala Besar Modal Kecil",
        "partner": "Lean Startup & Micro-Business Advisor",
        "brand": "Budget Business Expert"
    },
    "negosiasi-gaji-research.md": {
        "course": "The Salary Negotiator: Naik Gaji Tanpa Pindah Kerja",
        "partner": "Career Growth & Compensation Consultant",
        "brand": "Professional Career Advocate"
    },
    "cv-portfolio-menarik-research.md": {
        "course": "Portfolio Powerhouse: Menjual Skill Lewat Visual",
        "partner": "Professional Portfolio Reviewer & Designer",
        "brand": "Visual Identity Expert for Professionals"
    },
    "passive-income-karyawan-research.md": {
        "course": "Employee to Asset Owner: Membangun Passive Income Sambil Kerja",
        "partner": "FIRE (Financial Independence) Consultant for Employees",
        "brand": "Passive Income Strategist"
    }
}

dir_path = "research/tier-1-hustler"

for filename, info in files_info.items():
    file_path = os.path.join(dir_path, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        continue
    
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Find the section to insert before
    insert_idx = -1
    section_num = -1
    for i, line in enumerate(lines):
        match = re.match(r'## (\d+)\. (Common Myth|Myths & Misconceptions)', line)
        if match:
            insert_idx = i
            section_num = int(match.group(1))
            break
    
    if insert_idx != -1:
        # Prepare the new section
        new_section = [
            f"## {section_num}. Duit.co.id Ecosystem Integration\n",
            f"- **Duit.co.id Academy:** Buat dan jual kursus \"{info['course']}\" (Passive Income: build once, sell forever).\n",
            f"- **Expert Partner:** Bergabung sebagai Duit.co.id Expert Partner untuk menawarkan jasa konsultasi sebagai {info['partner']}.\n",
            f"- **Personal Brand:** Gunakan audiens Duit.co.id untuk membangun reputasi sebagai {info['brand']} melalui artikel guest-post atau fitur profil pakar di platform.\n",
            "\n"
        ]
        
        # Re-number subsequent sections
        new_lines = lines[:insert_idx] + new_section
        for i in range(insert_idx, len(lines)):
            line = lines[i]
            match = re.match(r'## (\d+)\. ', line)
            if match:
                current_num = int(match.group(1))
                new_num = current_num + 1
                line = re.sub(r'## \d+\. ', f"## {new_num}. ", line)
            new_lines.append(line)
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print(f"Updated {filename}")
    else:
        print(f"Target section not found in {filename}")
