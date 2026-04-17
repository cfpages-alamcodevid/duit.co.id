# Duit.co.id: Sitemap & Pages List

This document lists all the pages and routes required for the Duit.co.id platform, serving as the blueprint for frontend development.

## 1. Public Pages (Landing & Acquisition)
- `index.html` (Home): Value proposition, social proof, and "Get Started" CTA.
- `/quiz`: The Multi-step Smart Financial Assessment.
- `/about`: Company vision and "Sovereign Vault" philosophy.
- `/contact`: Contact form and support information.

## 2. Authentication
- `/login`: Secure entry via Clerk/Kinde.
- `/register`: Initial signup before or after the quiz.
- `/forgot-password`: Password recovery.

## 3. User Dashboard (Personalized)
- `/dashboard` (My Feed): The central hub displaying personalized articles, tools, and recommendations based on User Tier, Age, and Gender.
- `/profile`: Managing user data, quiz retakes, and preferences.

## 4. Knowledge Hub (Siloed by Tier)
- `/knowledge`: Main hub index.
- `/knowledge/tier-0-survival`: Debt management and pinjol defense.
- `/knowledge/tier-1-hustler`: High-income skills and side hustles.
- `/knowledge/tier-2-scaler`: Systems, SOPs, and business growth.
- `/knowledge/tier-3-asset-builder`: Property and franchising.
- `/knowledge/tier-4-legacy`: Holding companies and Family Offices.
- `/knowledge/[slug]`: Individual article view with Markdown rendering and YouTube Gate.

## 5. Tools Center (Interactive)
- `/tools`: Main tools directory.
- `/tools/survival`: Debt generators and survival budgeting.
- `/tools/hustler`: Pricing calculators and sales scripts.
- `/tools/scaler`: KPI trackers and SOP builders.
- `/tools/investor`: ROI and Cap Rate calculators.

## 6. Law Library
- `/law`: Searchable database of UU (Undang-Undang).
- `/law/regulasi`: Filterable regulations list.
- `/law/[slug]`: Detailed view of specific regulations.

## 7. Marketplace & Solutions
- `/academy`: List of digital products and e-courses.
- `/experts`: Directory of verified consultants (Notaris, Pajak, etc.).
- `/solutions/franchise`: Bridge to Franchise.id.
- `/solutions/property`: Bridge to Properti.id.

## 8. Legal & Footer
- `/privacy`: Privacy policy (Data protection).
- `/terms`: Terms of service.
- `/disclaimer`: Financial and legal disclaimer.
