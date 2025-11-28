# Loop - Driver Portal Analysis

## What Loop Actually Is

**A driver-facing portal** for an existing portage salarial company (Loop). The payroll/HR backend already exists - this app is the **self-service interface** for drivers to:
- Track their activity
- Access their documents
- Submit expenses
- View their pay breakdown

---

## Feature Breakdown

| # | Feature | What It Does | Complexity |
|---|---------|--------------|------------|
| 1 | **Dashboard** | Revenue tracking (day/week/month) per platform | **Low** |
| 2 | **CA Breakdown** | Display CA → IK, brut, cotisations, net (read-only view) | **Low-Medium** |
| 3 | **Platform Sync** | Centralize data from Uber/Bolt/Heetch | **Medium-High** |
| 4 | **Payslips** | Download monthly bulletins de paie (PDF) | **Low** |
| 5 | **Profile** | Driver info + vehicle info | **Low** |
| 6 | **Expenses** | Upload invoices, TVA recovery tracking | **Medium** |
| 7 | **Documents** | Download contracts, mutuelle, attestations, etc. | **Low** |

---

## What's Actually Hard vs Easy

### Easy (Standard CRUD + UI)
- **Dashboard**: Charts with Recharts/Chart.js, aggregate queries
- **Profile**: Basic form, Prisma models for Driver + Vehicle
- **Documents**: File storage (S3/Cloudflare R2), download links
- **Payslips**: Same as documents - just serve PDFs generated elsewhere

### Medium
- **CA Breakdown**: The *calculation* is done by Loop's backend/accountants. You just **display** the breakdown. Need a clear data model for the salary components.
- **Expenses**: File upload + form. OCR is optional. TVA tracking = simple math (20% of eligible expenses).

### The Platform Sync Challenge - SOLUTIONS FOUND

**Good news: There ARE solutions.** Here's what exists:

---
 
#### 🏆 OPTION 1: Third-Party Income APIs (BEST FOR PRODUCTION)

| Provider | Coverage | Notes |
|----------|----------|-------|
| **[Rollee](https://getrollee.com)** | Uber, Bolt, Heetch, FreeNow, LeCab + more | **Europe-focused**, Paris-based. Built for gig economy. Single API for all platforms. User connects via OAuth-like flow. |
| **[Argyle](https://argyle.com)** | 30+ gig platforms including Uber, Lyft | US-focused but expanding. 170+ data fields. Real-time earnings, shifts, tips. |
| **[Pinwheel](https://pinwheelapi.com)** | 80% US workforce + gig workers | Income verification API. CRA compliant. |
| **[Plaid Income](https://plaid.com/products/income/)** | Gig economy category supported | Document upload + payroll connections. |

**How they work**: Driver logs in via their widget → OAuth to platform → API returns earnings data.

**Rollee is your best bet for France** - they specifically cover Uber, Bolt, Heetch, FreeNow, LeCab.

---

#### 🔧 OPTION 2: Reverse-Engineered SDKs (DIY / Risky)

| Platform | Solution | Risk Level |
|----------|----------|------------|
| **Bolt** | [`bolt-driver-api`](https://www.npmjs.com/package/bolt-driver-api) npm package | ⚠️ Medium |
| **Uber** | [Uber internal API scraping](https://dev.to/nrrb/how-i-hacked-ubers-hidden-api-to-download-4379-rides-35ai) | ⚠️ High |

**Bolt SDK** (by @syrex1013) - Actually works:
```javascript
npm i bolt-driver-api
```
- SMS/Magic link auth
- `getEarningsLandingScreen()`, `getEarningsBreakdown()`, `getEarningsChart()`
- `getOrderHistory()`, `getBalanceHistory()`
- Full earnings & analytics access

**Uber scraping** - Cookie-based auth to `drivers.uber.com/earnings/api/getWebActivityFeed`
- Requires driver's session cookie
- Fragile, can break anytime

---

#### 📁 OPTION 3: Manual Import (MVP / Fallback)

- **Uber**: Drivers can export CSV from `partners.uber.com/p3/payments/statements`
- **Bolt**: Export from driver portal
- **Heetch**: Export from `driver.heetch.com/earnings`

Build a CSV parser for each platform format. Simple but requires driver action.

---

#### 🔌 OPTION 4: Official Uber Driver API (Limited Access)

Uber has an official [Driver API](https://developer.uber.com/products/drivers) but:
- Access is **restricted** - you need to apply
- Designed for partners building driver tools
- Worth applying if you're serious

---

### Recommended Strategy

| Phase | Approach |
|-------|----------|
| **MVP** | Manual CSV import for all platforms |
| **V1** | Integrate **Rollee API** (covers all French platforms) |
| **V2** | Add Bolt SDK as backup, apply for Uber Driver API |
| **Fallback** | Keep CSV import as option for edge cases |

---

## Data Model (Simplified)

```
Driver
├── profile (name, email, phone, address, SIRET, etc.)
├── vehicle (make, model, plate, insurance, carte grise)
├── documents[] (type, file_url, uploaded_at)
├── payslips[] (month, year, file_url, generated_at)
├── expenses[] (date, amount, tva, category, receipt_url, status)
└── activities[] (platform, date, ca, hours, tips, km)

PayBreakdown (per month)
├── ca_total
├── indemnites_km
├── salaire_brut
├── cotisations_patronales
├── cotisations_salariales
├── net_a_payer
└── frais_gestion
```

---

## Tech Stack Fit

| Need | Your Stack | Verdict |
|------|------------|---------|
| UI/Dashboard | Next.js + shadcn | ✅ Perfect |
| Database | Prisma + Neon | ✅ Perfect |
| File Storage | Need to add (S3/R2/Supabase Storage) | ⚠️ Add this |
| PDF Generation | Not needed if payslips come from elsewhere | ✅ N/A |
| Platform Sync | Manual import or custom solution | ⚠️ Design decision |

---

## Bottom Line

**Loop = 80% standard web app + 20% data integration challenge**

This is NOT a payroll engine. It's a **portal that displays data** from Loop's existing operations. The hard payroll math happens elsewhere - you're building the driver's window into that system.

**Build order suggestion:**
1. Auth + Profile + Vehicle (foundation)
2. Documents + Payslips (simple file management)
3. Dashboard + CA Breakdown (the main value prop)
4. Expenses (medium complexity)
5. Platform sync (tackle last, start with manual CSV import)
