# Claude Code Instructions — BWT Uzbekistan Premium Website

## Project status

**Project is ALREADY initialized.** Do NOT run:
- `npx create-next-app`
- `npm init`
- Any scaffold command

This folder already contains:
- `app/` — Next.js 15 App Router
- `lib/` — utilities
- `package.json` — dependencies declared
- `.git` — separate repo (NOT same as ERP)
- `.vercel` — connected to Vercel deployment
- `next.config.ts` — configured

Work with EXISTING files. Modify and add, don't recreate.

## Critical separation

This project is `bwt-uzb-site` — the customer-facing website.

It is SEPARATE from `bwt-erp` (the admin ERP system).

- This project deploys to → `bwt-uzb.uz`
- ERP project deploys to → `erp-bwt.uz`
- Two separate repositories
- Two separate Vercel projects
- DO NOT touch `D:\BWT ERP\bwt-erp` from this session

## Build plan

Full build specification is in `WIREFRAME.md` in this folder.

Read it FIRST before making any changes:
1. Check current state of `app/page.tsx` and existing files
2. Read `WIREFRAME.md` for complete design system + section specs
3. Follow phased build plan (6 phases)
4. Report back after each phase with screenshot

## Brand rules (critical)

- NO pink as primary color (Uzbek market does not accept it)
- Primary palette: Midnight Navy `#0A1628` + Champagne Gold `#C9A961`
- Premium positioning — no Bootstrap look, no Tilda templates
- BWT origin: GERMANY (not Austria) — verified by owner
- Russian primary language, Uzbek secondary

## API integration

Customer site reads from ERP:
- Products: `https://erp-bwt.uz/api/public/products`
- Lead submission: `POST https://erp-bwt.uz/api/public/leads`

Do NOT directly query ERP database — only through public API endpoints.

## Asset locations

Real product photos and videos provided by owner.
Place in:
- `/public/images/products/` — real BWT Slim shots
- `/public/images/lifestyle/` — AI-generated lifestyle
- `/public/images/installations/` — real installation photos
- `/public/videos/` — hero video + cinematic ролик

If asset missing — use placeholder div with TODO comment, do not block build.

## Safety

- DO NOT run destructive git commands (force push, reset --hard)
- DO NOT modify ERP project files
- DO NOT commit `.env` files
- DO NOT change Vercel domain settings without explicit confirmation

## When in doubt

Read `WIREFRAME.md` again. If it's not there — pause and ask owner.

---

<!-- Imports project-wide agent rules (Next.js breaking-changes warning) -->
@AGENTS.md
