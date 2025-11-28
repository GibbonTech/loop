# Devis - Plateforme Loop
## Portail Chauffeur VTC

---

## Ce Qui Sera Livré

### 01 - Dashboard Principal
- **Vue revenus** : jour / semaine / mois avec graphiques
- **Répartition par plateforme** : Uber, Bolt, Heetch, FreeNow, etc.
- **KPIs** : CA total, heures travaillées, km parcourus, pourboires
- **Historique des courses** avec filtres et recherche

### 02 - Section Conversion CA → Salaire
- **Affichage automatique** de la répartition :
  - CA brut
  - Indemnités kilométriques
  - Salaire brut
  - Cotisations patronales
  - Cotisations salariales
  - Net à payer
  - Frais de gestion Loop
- **Vue mensuelle** avec historique
- **Export possible** en PDF

### 03 - Connexion Plateformes VTC
- **Phase 1 (MVP)** : Import CSV manuel (Uber, Bolt, Heetch)
- **Phase 2** : Intégration API Rollee (connexion automatique)
- Parser CSV pour chaque format de plateforme
- Centralisation des données dans une vue unifiée

### 04 - Bulletins de Paie
- **Liste des fiches de paie** par mois
- **Téléchargement PDF** en un clic
- Upload par l'admin Loop (backend)
- Notification au chauffeur quand disponible

### 05 - Profil Chauffeur & Véhicule
- **Infos personnelles** : nom, email, téléphone, adresse, SIRET
- **Infos véhicule** : marque, modèle, immatriculation, carte grise, assurance
- **Modification** par le chauffeur
- **Validation** par l'admin si nécessaire

### 06 - Notes de Frais
- **Upload de factures** (PDF, photo)
- **Formulaire** : date, montant HT, TVA, catégorie
- **Calcul automatique TVA récupérable** (20%)
- **Statut** : en attente, validé, remboursé
- **Historique** avec filtres

### 07 - Documents Administratifs
- **Espace documents** : contrat, mutuelle, attestation employeur, assurances
- **Upload par l'admin** Loop
- **Téléchargement** par le chauffeur
- **Catégories** : Contrat, Mutuelle, Attestations, Assurances, Autres

---

## Architecture Technique

| Composant | Technologie |
|-----------|-------------|
| **Web App** | Next.js 14 + shadcn/ui + TailwindCSS |
| **Mobile App** | Expo (React Native) avec wrapper |
| Backend | Next.js API Routes |
| Base de données | PostgreSQL (Neon) + Prisma |
| Stockage fichiers | Cloudflare R2 ou AWS S3 |
| Auth | NextAuth.js (web) + Expo SecureStore (mobile) |
| Charts | Recharts (web) + react-native-chart-kit (mobile) |
| PDF Viewer | react-pdf (web) + expo-file-system (mobile) |
| Navigation | Next.js routing (web) + Expo Router (mobile) |

### Livrables
- ✅ **Application Web** (desktop + responsive)
- ✅ **Application Mobile iOS** (via Expo)
- ✅ **Application Mobile Android** (via Expo)
- ✅ **Backend API partagé**

---

## Comparaison avec SIRAT

| Critère | SIRAT (3 200€ discounté) | Loop |
|---------|--------------------------|------|
| Plateformes | Web only | **Web + Mobile (iOS/Android)** |
| Interfaces | 3 (admin, prof, parent) | 2 (admin, chauffeur) |
| IA / Automatisation | Rapports IA, fiches IA | Non |
| Intégrations externes | Emails auto | **APIs plateformes VTC + parsers CSV** |
| Stockage fichiers | Minimal | **Important** (factures, docs, fiches paie) |
| Calculs métier | Simples | Moyens (TVA, répartition salaire) |

**Loop est plus conséquent** :
- Web + Mobile = quasi x1.5 en effort (même si code partagé)
- Intégrations VTC complexes
- Gestion fichiers lourde

---

## Votre Investissement

### Développement Initial

| Poste | Web | Mobile (Expo) | Total |
|-------|-----|---------------|-------|
| Setup projet + Auth + DB | 300€ | 200€ | 500€ |
| Dashboard + Charts | 400€ | 300€ | 700€ |
| Section CA → Salaire | 300€ | 200€ | 500€ |
| Import CSV (3 plateformes) | 400€ | 150€ | 550€ |
| Profil chauffeur + véhicule | 250€ | 150€ | 400€ |
| Notes de frais + upload | 400€ | 300€ | 700€ |
| Documents + fiches de paie | 300€ | 200€ | 500€ |
| Interface Admin (web only) | 400€ | - | 400€ |
| Tests + déploiement (web + stores) | 200€ | 300€ | 500€ |
| **TOTAL** | **2 950€** | **1 800€** | **4 750€** |

### Option : Intégration Rollee API
| Poste | Estimation |
|-------|------------|
| Intégration Rollee Connect (web + mobile) | +700€ |
| Sync automatique données | +400€ |
| **TOTAL Option** | **+1 100€** |

---

## 🔌 Comparatif APIs Plateformes VTC

### 🏆 RECOMMANDÉ : Rollee (France/Europe)

| Critère | Détail |
|---------|--------|
| **Couverture** | Uber, Bolt, Heetch, FreeNow, LeCab, Deliveroo, Stuart + plus |
| **Focus** | 🇫🇷 **Europe-first** (Paris-based startup) |
| **Facilité** | ⭐⭐⭐⭐⭐ Très simple |
| **SDK React** | `npm i @getrollee/connect-react-sdk` |
| **SDK React Native** | `npm i @getrollee/connect-react-native-sdk` |
| **Pricing** | 💰 **Non public** - Contact sales (généralement par utilisateur/mois) |
| **Sandbox** | ✅ Oui, avec données anonymisées |

**Intégration en 10 lignes :**
```jsx
import RolleeView from '@getrollee/connect-react-sdk';

<RolleeView 
  config={{ sessionToken: 'xxx' }}
  onCompleted={(data) => console.log(data)}
  onClose={() => {}}
/>
```

**Pourquoi Rollee ?**
- Seul à couvrir **Heetch** (français)
- SDK React + React Native natifs
- Sandbox pour tester sans vrais comptes
- Support Europe/RGPD

---

### Alternatives

| Provider | Couverture | Focus | Pricing | Pour Loop ? |
|----------|------------|-------|---------|-------------|
| **[Argyle](https://argyle.com)** | 30+ gig platforms | 🇺🇸 US-first | Non public (~$1-5/verification) | ⚠️ Moins de plateformes FR |
| **[Pinwheel](https://pinwheelapi.com)** | 80% US workforce | 🇺🇸 US only | Non public | ❌ Pas pour la France |
| **[Plaid Income](https://plaid.com)** | Gig economy | 🇺🇸 US-first | ~$3-5/verification | ❌ Limité en Europe |
| **[Atomic](https://atomicfi.com)** | Payroll US | 🇺🇸 US only | Non public | ❌ Pas pour la France |

---

### 💡 Estimation Coûts Rollee (à confirmer avec eux)

Basé sur le marché des income verification APIs :

| Volume | Estimation |
|--------|------------|
| 0-50 chauffeurs | ~50-100€/mois |
| 50-200 chauffeurs | ~150-300€/mois |
| 200+ chauffeurs | Négociation volume |

**Action recommandée** : Contacter Rollee pour un devis précis → [getrollee.com](https://getrollee.com)

---

### 🔧 Alternative DIY : bolt-driver-api

Si budget serré, le SDK reverse-engineered pour Bolt existe :

```bash
npm i bolt-driver-api
```

```typescript
import { BoltDriverAPI } from 'bolt-driver-api';

const api = new BoltDriverAPI(deviceInfo, authConfig);
const earnings = await api.getEarningsBreakdown(gpsInfo);
const history = await api.getOrderHistory(gpsInfo, 10, 0);
```

**⚠️ Risques** : Peut casser si Bolt change leur API, ToS violation potentielle.

---

---

### Abonnement Mensuel

**120€/mois** - Hébergement & Maintenance
- Hébergement Vercel Pro (web)
- Expo EAS (builds iOS/Android)
- Base de données Neon
- Stockage fichiers (jusqu'à 10 Go)
- Sauvegardes quotidiennes
- Support email
- Mises à jour sécurité
- Maintenance technique (web + mobile)

**Frais variables potentiels** :
- Stockage fichiers au-delà de 10 Go : ~5€/Go/mois
- Rollee API : selon leur pricing (par connexion utilisateur)
- Apple Developer Account : 99€/an (à la charge du client)
- Google Play Developer : 25€ one-time (à la charge du client)

---

## Récapitulatif

| | Montant |
|--|---------|
| **Développement Web + Mobile (MVP avec CSV)** | **4 750€** |
| **+ Option Rollee** | +1 100€ |
| **Abonnement mensuel** | 120€/mois |

**Timeline estimée** : 5-6 semaines

---

## Phases de Développement

### Semaine 1-2
- Setup projet Next.js + Expo
- Auth partagée (web + mobile)
- Base de données + Modèles Prisma
- Profil chauffeur + véhicule (web + mobile)

### Semaine 3
- Dashboard principal + charts (web)
- Dashboard mobile (Expo)
- Section CA → Salaire

### Semaine 4
- Import CSV (parsers Uber, Bolt, Heetch)
- Notes de frais + upload (web + mobile)

### Semaine 5
- Documents administratifs + Bulletins de paie
- Interface Admin (web only)

### Semaine 6
- Tests complets (web + mobile)
- Déploiement web (Vercel)
- Build iOS/Android (Expo EAS)
- Soumission stores
- Documentation

### Semaine 7+ (si option Rollee)
- Intégration Rollee Connect
- Sync automatique
- Tests intégration

---

## Questionnaire - Loop

### GESTION DES COMPTES

1. **Qui crée les comptes chauffeurs ?**
   - Seulement l'admin Loop ?
   - Auto-inscription avec validation ?

2. **Authentification**
   - Email/mot de passe ?
   - Magic link ?
   - SSO ?

### DONNÉES PLATEFORMES

3. **Quelles plateformes à supporter ?**
   - Uber ☐
   - Bolt ☐
   - Heetch ☐
   - FreeNow ☐
   - LeCab ☐
   - Autres : ____________

4. **Fréquence de sync souhaitée ?**
   - Manuel (CSV) suffit pour le MVP ?
   - Automatique dès le début ?

5. **Quelles données importer ?**
   - CA par course ☐
   - Heures ☐
   - Km ☐
   - Pourboires ☐
   - Détail par course ☐
   - Juste les totaux ☐

### CONVERSION CA → SALAIRE

6. **Qui calcule la répartition ?**
   - Loop (backend/comptable) et on affiche juste ?
   - L'app doit calculer automatiquement ?

7. **Si calcul auto, quelles règles ?**
   - Taux IK : ____________ €/km
   - % cotisations : ____________
   - % frais gestion : ____________

### NOTES DE FRAIS

8. **Catégories de frais ?**
   - Carburant ☐
   - Entretien véhicule ☐
   - Péages ☐
   - Parking ☐
   - Téléphone ☐
   - Autres : ____________

9. **Workflow validation ?**
   - Chauffeur soumet → Admin valide → Remboursé ?
   - Ou juste tracking sans validation ?

### DOCUMENTS

10. **Types de documents à gérer ?**
    - Contrat de travail ☐
    - Mutuelle ☐
    - Attestation employeur ☐
    - Assurance véhicule ☐
    - Carte grise ☐
    - Autres : ____________

11. **Qui uploade quoi ?**
    - Admin uploade tout ?
    - Chauffeur uploade certains docs ?

### FICHES DE PAIE

12. **D'où viennent les bulletins ?**
    - Générés par un logiciel de paie externe ?
    - Loop les uploade manuellement ?

13. **Notification au chauffeur ?**
    - Email quand nouveau bulletin ?
    - Juste visible dans l'app ?

### ADMIN

14. **Fonctionnalités admin nécessaires ?**
    - Voir tous les chauffeurs ☐
    - Voir leurs données ☐
    - Uploader documents ☐
    - Valider notes de frais ☐
    - Modifier répartition salaire ☐
    - Autres : ____________

### VOLUME

15. **Combien de chauffeurs ?**
    - Maintenant : ____________
    - Dans 6 mois : ____________

### PRIORITÉS

16. **Classez par importance (1 = critique, 5 = peut attendre)**
    - Dashboard revenus : ___
    - Conversion CA/Salaire : ___
    - Import plateformes : ___
    - Notes de frais : ___
    - Documents : ___
    - Fiches de paie : ___

---

**Prochaine étape** : Remplissez le questionnaire, je clarifie si besoin, puis on démarre.
