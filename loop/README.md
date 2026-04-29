# Driivo Loop

Operational web app for Driivo candidate onboarding, admin review, meetings, leads, and document collection.

## Local Setup

```bash
npm install
cp .env.example .env
docker compose up -d postgres
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Demo Data

Demo records use reserved `example.com` emails, `demo-*` IDs, and `formData.demo = true`. They are meant for local or staging pitch environments only.

```bash
ALLOW_DEMO_SEED=true DEMO_USER_PASSWORD="demo-password-123" npm run db:seed:demo
```

The script creates mock users, applications, leads, meetings, and document-review states. Demo document downloads use generated placeholder content, so they work without real R2 files.

Demo user accounts:

- `amine.benkacem@example.com`
- `sarah.meunier@example.com`
- `karim.diallo@example.com`
- `nora.lefevre@example.com`
- `mehdi.aouad@example.com`
- `camille.bernard@example.com`

All demo users use the `DEMO_USER_PASSWORD` supplied when the seed runs.

## Checks

```bash
npm run check-types
npm run build
npm audit --omit=dev
```
